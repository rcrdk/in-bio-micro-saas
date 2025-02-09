'use server'

import { auth, signIn, signOut } from '@/lib/auth'

export async function authAction() {
	const session = await auth()

	if (!session) {
		return await signIn('google', {
			redirectTo: '/criar-agora',
		})
	}

	return await signOut({
		redirectTo: '/',
	})
}
