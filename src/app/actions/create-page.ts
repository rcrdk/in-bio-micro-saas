'use server'

import { revalidateTag } from 'next/cache'
import dayjs from 'dayjs'
import { Timestamp } from 'firebase-admin/firestore'

import { createPage } from '@/http/create-page'
import { verifyPageSlugExistence } from '@/http/verify-page-slug-existence'
import { auth } from '@/lib/auth'
import { env } from '@/lib/env'
import { trackServerEvent } from '@/lib/mixpanel'
import { createPageSchema } from '@/schemas/create-page'
import { actionsMessages } from '@/utils/actions-messages'

export async function createPageAction(data: FormData) {
	const result = createPageSchema.safeParse(Object.fromEntries(data))

	if (!result.success) {
		const errors = result.error.flatten().fieldErrors

		return {
			success: false,
			message: actionsMessages.errors.PAGE_EMPTY_SLUG,
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

	const { slug } = result.data

	try {
		const slugAlreadyInUse = await verifyPageSlugExistence(slug)

		if (slugAlreadyInUse) {
			return {
				success: false,
				message: actionsMessages.errors.PAGE_SLUG_IN_USE,
				errors: null,
			}
		}

		const trialEndsAt = dayjs(Timestamp.now().toMillis()).add(env.NEXT_PUBLIC_TRIAL_DAYS, 'days').valueOf()

		await createPage({
			slug,
			name: session.user.name!,
			userId: session.user.id!,
			trialEndsAt,
		})

		trackServerEvent('page_created', {
			url: `/in/${slug}`,
		})

		revalidateTag(`get-page-by-user-id-${session.user.id}`)
	} catch {
		return {
			success: false,
			message: actionsMessages.errors.PAGE_SLUG_CREATE,
			errors: null,
		}
	}

	return {
		success: true,
		message: null,
		errors: null,
	}
}
