'use server'

import { randomUUID } from 'node:crypto'

import { Timestamp } from 'firebase-admin/firestore'
import { revalidateTag } from 'next/cache'
import sharp from 'sharp'
import { z } from 'zod'

import { auth } from '@/lib/auth'
import { DB, Storage } from '@/lib/firebase'
import { actionsMessages } from '@/utils/actions-messages'

const pageDataSchema = z.object({
	pageSlug: z.string().min(1, 'Informe o link da página'),
	name: z.string().min(1, 'Informe um nome'),
	description: z.string().min(1, 'Informe uma introdução'),
	file: z.custom<File>().optional(),
})

export async function updatePageInformationAction(data: FormData) {
	const result = pageDataSchema.safeParse(Object.fromEntries(data))

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

	const { name, description, pageSlug: slug, file } = result.data

	try {
		let updatedImagePath = null

		const hasNewAvatarImageSelected = file && file.size > 0

		if (hasNewAvatarImageSelected) {
			const currentPage = await DB.collection('pages').doc(slug).get()
			const currentImagePath = currentPage?.data()?.imagePath

			if (currentImagePath) {
				const storageRef = Storage.file(currentImagePath)
				const currentStoragePathExists = await storageRef.exists()

				if (currentStoragePathExists) await storageRef.delete()
			}

			const filePrefix = randomUUID()
			// eslint-disable-next-line prettier/prettier
			const storageRef = Storage.file(`pages/${slug}/${filePrefix}-${file.name}`)
			const arrayBuffer = await file.arrayBuffer()
			const buffer = Buffer.from(arrayBuffer)

			const compressImage = await sharp(buffer).resize(1024).jpeg().toBuffer()

			await storageRef.save(compressImage)

			updatedImagePath = storageRef.name
		}

		await DB.collection('pages')
			.doc(slug)
			.update({
				name,
				description,
				...(hasNewAvatarImageSelected && { imagePath: updatedImagePath }),
				updatedAt: Timestamp.now().toMillis(),
			})

		revalidateTag(`get-page-by-slug-${slug}`)
		revalidateTag(`get-page-by-user-id-${session.user.id}`)
	} catch (error) {
		return {
			success: false,
			message: actionsMessages.errors.UNEXPECTED,
			errors: null,
		}
	}

	return {
		success: true,
		message: actionsMessages.success.PAGE_DATA_SAVED,
		errors: null,
	}
}
