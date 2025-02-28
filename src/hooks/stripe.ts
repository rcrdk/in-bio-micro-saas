import { useEffect, useState } from 'react'
import { loadStripe, type Stripe } from '@stripe/stripe-js'

import { env } from '@/lib/env'

type CreateStripeCheckout = {
	metadata: unknown
	isSubscription: boolean
}

export function useStripe() {
	const [stripe, setStripe] = useState<Stripe | null>(null)

	useEffect(() => {
		async function loadStripeAsync() {
			const stripeInstance = await loadStripe(env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY)
			setStripe(stripeInstance)
		}

		loadStripeAsync()
	}, [])

	async function createStripeCheckout({ metadata, isSubscription }: CreateStripeCheckout) {
		try {
			const response = await fetch('/api/stripe/create-checkout', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ metadata, isSubscription }),
			})

			const data = await response.json()

			await stripe?.redirectToCheckout({
				sessionId: data.sessionId,
			})
		} catch (error) {
			console.error(error)
		}
	}

	async function createStripePortal() {
		const response = await fetch('/api/stripe/create-portal', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
		})

		const data = await response.json()

		window.location.href = data.url
	}

	return {
		createStripeCheckout,
		createStripePortal,
	}
}
