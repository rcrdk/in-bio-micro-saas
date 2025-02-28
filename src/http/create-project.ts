import { Timestamp, type WriteResult } from 'firebase-admin/firestore'
import sharp from 'sharp'

import { DB, Storage } from '@/lib/firebase'

type CreateProjectRequest = {
	slug: string
	userId: string
	id: string
	name: string
	description: string
	url: string
	file?: File
}

type CreateProjectResponse = WriteResult

export async function createProject({
	slug,
	userId,
	id,
	name,
	description,
	url,
	file,
}: CreateProjectRequest): Promise<CreateProjectResponse> {
	let imagePath = null

	if (file && file.size > 0) {
		const storageRef = Storage.file(`projects/${slug}/${id}-${file.name}`)
		const arrayBuffer = await file.arrayBuffer()
		const buffer = Buffer.from(arrayBuffer)
		const compressImage = await sharp(buffer).resize(1024).jpeg().toBuffer()
		await storageRef.save(compressImage)
		imagePath = storageRef.name
	}

	const response = await DB.collection('pages').doc(slug).collection('projects').doc(id).set({
		id,
		userId,
		name,
		description,
		url,
		imagePath,
		totalClicks: 0,
		createdAt: Timestamp.now().toMillis(),
		updatedAt: Timestamp.now().toMillis(),
	})

	return response
}
