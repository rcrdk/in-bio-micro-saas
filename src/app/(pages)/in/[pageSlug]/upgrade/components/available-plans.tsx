'use client'

import { useParams } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'sonner'

import { PricingCard } from '@/components/common/pricing-card'
import { Button } from '@/components/ui/button'
import { useStripe } from '@/hooks/stripe'

type CheckoutType = 'subscription' | 'payment'

export function AvailablePlans() {
	const [isSubmitting, setIsSubmitting] = useState<CheckoutType | null>(null)

	const { createStripeCheckout } = useStripe()
	const { pageSlug } = useParams()

	async function handleCreateCheckout(mode: CheckoutType) {
		try {
			setIsSubmitting(mode)

			await createStripeCheckout({
				metadata: {
					pageSlug,
				},
				isSubscription: mode === 'subscription',
			})
		} catch (error) {
			setIsSubmitting(null)
			toast.error(
				'Ocorreu um erro ao tentar fazer o upgrade. Tente mais tarde.',
			)
		}
	}

	return (
		<>
			<PricingCard
				name="Mensal"
				description="Valor recorrente de"
				price="R$ 9,90"
				priceLabel="/mês"
				button={
					<Button
						onClick={() => handleCreateCheckout('subscription')}
						disabled={!!isSubmitting}
						loading={isSubmitting === 'subscription'}
						variant="secondary"
					>
						Fazer o upgrade
					</Button>
				}
			/>

			<PricingCard
				name="Anual"
				description="Economize [R$ 18,90] no ano"
				price="R$ 99,90"
				priceLabel="/ano"
				button={
					<Button
						onClick={() => handleCreateCheckout('payment')}
						disabled={!!isSubmitting}
						loading={isSubmitting === 'payment'}
					>
						Fazer o upgrade
					</Button>
				}
				isRecommend
			/>
		</>
	)
}
