import 'server-only'

import { cert, getApps, initializeApp } from 'firebase-admin/app'
import { getFirestore } from 'firebase-admin/firestore'
import { getStorage } from 'firebase-admin/storage'

import { env } from '@/lib/env'

const decodedPrivateKey = Buffer.from(
	env.FIREBASE_PRIVATE_KEY,
	'base64',
).toString('utf-8')

export const firebaseCertificate = cert({
	projectId: env.FIREBASE_PROJECT_ID,
	clientEmail: env.FIREBASE_CLIENT_EMAIL,
	privateKey: decodedPrivateKey,
})

const isFirebaseNotInitialized = !getApps().length

if (!isFirebaseNotInitialized) {
	initializeApp({
		credential: firebaseCertificate,
		storageBucket: env.FIREBASE_STORAGE_BUCKET,
	})
}

export const DB = getFirestore()
export const Storage = getStorage().bucket()
