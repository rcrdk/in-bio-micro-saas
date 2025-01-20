import { FirestoreAdapter } from '@auth/firebase-adapter'
import NextAuth from 'next-auth'
import Google from 'next-auth/providers/google'

import { firebaseCertificate } from '@/lib/firebase'

export const { handlers, signIn, signOut, auth } = NextAuth({
	adapter: FirestoreAdapter({
		credential: firebaseCertificate,
	}),
	debug: true,
	providers: [Google],
	events: {},
	callbacks: {},
})
