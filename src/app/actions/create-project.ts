'use server'

import { randomUUID } from 'node:crypto'

import { Timestamp } from 'firebase-admin/firestore'

import { auth } from '@/lib/auth'
import { DB, Storage } from '@/lib/firebase'

export async function createProject(data: FormData) {
	const session = await auth()

	if (!session?.user) return false

	const [pageSlug, projectName, projectDescription, projectUrl, file] = [
		data.get('pageSlug') as string,
		data.get('name') as string,
		data.get('description') as string,
		data.get('url') as string,
		data.get('file') as File,
	]

	const generateId = randomUUID()
	const storageRef = Storage.file(
		`projects/${pageSlug}/${generateId}-${file.name}`,
	)
	const arrayBuffer = await file.arrayBuffer()
	const buffer = Buffer.from(arrayBuffer)

	await storageRef.save(buffer)

	const imagePath = storageRef.name

	try {
		await DB.collection('profiles')
			.doc(pageSlug)
			.collection('projects')
			.doc(generateId)
			.set({
				id: generateId,
				userId: session.user.id,
				projectName,
				projectDescription,
				projectUrl,
				imagePath,
				totalClicks: 0,
				createdAt: Timestamp.now().toMillis(),
				updatedAt: Timestamp.now().toMillis(),
			})

		return true
	} catch (error) {
		return error
	}
}
