import { Timestamp, type WriteResult } from 'firebase-admin/firestore'
import sharp from 'sharp'

import { DB, Storage } from '@/lib/firebase'

type UpdateProjectRequest = {
	slug: string
	projectId: string
	name: string
	description: string
	url: string
	file?: File
}

type UpdateProjectResponse = WriteResult

export async function updateProject({
	slug,
	projectId: id,
	name,
	description,
	url,
	file,
}: UpdateProjectRequest): Promise<UpdateProjectResponse> {
	const ref = DB.collection('pages').doc(slug).collection('projects').doc(id)

	let imagePath = null
	const hasFileSelected = file && file.size > 0

	if (hasFileSelected) {
		const currentImage = (await ref.get()).data()?.imagePath

		if (currentImage) {
			const storageRef = Storage.file(currentImage)
			const currentStoragePathExists = await storageRef.exists()
			if (currentStoragePathExists) await storageRef.delete()
		}

		const storageRef = Storage.file(`projects/${slug}/${id}-${file.name}`)
		const arrayBuffer = await file.arrayBuffer()
		const buffer = Buffer.from(arrayBuffer)
		const compressImage = await sharp(buffer).resize(1024).jpeg().toBuffer()
		await storageRef.save(compressImage)
		imagePath = storageRef.name
	}

	const response = await ref.update({
		name,
		description,
		url,
		...(hasFileSelected && { imagePath }),
		updatedAt: Timestamp.now().toMillis(),
	})

	return response
}
