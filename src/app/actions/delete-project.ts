'use server'

import { revalidateTag } from 'next/cache'
import { z } from 'zod'

import { auth } from '@/lib/auth'
import { DB, Storage } from '@/lib/firebase'
import { actionsMessages } from '@/utils/actions-messages'

const deleteProjectSchema = z.object({
	pageSlug: z.string().min(1, 'Informe o link da página'),
	projectId: z.string().min(1, 'Informe o id do projeto'),
})

export async function deleteProjectAction(data: FormData) {
	const result = deleteProjectSchema.safeParse(Object.fromEntries(data))

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

	const { pageSlug: slug, projectId: id } = result.data

	try {
		const projectRef = DB.collection('pages')
			.doc(slug)
			.collection('projects')
			.doc(id)

		const imagePath = (await projectRef?.get()).data()?.imagePath

		if (imagePath) {
			const storageRef = Storage.file(imagePath)
			const currentStoragePathExists = await storageRef.exists()

			if (currentStoragePathExists) await storageRef.delete()
		}

		await projectRef.delete()

		revalidateTag(`get-projects-${slug}`)
	} catch (error) {
		return {
			success: false,
			message: actionsMessages.errors.UNEXPECTED,
			errors: null,
		}
	}

	return {
		success: true,
		message: actionsMessages.success.PROJECT_DELETED,
		errors: null,
	}
}
