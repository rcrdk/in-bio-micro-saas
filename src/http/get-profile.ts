import 'server-only'

import { DB } from '@/lib/firebase'

export type ProfileData = {
	userId: string
	totalVisits: number
	createdAt: number
	socialMedia?: {
		github: string
		linkedin: string
		twitter: string
		instagram: string
	}
}

export async function getProfile(profileId: string) {
	const snapshot = await DB.collection('profiles').doc(profileId).get()

	return snapshot.data() as ProfileData | undefined
}
