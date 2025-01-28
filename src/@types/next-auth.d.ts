import type { DefaultSession } from 'next-auth'

declare module 'next-auth' {
	interface Session {
		user: {
			customerId?: string
			createdAt?: number
			isTrial?: boolean
			isPaid?: boolean
		} & DefaultSession['user']
	}

	interface User {
		customerId?: string
		createdAt?: number
		isTrial?: boolean
		isPaid?: boolean
	}
}
