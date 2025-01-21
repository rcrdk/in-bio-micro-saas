'use server'

import { FieldValue } from 'firebase-admin/firestore'

import { DB } from '@/lib/firebase'

export async function increaseProjectClicks(
	profileId: string,
	projectId: string,
) {
	const projectRef = DB.collection('profiles')
		.doc(profileId)
		.collection('projects')
		.doc(projectId)

	await DB.runTransaction(async (transaction) => {
		const project = await transaction.get(projectRef)

		if (!project.exists) return

		transaction.update(projectRef, {
			totalClicks: FieldValue.increment(1),
		})
	})
}
