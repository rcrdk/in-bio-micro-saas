import { Timestamp, type WriteResult } from 'firebase-admin/firestore'

import type { PageCustomLinks } from '@/dtos/page'
import { DB } from '@/lib/firebase'

type UpdatePageCustomLinksRequest = PageCustomLinks & {
	slug: string
}

type UpdatePageCustomLinksResponse = WriteResult

export async function updatePageCustomLinks({
	slug,
	link1,
	link2,
	link3,
}: UpdatePageCustomLinksRequest): Promise<UpdatePageCustomLinksResponse> {
	return await DB.collection('pages').doc(slug).update({
		customLinks: {
			link1,
			link2,
			link3,
		},
		updatedAt: Timestamp.now().toMillis(),
	})
}
