'use server'

import { DB } from '@/lib/firebase'

export async function verifyLink(link: string) {
	const snapshot = await DB.collection('profiles').doc(link).get()

	return snapshot.exists
}
