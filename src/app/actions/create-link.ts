'use server'

import { Timestamp } from 'firebase-admin/firestore'

import { auth } from '@/lib/auth'
import { DB } from '@/lib/firebase'

export async function createLink(link: string) {
	const session = await auth()

	if (!session?.user) return false

	try {
		await DB.collection('profiles').doc(link).set({
			userId: session.user.id,
			totalVisits: 0,
			link,
			createdAt: Timestamp.now().toMillis(),
		})

		return true
	} catch (error) {
		return false
	}
}
