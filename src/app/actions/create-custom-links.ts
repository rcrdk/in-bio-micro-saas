'use server'

import { Timestamp } from 'firebase-admin/firestore'

import type { ProfileCustomLinks, ProfileLinkProps } from '@/http/get-profile'
import { auth } from '@/lib/auth'
import { DB } from '@/lib/firebase'

type Props = Record<ProfileCustomLinks, ProfileLinkProps> & {
	profileId: string
}

export async function createCustomLinks({
	profileId,
	link1,
	link2,
	link3,
}: Props) {
	const session = await auth()

	if (!session) return false

	try {
		await DB.collection('profiles').doc(profileId).update({
			customLinks: {
				link1,
				link2,
				link3,
			},
			updatedAt: Timestamp.now().toMillis(),
		})

		return true
	} catch (error) {
		return false
	}
}
