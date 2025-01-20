import { createEnv } from '@t3-oss/env-nextjs'
import { z } from 'zod'

export const env = createEnv({
	emptyStringAsUndefined: true,

	server: {
		AUTH_SECRET: z.string().uuid(),
		AUTH_GOOGLE_ID: z.string(),
		AUTH_GOOGLE_SECRET: z.string(),
		FIREBASE_PROJECT_ID: z.string(),
		FIREBASE_CLIENT_EMAIL: z.string(),
		FIREBASE_PRIVATE_KEY: z
			.string()
			.transform((value) => value.split(String.raw`\n`).join('\n')),
		FIREBASE_STORAGE_BUCKET: z.string(),
	},

	shared: {
		NEXT_PUBLIC_TRIAL_DAYS: z.coerce.number(),
	},

	runtimeEnv: {
		AUTH_SECRET: process.env.AUTH_SECRET,
		AUTH_GOOGLE_ID: process.env.AUTH_GOOGLE_ID,
		AUTH_GOOGLE_SECRET: process.env.AUTH_GOOGLE_SECRET,
		FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID,
		FIREBASE_CLIENT_EMAIL: process.env.FIREBASE_CLIENT_EMAIL,
		FIREBASE_PRIVATE_KEY: process.env.FIREBASE_PRIVATE_KEY,
		FIREBASE_STORAGE_BUCKET: process.env.FIREBASE_STORAGE_BUCKET,
		NEXT_PUBLIC_TRIAL_DAYS: process.env.NEXT_PUBLIC_TRIAL_DAYS,
	},
})
