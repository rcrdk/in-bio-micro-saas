import { FirestoreAdapter } from '@auth/firebase-adapter'
import { Timestamp } from 'firebase-admin/firestore'
import NextAuth from 'next-auth'
import Google from 'next-auth/providers/google'

import { DB, firebaseCertificate } from '@/lib/firebase'

export const { handlers, signIn, signOut, auth } = NextAuth({
	adapter: FirestoreAdapter({
		credential: firebaseCertificate,
	}),
	providers: [Google],
	events: {
		createUser: async ({ user }) => {
			if (!user.id) return

			await DB.collection('users').doc(user.id).update({
				createdAt: Timestamp.now().toMillis(),
			})
		},
	},
})
