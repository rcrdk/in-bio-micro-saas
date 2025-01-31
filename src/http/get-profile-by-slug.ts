import 'server-only'

import { unstable_cache as cache } from 'next/cache'

import type { ProfileData } from '@/http/dto/get-profile'
import { DB } from '@/lib/firebase'

async function getProfileBySlugFn(slug: string) {
	const snapshot = await DB.collection('profiles').doc(slug).get()
	return snapshot.data() as ProfileData | undefined
}

export async function getProfileBySlug(slug: string) {
	return cache(
		() => getProfileBySlugFn(slug),
		[`get-profile-by-slug-${slug}`],
		{
			tags: ['get-profile-by-slug', `get-profile-by-slug-${slug}`],
		},
	)()
}
