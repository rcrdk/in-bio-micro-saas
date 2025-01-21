'use server'

import { DB } from '@/lib/firebase'

export async function verifyLink(slug: string) {
	const snapshot = await DB.collection('profiles').doc(slug).get()

	return snapshot.exists
}
