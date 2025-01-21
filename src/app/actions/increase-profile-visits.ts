'use server'

import { FieldValue } from 'firebase-admin/firestore'

import { DB } from '@/lib/firebase'

export async function increaseProfileVisits(profileId: string) {
	const profileRef = DB.collection('profiles').doc(profileId)

	await DB.runTransaction(async (transaction) => {
		const profile = await transaction.get(profileRef)

		if (!profile.exists) return

		transaction.update(profileRef, {
			totalVisits: FieldValue.increment(1),
		})
	})
}
