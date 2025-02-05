'use server'

import { FieldValue } from 'firebase-admin/firestore'

import { DB } from '@/lib/firebase'

export async function increasePageVisits(slug: string) {
	const pageRef = DB.collection('pages').doc(slug)

	await DB.runTransaction(async (transaction) => {
		const page = await transaction.get(pageRef)

		if (!page.exists) return

		transaction.update(pageRef, {
			totalVisits: FieldValue.increment(1),
		})
	})
}
