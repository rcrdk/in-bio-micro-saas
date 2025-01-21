import 'server-only'

import { cert, getApps, initializeApp } from 'firebase-admin/app'
import { getFirestore } from 'firebase-admin/firestore'
import { getStorage } from 'firebase-admin/storage'

import { env } from '@/lib/env'

export const firebaseCertificate = cert({
	projectId: env.FIREBASE_PROJECT_ID,
	clientEmail: env.FIREBASE_CLIENT_EMAIL,
	privateKey: env.FIREBASE_PRIVATE_KEY,
})

const isFirebaseNotInitialized = !getApps().length

if (isFirebaseNotInitialized) {
	initializeApp({
		credential: firebaseCertificate,
		storageBucket: env.FIREBASE_STORAGE_BUCKET,
	})
}

export const DB = getFirestore()
export const Storage = getStorage().bucket()

export async function getDownloadUrlFromPath(path?: string) {
	if (!path) return null

	const file = Storage.file(path)

	const [url] = await file.getSignedUrl({
		action: 'read',
		expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
	})

	return url
}
