'use client'

import { useStripe } from '@/hooks/stripe'

export function TotalVisitsPortalButton() {
	const { createStripePortal } = useStripe()

	return (
		<button
			className="focus-themed text-content-placeholder grow py-1 text-base transition-colors hover:text-white sm:grow-0"
			onClick={createStripePortal}
		>
			Portal
		</button>
	)
}
