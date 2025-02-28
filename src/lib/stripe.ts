import StripePackage from 'stripe'

import { env } from '@/lib/env'

export const Stripe = new StripePackage(env.STRIPE_SECRET_KEY, {
	apiVersion: '2025-02-24.acacia',
})
