'use server'

import { Timestamp } from 'firebase-admin/firestore'
import { revalidateTag } from 'next/cache'
import { z } from 'zod'

import { auth } from '@/lib/auth'
import { DB } from '@/lib/firebase'
import { actionsMessages } from '@/utils/actions-messages'

const profileSocialMediaSchema = z.object({
	pageSlug: z.string().min(1, 'Informe o link da página'),
	github: z.string().optional(),
	linkedin: z.string().optional(),
	twitter: z.string().optional(),
	instagram: z.string().optional(),
	youtube: z.string().optional(),
	facebook: z.string().optional(),
})

export async function updateProfileSocialMedia(data: FormData) {
	const result = profileSocialMediaSchema.safeParse(Object.fromEntries(data))

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

	const { pageSlug, github, linkedin, twitter, instagram, youtube, facebook } =
		result.data

	try {
		await DB.collection('profiles').doc(pageSlug).update({
			socialMedia: {
				github,
				linkedin,
				twitter,
				instagram,
				youtube,
				facebook,
			},
			updatedAt: Timestamp.now().toMillis(),
		})

		revalidateTag(`get-profile-by-slug-${pageSlug}`)
		revalidateTag(`get-profile-by-user-id-${session.user.id}`)
	} catch (error) {
		return {
			success: false,
			message: actionsMessages.errors.UNEXPECTED,
			errors: null,
		}
	}

	return {
		success: true,
		message: actionsMessages.success.PROFILE_SOCIAL_LINKS_SAVED,
		errors: null,
	}
}
