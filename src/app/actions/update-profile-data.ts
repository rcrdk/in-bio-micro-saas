'use server'

import { randomUUID } from 'node:crypto'

import { Timestamp } from 'firebase-admin/firestore'

import { auth } from '@/lib/auth'
import { DB, Storage } from '@/lib/firebase'

export async function updateProfile(data: FormData) {
	const session = await auth()

	if (!session?.user) return false

	try {
		const [pageSlug, name, description, file] = [
			data.get('pageSlug') as string,
			data.get('name') as string,
			data.get('description') as string,
			data.get('file') as File | undefined,
		]

		let imagePath = null

		const hasFile = file && file.size > 0

		if (hasFile) {
			const currentProfile = await DB.collection('profiles').doc(pageSlug).get()
			const currentImagePath = currentProfile?.data()?.imagePath

			if (currentImagePath) {
				const storageRef = Storage.file(currentImagePath)
				const currentStoragePathExists = await storageRef.exists()
				if (currentStoragePathExists) await storageRef.delete()
			}

			const storageRef = Storage.file(
				`profiles/${pageSlug}/${randomUUID()}-${file.name}`,
			)
			const arrayBuffer = await file.arrayBuffer()
			const buffer = Buffer.from(arrayBuffer)

			await storageRef.save(buffer)

			imagePath = storageRef.name
		}

		await DB.collection('profiles')
			.doc(pageSlug)
			.update({
				name,
				description,
				...(hasFile && { imagePath }),
				updatedAt: Timestamp.now().toMillis(),
			})

		return true
	} catch (error) {
		return false
	}
}
