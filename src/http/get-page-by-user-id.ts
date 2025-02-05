import 'server-only'

import { unstable_cache as cache } from 'next/cache'

import type { PageData } from '@/http/types/get-page'
import { DB } from '@/lib/firebase'

async function getPageByUserIdFn(userId: string) {
	const snapshot = await DB.collection('pages')
		.where('userId', '==', userId)
		.limit(1)
		.get()

	return snapshot.docs?.[0]?.data() as PageData | undefined
}

export async function getPageByUserId(userId: string) {
	return cache(
		() => getPageByUserIdFn(userId),
		[`get-page-by-user-id-${userId}`],
		{
			tags: ['get-page-by-user-id', `get-page-by-user-id-${userId}`],
			revalidate: 60 * 60 * 12, // half-day
		},
	)()
}
