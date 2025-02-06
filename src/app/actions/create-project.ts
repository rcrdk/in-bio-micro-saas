'use server'

import { randomUUID } from 'node:crypto'

import { revalidateTag } from 'next/cache'

import { createProject } from '@/http/create-project'
import { auth } from '@/lib/auth'
import { createProjectSchema } from '@/schemas/create-project'
import { actionsMessages } from '@/utils/actions-messages'

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

	const { name, description, url, pageSlug: slug, file } = result.data

	try {
		await createProject({
			slug,
			userId: session.user.id!,
			id: randomUUID(),
			name,
			description,
			url,
			file,
		})

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
		message: actionsMessages.success.PROJECT_CREATED,
		errors: null,
	}
}
