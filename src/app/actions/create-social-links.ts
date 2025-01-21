'use server'

import { Timestamp } from 'firebase-admin/firestore'

import { auth } from '@/lib/auth'
import { DB } from '@/lib/firebase'

type Props = {
	pageSlug: string
	github: string
	linkedin: string
	twitter: string
	instagram: string
}

export async function createSocialLinks({
	pageSlug,
	github,
	linkedin,
	twitter,
	instagram,
}: Props) {
	const session = await auth()

	if (!session) return false

	try {
		await DB.collection('profiles').doc(pageSlug).update({
			socialMedia: {
				github,
				linkedin,
				twitter,
				instagram,
			},
			updatedAt: Timestamp.now().toMillis(),
		})

		return true
	} catch (error) {
		return false
	}
}
