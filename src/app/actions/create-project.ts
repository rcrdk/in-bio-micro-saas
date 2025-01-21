'use server'

import { randomUUID } from 'node:crypto'

import { Timestamp } from 'firebase-admin/firestore'

import { auth } from '@/lib/auth'
import { DB, Storage } from '@/lib/firebase'

export async function createProject(data: FormData) {
	const session = await auth()

	if (!session?.user) return false

	const [profileId, projectName, projectDescription, projectUrl, file] = [
		data.get('profileId') as string,
		data.get('name') as string,
		data.get('description') as string,
		data.get('url') as string,
		data.get('file') as File,
	]

	const generateId = randomUUID()
	const storageRef = Storage.file(
		`projects/${profileId}/${generateId}-${file.name}`,
	)
	const arrayBuffer = await file.arrayBuffer()
	const buffer = Buffer.from(arrayBuffer)

	await storageRef.save(buffer)

	const imagePath = storageRef.name

	try {
		await DB.collection('projects')
			.doc(profileId)
			.collection('projects')
			.doc(generateId)
			.set({
				userId: session.user.id,
				projectName,
				projectDescription,
				projectUrl,
				imagePath,
				createdAt: Timestamp.now().toMillis(),
			})

		return true
	} catch (error) {
		return false
	}
}
