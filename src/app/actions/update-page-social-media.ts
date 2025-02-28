'use server'

import { revalidateTag } from 'next/cache'

import { updatePageSocialMedia } from '@/http/update-page-social-media'
import { auth } from '@/lib/auth'
import { pageSocialMediaSchema } from '@/schemas/update-page-social-media'
import { actionsMessages } from '@/utils/actions-messages'

export async function updatePageSocialMediaAction(data: FormData) {
	const result = pageSocialMediaSchema.safeParse(Object.fromEntries(data))

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

	const { pageSlug: slug, ...socialLinks } = result.data

	try {
		await updatePageSocialMedia({
			slug,
			...socialLinks,
		})

		revalidateTag(`get-page-by-slug-${slug}`)
		revalidateTag(`get-page-by-user-id-${session.user.id}`)
	} catch {
		return {
			success: false,
			message: actionsMessages.errors.UNEXPECTED,
			errors: null,
		}
	}

	return {
		success: true,
		message: actionsMessages.success.PAGE_SOCIAL_LINKS_SAVED,
		errors: null,
	}
}
