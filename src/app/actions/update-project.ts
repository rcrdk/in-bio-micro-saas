'use server'

import { revalidateTag } from 'next/cache'

import { updateProject } from '@/http/update-project'
import { auth } from '@/lib/auth'
import { updateProjectSchema } from '@/schemas/update-project'
import { actionsMessages } from '@/utils/actions-messages'

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

	const { name, description, url, pageSlug: slug, projectId, file } = result.data

	try {
		updateProject({
			slug,
			projectId,
			name,
			description,
			url,
			file,
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
		message: actionsMessages.success.PROJECT_UPDATED,
		errors: null,
	}
}
