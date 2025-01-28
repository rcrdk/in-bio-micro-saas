'use client'

import { useParams } from 'next/navigation'

import { Button } from '@/components/ui/button'
import { useStripe } from '@/hooks/stripe'

export function PlansButtons() {
	const { createStripeCheckout } = useStripe()
	const { pageSlug } = useParams()

	function handleCreateCheckout(isSubscription: boolean) {
		createStripeCheckout({
			metadata: {
				pageSlug,
			},
			isSubscription,
		})
	}

	return (
		<>
			<Button onClick={() => handleCreateCheckout(true)}>R$ 9,90 /mês</Button>
			<Button onClick={() => handleCreateCheckout(false)}>R$ 99,90 /ano</Button>
		</>
	)
}
