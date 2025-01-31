import type { DefaultSession } from 'next-auth'

declare module 'next-auth' {
	interface Session {
		user: {
			customerId?: string
		} & DefaultSession['user']
	}

	interface User {
		customerId?: string
	}
}
