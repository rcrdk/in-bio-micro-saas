'use server'

import dayjs from 'dayjs'
import { Timestamp } from 'firebase-admin/firestore'
import { revalidateTag } from 'next/cache'
import { z } from 'zod'

import { verifyPageSlugExistence } from '@/http/verify-page-slug-existence'
import { auth } from '@/lib/auth'
import { env } from '@/lib/env'
import { DB } from '@/lib/firebase'
import { trackServerEvent } from '@/lib/mixpanel'
import { actionsMessages } from '@/utils/actions-messages'

const createPageSchema = z.object({
	slug: z.string().min(1),
})

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

		const trialEndsAt = dayjs(Timestamp.now().toMillis())
			.add(env.NEXT_PUBLIC_TRIAL_DAYS, 'days')
			.valueOf()

		await DB.collection('pages')
			.doc(slug)
			.set({
				userId: session.user.id,
				name: session.user.name ?? '',
				description: '',
				imagePath: null,
				totalVisits: 0,
				slug,
				isPaid: false,
				socialMedia: {
					github: '',
					linkedin: '',
					twitter: '',
					instagram: '',
					youtube: '',
					facebook: '',
				},
				customLinks: {
					link1: { title: '', url: '' },
					link2: { title: '', url: '' },
					link3: { title: '', url: '' },
				},
				trialEndsAt,
				subscriptionEndedAt: null,
				createdAt: Timestamp.now().toMillis(),
				updatedAt: Timestamp.now().toMillis(),
			})

		trackServerEvent('page_created', {
			url: `/in/${slug}`,
		})

		revalidateTag(`get-page-by-user-id-${session.user.id}`)
	} catch (error) {
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
