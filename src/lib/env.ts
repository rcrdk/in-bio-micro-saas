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
		STRIPE_SECRET_KEY: z.string(),
		STRIPE_WEBHOOK_SECRET: z.string(),
		STRIPE_PAYMENT_PRICE_ID: z.string(),
		STRIPE_SUBSCRIPTION_PRICE_ID: z.string(),
		RESEND_SECRET_KEY: z.string(),
		MIXPANEL_SECRET: z.string().optional(),
	},

	shared: {
		NEXT_PUBLIC_APP_URL: z.string(),
		NEXT_PUBLIC_STRIPE_PUBLIC_KEY: z.string(),
		NEXT_PUBLIC_TRIAL_DAYS: z.coerce.number(),
		NEXT_PUBLIC_GOOGLE_ANALYTICS: z.string().optional(),
	},

	runtimeEnv: {
		NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
		AUTH_SECRET: process.env.AUTH_SECRET,
		AUTH_GOOGLE_ID: process.env.AUTH_GOOGLE_ID,
		AUTH_GOOGLE_SECRET: process.env.AUTH_GOOGLE_SECRET,
		FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID,
		FIREBASE_CLIENT_EMAIL: process.env.FIREBASE_CLIENT_EMAIL,
		FIREBASE_PRIVATE_KEY: process.env.FIREBASE_PRIVATE_KEY,
		FIREBASE_STORAGE_BUCKET: process.env.FIREBASE_STORAGE_BUCKET,
		NEXT_PUBLIC_TRIAL_DAYS: process.env.NEXT_PUBLIC_TRIAL_DAYS,
		NEXT_PUBLIC_STRIPE_PUBLIC_KEY: process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY,
		STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
		STRIPE_WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET,
		STRIPE_PAYMENT_PRICE_ID: process.env.STRIPE_PAYMENT_PRICE_ID,
		STRIPE_SUBSCRIPTION_PRICE_ID: process.env.STRIPE_SUBSCRIPTION_PRICE_ID,
		NEXT_PUBLIC_GOOGLE_ANALYTICS: process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS,
		RESEND_SECRET_KEY: process.env.RESEND_SECRET_KEY,
		MIXPANEL_SECRET: process.env.MIXPANEL_SECRET,
	},
})
