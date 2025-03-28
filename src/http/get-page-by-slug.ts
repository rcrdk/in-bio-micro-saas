import 'server-only'

import { unstable_cache as cache } from 'next/cache'

import type { PageDTO } from '@/dtos/page'
import { DB } from '@/lib/firebase'

async function getPageBySlugFn(slug: string) {
	const snapshot = await DB.collection('pages').doc(slug).get()
	return snapshot.data() as PageDTO | undefined
}

export async function getPageBySlug(slug: string) {
	return cache(() => getPageBySlugFn(slug), [`get-page-by-slug-${slug}`], {
		tags: ['get-page-by-slug', `get-page-by-slug-${slug}`],
		revalidate: 60 * 60 * 12, // half-day
	})()
}
