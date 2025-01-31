'use server'

import { randomUUID } from 'node:crypto'

import { Timestamp } from 'firebase-admin/firestore'
import { revalidateTag } from 'next/cache'
import sharp from 'sharp'
import { z } from 'zod'

import { auth } from '@/lib/auth'
import { DB, Storage } from '@/lib/firebase'
import { actionsMessages } from '@/utils/actions-messages'

const updateProjectSchema = z.object({
	pageSlug: z.string().min(1, 'Informe o link da página'),
	projectId: z.string().min(1, 'Informe o id do projeto'),
	name: z.string().min(1, 'Informe um nome'),
	description: z.string().min(1, 'Informe uma descrição'),
	url: z.string().min(1, 'Informe um link').url('Informe um link válido'),
	file: z.custom<File>().optional(),
})

export async function updateProjectAction(data: FormData) {
	const result = updateProjectSchema.safeParse(Object.fromEntries(data))

	if (!result.success) {
		const errors = result.error.flatten().fieldErrors

		return {
			success: false,
			message: null,
			errors,
		}
	}

	const session = await auth()

	if (!session?.user) {
		return {
			success: false,
			message: actionsMessages.errors.UNAUTHORIZED,
			errors: null,
		}
	}

	const { name, description, url, pageSlug, projectId, file } = result.data
	const generateId = randomUUID()

	try {
		let updatedImagePath = null

		const hasNewImageFileSelected = file && file.size > 0

		if (hasNewImageFileSelected) {
			const currentProject = await DB.collection('profiles')
				.doc(pageSlug)
				.collection('projects')
				.doc(projectId)
				.get()
			const currentImagePath = currentProject?.data()?.imagePath

			if (currentImagePath) {
				const storageRef = Storage.file(currentImagePath)
				const currentStoragePathExists = await storageRef.exists()

				if (currentStoragePathExists) await storageRef.delete()
			}

			// eslint-disable-next-line prettier/prettier
			const storageRef = Storage.file(`projects/${pageSlug}/${generateId}-${file.name}`)
			const arrayBuffer = await file.arrayBuffer()
			const buffer = Buffer.from(arrayBuffer)

			const compressImage = await sharp(buffer).resize(1024).jpeg().toBuffer()

			await storageRef.save(compressImage)

			updatedImagePath = storageRef.name
		}

		await DB.collection('profiles')
			.doc(pageSlug)
			.collection('projects')
			.doc(projectId)
			.update({
				name,
				description,
				url,
				...(hasNewImageFileSelected && { imagePath: updatedImagePath }),
				updatedAt: Timestamp.now().toMillis(),
			})

		revalidateTag(`get-projects-${pageSlug}`)
	} catch (error) {
		return {
			success: false,
			message: actionsMessages.errors.UNEXPECTED,
			errors: null,
		}
	}

	return {
		success: true,
		message: actionsMessages.success.PROJECT_UPDATED,
		errors: null,
	}
}
