import type { WriteResult } from 'firebase-admin/firestore'
import { Timestamp } from 'firebase-admin/firestore'
import sharp from 'sharp'

import { DB, Storage } from '@/lib/firebase'

type UpdatePageInformationRequest = {
	slug: string
	name: string
	description: string
	file?: File
}

type UpdatePageInformationResponse = WriteResult

export async function updatePageInformation({
	slug,
	name,
	description,
	file,
}: UpdatePageInformationRequest): Promise<UpdatePageInformationResponse> {
	const ref = DB.collection('pages').doc(slug)

	let imagePath = null
	const hasFileSelected = file && file.size > 0

	if (hasFileSelected) {
		const currentImage = (await ref.get()).data()?.imagePath

		if (currentImage) {
			const storageRef = Storage.file(currentImage)
			const currentStoragePathExists = await storageRef.exists()
			if (currentStoragePathExists) await storageRef.delete()
		}

		const storageRef = Storage.file(`pages/${slug}/${slug}-${file.name}`)
		const arrayBuffer = await file.arrayBuffer()
		const buffer = Buffer.from(arrayBuffer)
		const compressImage = await sharp(buffer).resize(1024).jpeg().toBuffer()
		await storageRef.save(compressImage)
		imagePath = storageRef.name
	}

	const response = await ref.update({
		name,
		description,
		...(hasFileSelected && { imagePath }),
		updatedAt: Timestamp.now().toMillis(),
	})

	return response
}
