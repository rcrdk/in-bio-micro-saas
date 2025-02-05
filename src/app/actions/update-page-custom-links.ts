'use server'

import { Timestamp } from 'firebase-admin/firestore'
import { revalidateTag } from 'next/cache'
import { z } from 'zod'

import { auth } from '@/lib/auth'
import { DB } from '@/lib/firebase'
import { actionsMessages } from '@/utils/actions-messages'

const pageCustomLinksSchema = z.object({
	pageSlug: z.string().min(1, 'Informe o link da página.'),
	title1: z.string().optional(),
	title2: z.string().optional(),
	title3: z.string().optional(),
	url1: z.string().url('Informe um link válido').optional().or(z.literal('')),
	url2: z.string().url('Informe um link válido').optional().or(z.literal('')),
	url3: z.string().url('Informe um link válido').optional().or(z.literal('')),
})

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

	const {
		pageSlug: slug,
		title1,
		title2,
		title3,
		url1,
		url2,
		url3,
	} = result.data

	try {
		await DB.collection('pages')
			.doc(slug)
			.update({
				customLinks: {
					link1: {
						title: title1,
						url: url1,
					},
					link2: {
						title: title2,
						url: url2,
					},
					link3: {
						title: title3,
						url: url3,
					},
				},
				updatedAt: Timestamp.now().toMillis(),
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
		message: actionsMessages.success.PAGE_CUSTOM_LINKS_SAVED,
		errors: null,
	}
}
