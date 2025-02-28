'use server'

import { revalidateTag } from 'next/cache'

import { updatePageCustomLinks } from '@/http/update-page-custom-links'
import { auth } from '@/lib/auth'
import { pageCustomLinksSchema } from '@/schemas/update-page-custom-links'
import { actionsMessages } from '@/utils/actions-messages'

export async function updatePageCustomLinksAction(data: FormData) {
	const result = pageCustomLinksSchema.safeParse(Object.fromEntries(data))

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

	const { pageSlug: slug, ...links } = result.data

	const link1 = { title: links.title1, url: links.url1 }
	const link2 = { title: links.title2, url: links.url2 }
	const link3 = { title: links.title3, url: links.url3 }

	try {
		await updatePageCustomLinks({
			slug,
			link1,
			link2,
			link3,
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
		message: actionsMessages.success.PAGE_CUSTOM_LINKS_SAVED,
		errors: null,
	}
}
