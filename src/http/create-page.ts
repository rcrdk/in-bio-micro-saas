import { Timestamp, type WriteResult } from 'firebase-admin/firestore'

import { DB } from '@/lib/firebase'

type CreatePageRequest = {
	slug: string
	userId: string
	name: string
	trialEndsAt: number
}

type CreatePageResponse = WriteResult

export async function createPage({
	slug,
	userId,
	name,
	trialEndsAt,
}: CreatePageRequest): Promise<CreatePageResponse> {
	const response = await DB.collection('pages')
		.doc(slug)
		.set({
			userId,
			name,
			description: '',
			imagePath: null,
			totalVisits: 0,
			slug,
			isPaid: false,
			socialMedia: {
				github: '',
				linkedin: '',
				twitter: '',
				instagram: '',
				youtube: '',
				facebook: '',
			},
			customLinks: {
				link1: { title: '', url: '' },
				link2: { title: '', url: '' },
				link3: { title: '', url: '' },
			},
			trialEndsAt,
			subscriptionEndedAt: null,
			createdAt: Timestamp.now().toMillis(),
			updatedAt: Timestamp.now().toMillis(),
		})

	return response
}
