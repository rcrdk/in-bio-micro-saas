import { FirestoreAdapter } from '@auth/firebase-adapter'
import NextAuth from 'next-auth'
import Google from 'next-auth/providers/google'

import { authCreateUserEvent } from '@/http/auth-create-user-event'
import { firebaseCertificate } from '@/lib/firebase'

export const { handlers, signIn, signOut, auth } = NextAuth({
	adapter: FirestoreAdapter({
		credential: firebaseCertificate,
	}),
	providers: [Google],
	events: {
		createUser: async ({ user }) => await authCreateUserEvent(user.id),
	},
})
