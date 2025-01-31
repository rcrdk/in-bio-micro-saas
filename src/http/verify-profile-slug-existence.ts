'use server'

import { DB } from '@/lib/firebase'

export async function verifyProfileSlugExistence(slug: string) {
	const snapshot = await DB.collection('profiles').doc(slug).get()

	return snapshot.exists
}
