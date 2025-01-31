import 'server-only'

import { unstable_cache as cache } from 'next/cache'

import type { ProfileData } from '@/http/dto/get-profile'
import { DB } from '@/lib/firebase'

async function getProfileByUserIdFn(userId: string) {
	const snapshot = await DB.collection('profiles')
		.where('userId', '==', userId)
		.limit(1)
		.get()

	return snapshot.docs?.[0]?.data() as ProfileData | undefined
}

export async function getProfileByUserId(userId: string) {
	return cache(
		() => getProfileByUserIdFn(userId),
		[`get-profile-by-user-id-${userId}`],
		{
			tags: ['get-profile-by-user-id', `get-profile-by-user-id-${userId}`],
		},
	)()
}
