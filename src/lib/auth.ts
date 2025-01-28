import { FirestoreAdapter } from '@auth/firebase-adapter'
import { Timestamp } from 'firebase-admin/firestore'
import NextAuth from 'next-auth'
import Google from 'next-auth/providers/google'

import { env } from '@/lib/env'
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
	callbacks: {
		session: ({ session, user }) => ({
			...session,
			user: {
				...session.user,
				isTrial:
					!!user.createdAt &&
					new Date(user.createdAt).getTime() >
						new Date().getTime() -
							1000 * 60 * 60 * 24 * env.NEXT_PUBLIC_TRIAL_DAYS,
			},
		}),
	},
})
