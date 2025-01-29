'use client'

import { useStripe } from '@/hooks/stripe'

export function TotalVisitsPortalButton() {
	const { createStripePortal } = useStripe()

	return (
		<button
			className="focus-themed flex-grow py-1 text-base text-content-placeholder transition-colors hover:text-white sm:flex-grow-0"
			onClick={createStripePortal}
		>
			Portal
		</button>
	)
}
