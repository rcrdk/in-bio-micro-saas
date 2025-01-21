'use server'

import { Timestamp } from 'firebase-admin/firestore'

import { auth } from '@/lib/auth'
import { DB } from '@/lib/firebase'

export async function createLink(link: string) {
	const session = await auth()

	if (!session?.user) return false

	try {
		await DB.collection('profiles')
			.doc(link)
			.set({
				userId: session.user.id,
				name: session.user.name ?? '',
				description: '',
				imagePath: null,
				totalVisits: 0,
				link,
				socialMedia: {
					github: '',
					linkedin: '',
					twitter: '',
					instagram: '',
				},
				customLinks: {
					link1: { title: '', url: '' },
					link2: { title: '', url: '' },
					link3: { title: '', url: '' },
				},
				createdAt: Timestamp.now().toMillis(),
				updatedAt: Timestamp.now().toMillis(),
			})

		return true
	} catch (error) {
		return false
	}
}
