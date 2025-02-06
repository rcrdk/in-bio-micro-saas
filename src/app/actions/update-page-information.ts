'use server'

import { revalidateTag } from 'next/cache'

import { updatePageInformation } from '@/http/update-page-information'
import { auth } from '@/lib/auth'
import { pageDataSchema } from '@/schemas/update-page-information'
import { actionsMessages } from '@/utils/actions-messages'

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
		await updatePageInformation({
			slug,
			name,
			description,
			file,
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
