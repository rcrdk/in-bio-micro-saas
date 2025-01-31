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
		<div className="border-sticky-border bg-sticky-background/85 sm:bg-sticky-background sticky top-0 right-0 left-0 z-10 gap-1 border-b px-6 py-2 text-center text-sm text-balance shadow-xs backdrop-blur-xs select-none sm:py-3 sm:text-base">
			<span>{getTrialDaysMessage()}</span>{' '}
			<Link
				href={`/in/${pageSlug}/upgrade`}
				className="focus-themed text-accent-green hover:text-accent-green-hover font-bold"
			>
				Faça o upgrade agora!
			</Link>
		</div>
	)
}
