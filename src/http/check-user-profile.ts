import 'server-only'

import type { ProfileData } from '@/http/get-profile'
import { DB } from '@/lib/firebase'

export async function checkUserProfile(userId: string) {
	const snapshot = await DB.collection('profiles')
		.where('userId', '==', userId)
		.limit(1)
		.get()

	return snapshot.docs?.[0]?.data() as ProfileData | undefined
}
