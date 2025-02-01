'use client'

import 'dayjs/locale/pt-br'

import { sendGTMEvent } from '@next/third-parties/google'
import dayjs from 'dayjs'
import Link from 'next/link'

import { useStripe } from '@/hooks/stripe'
import { useTrialDays } from '@/hooks/trial-days'
import { cn } from '@/utils/tailwind-cn'

type Props = {
	pageSlug: string
	trialEndDate: number
	subscriptionEndedDate: number | null
}

export function UpgradeMessage({
	pageSlug,
	trialEndDate,
	subscriptionEndedDate,
}: Props) {
	const { trialExpired, trialMessage } = useTrialDays(trialEndDate)

	const { createStripePortal } = useStripe()

	function handleCreatePortal() {
		createStripePortal()
		sendGTMEvent({ event: 'click_to_upgrade', slug: pageSlug })
	}

	if (subscriptionEndedDate) {
		const dateFormatted = dayjs(subscriptionEndedDate)
			.locale('pt-br')
			.format('DD[ de ]MMMM[ de ]YYYY')

		return (
			<div className="border-sticky-border bg-sticky-background/85 sm:bg-sticky-background sticky top-0 right-0 left-0 z-10 gap-1 border-b px-6 py-2 text-center text-sm text-balance shadow-xs backdrop-blur-xs select-none sm:py-3 sm:text-base">
				<span>
					Sua página ficará visível para todos até dia{' '}
					<span className="font-bold">{dateFormatted}</span>.
				</span>{' '}
				<button
					onClick={handleCreatePortal}
					className="focus-themed text-accent-green hover:text-accent-green-hover cursor-pointer font-bold transition-colors"
				>
					Renove seu plano!
				</button>
			</div>
		)
	}

	return (
		<div className="border-sticky-border bg-sticky-background/85 sm:bg-sticky-background sticky top-0 right-0 left-0 z-10 gap-1 border-b px-6 py-2 text-center text-sm text-balance shadow-xs backdrop-blur-xs select-none sm:py-3 sm:text-base">
			<span>{trialMessage}</span>{' '}
			<Link
				href={`/in/${pageSlug}/upgrade`}
				onClick={() => sendGTMEvent({ event: 'click_to_upgrade' })}
				className={cn(
					'focus-themed font-bold transition-colors',
					trialExpired
						? 'text-red-500 hover:text-red-600'
						: 'text-accent-green hover:text-accent-green-hover',
				)}
			>
				Faça o upgrade agora!
			</Link>
		</div>
	)
}
