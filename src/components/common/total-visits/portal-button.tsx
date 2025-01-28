'use client'

import { useStripe } from '@/hooks/stripe'

export function PortalButton() {
	const { createStripePortal } = useStripe()

	return (
		<button
			className="focus-themed text-base text-content-placeholder transition-colors hover:text-white"
			onClick={createStripePortal}
		>
			Portal
		</button>
	)
}
