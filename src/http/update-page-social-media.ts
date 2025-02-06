import { Timestamp, type WriteResult } from 'firebase-admin/firestore'

import type { PageSocialMediaLinks } from '@/dtos/page'
import { DB } from '@/lib/firebase'

type UpdatePageSocialMediaRequest = PageSocialMediaLinks & {
	slug: string
}

type UpdatePageSocialMediaResponse = WriteResult

export async function updatePageSocialMedia({
	slug,
	...links
}: UpdatePageSocialMediaRequest): Promise<UpdatePageSocialMediaResponse> {
	return await DB.collection('pages')
		.doc(slug)
		.update({
			socialMedia: {
				...links,
			},
			updatedAt: Timestamp.now().toMillis(),
		})
}
