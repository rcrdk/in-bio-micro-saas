'use server'

import { revalidateTag } from 'next/cache'

import { deleteProject } from '@/http/delete-project'
import { auth } from '@/lib/auth'
import { deleteProjectSchema } from '@/schemas/delete-project'
import { actionsMessages } from '@/utils/actions-messages'

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

	const { pageSlug: slug, projectId } = result.data

	try {
		await deleteProject({
			slug,
			projectId,
		})

		revalidateTag(`get-projects-${slug}`)
	} catch {
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
