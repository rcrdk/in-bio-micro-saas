import { Timestamp } from 'firebase-admin/firestore'

import { DB } from '@/lib/firebase'

export async function authCreateUserEvent(userId?: string) {
	if (!userId) return

	await DB.collection('users').doc(userId).update({
		createdAt: Timestamp.now().toMillis(),
	})
}
