import dayjs from 'dayjs'
import Link from 'next/link'

import { auth } from '@/lib/auth'
import { env } from '@/lib/env'

type Props = {
	pageSlug: string
}

export async function UpgradeMessage({ pageSlug }: Props) {
	const session = await auth()

	const isOnTrial = session?.user.isTrial && !session.user.isPaid

	if (!isOnTrial) {
		return null
	}

	function getTrialDaysMessage() {
		// eslint-disable-next-line prettier/prettier
		const expirationDate = dayjs(session?.user.createdAt).add(env.NEXT_PUBLIC_TRIAL_DAYS, 'days')
		const remainingTimeInDays = expirationDate.diff(dayjs(), 'days', true)

		if (remainingTimeInDays > 1) {
			return `Faltam apenas ${Math.ceil(remainingTimeInDays)} dias para o fim do seu teste.`
		}

		return `Seu período de teste termina em poucas horas.`
	}

	return (
		<div className="sticky left-0 right-0 top-0 z-10 gap-1 text-balance border-b border-sticky-border bg-sticky-background/85 px-6 py-2 text-center text-sm shadow-sm backdrop-blur-sm sm:bg-sticky-background sm:py-3 sm:text-base">
			<span>{getTrialDaysMessage()}</span>{' '}
			<Link
				href={`/in/${pageSlug}/upgrade`}
				className="focus-themed font-bold text-accent-green hover:text-accent-green-hover"
			>
				Faça o upgrade agora!
			</Link>
		</div>
	)
}
