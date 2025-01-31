'use server'

import { randomUUID } from 'node:crypto'

import { Timestamp } from 'firebase-admin/firestore'
import { revalidateTag } from 'next/cache'
import sharp from 'sharp'
import { z } from 'zod'

import { auth } from '@/lib/auth'
import { DB, Storage } from '@/lib/firebase'
import { actionsMessages } from '@/utils/actions-messages'

const createProjectSchema = z.object({
	pageSlug: z.string().min(1, 'Informe o link da página'),
	name: z.string().min(1, 'Informe um nome'),
	description: z.string().min(1, 'Informe uma descrição'),
	url: z.string().min(1, 'Informe um link').url('Informe um link válido'),
	file: z.custom<File>().optional(),
})

export async function createProjectAction(data: FormData) {
	const result = createProjectSchema.safeParse(Object.fromEntries(data))

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

	const { name, description, url, pageSlug, file } = result.data
	const generateId = randomUUID()

	try {
		let imagePath = null

		const hasImageFileSelected = file && file.size > 0

		if (hasImageFileSelected) {
			// eslint-disable-next-line prettier/prettier
			const storageRef = Storage.file(`projects/${pageSlug}/${generateId}-${file.name}`)
			const arrayBuffer = await file.arrayBuffer()
			const buffer = Buffer.from(arrayBuffer)

			const compressImage = await sharp(buffer).resize(1024).jpeg().toBuffer()

			await storageRef.save(compressImage)

			imagePath = storageRef.name
		}

		await DB.collection('profiles')
			.doc(pageSlug)
			.collection('projects')
			.doc(generateId)
			.set({
				id: generateId,
				userId: session.user.id,
				name,
				description,
				url,
				...(hasImageFileSelected && { imagePath }),
				totalClicks: 0,
				createdAt: Timestamp.now().toMillis(),
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
		message: actionsMessages.success.PROJECT_CREATED,
		errors: null,
	}
}
