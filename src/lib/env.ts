import { createEnv } from '@t3-oss/env-nextjs'
import { z } from 'zod'

export const env = createEnv({
	emptyStringAsUndefined: true,

	server: {
		FIREBASE_PROJECT_ID: z.string(),
		FIREBASE_CLIENT_EMAIL: z.string(),
		FIREBASE_PRIVATE_KEY: z.string().base64(),
		FIREBASE_STORAGE_BUCKET: z.string(),
	},

	shared: {
		NEXT_PUBLIC_TRIAL_DAYS: z.coerce.number(),
	},

	runtimeEnv: {
		FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID,
		FIREBASE_CLIENT_EMAIL: process.env.FIREBASE_CLIENT_EMAIL,
		FIREBASE_PRIVATE_KEY: process.env.FIREBASE_PRIVATE_KEY,
		FIREBASE_STORAGE_BUCKET: process.env.FIREBASE_STORAGE_BUCKET,
		NEXT_PUBLIC_TRIAL_DAYS: process.env.NEXT_PUBLIC_TRIAL_DAYS,
	},
})
