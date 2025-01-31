'use server'

import { Timestamp } from 'firebase-admin/firestore'
import { z } from 'zod'

import { verifyProfileSlugExistence } from '@/http/verify-profile-slug-existence'
import { auth } from '@/lib/auth'
import { DB } from '@/lib/firebase'
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
		const slugAlreadyInUse = await verifyProfileSlugExistence(slug)

		if (slugAlreadyInUse) {
			return {
				success: false,
				message: actionsMessages.errors.PAGE_SLUG_IN_USE,
				errors: null,
			}
		}

		await DB.collection('profiles')
			.doc(slug)
			.set({
				userId: session.user.id,
				name: session.user.name ?? '',
				description: '',
				imagePath: null,
				totalVisits: 0,
				slug,
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
				createdAt: Timestamp.now().toMillis(),
				updatedAt: Timestamp.now().toMillis(),
			})
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
