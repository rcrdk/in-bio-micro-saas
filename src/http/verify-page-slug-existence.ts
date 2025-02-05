'use server'

import { DB } from '@/lib/firebase'

export async function verifyPageSlugExistence(slug: string) {
	const snapshot = await DB.collection('pages').doc(slug).get()

	return snapshot.exists
}
