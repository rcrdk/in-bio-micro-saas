'use client'

import { TrendingUp } from 'lucide-react'

import { cn } from '@/utils/tailwind-cn'

type Props = {
	counter: number
	isPaid: boolean
}

export function TotalVisits({ counter = 0 }: Props) {
	const isCounterLarger = counter > 99999

	return (
		<div className="border-sticky-border bg-sticky-background/85 sm:bg-sticky-background xs:px-8 xs:gap-5 xs:justify-center xs:h-14 pointer-events-auto flex h-12 w-full items-center justify-evenly gap-0 rounded-xl border whitespace-nowrap shadow-lg backdrop-blur-xs select-none sm:w-auto">
			<span
				className={cn(
					'font-bold text-white',
					isCounterLarger ? 'xs:text-base text-sm' : 'text-base',
				)}
			>
				Total de visitas
			</span>

			<div className="text-accent-green xs:gap-2 flex items-center gap-1">
				<span
					className={cn(
						'font-bold',
						isCounterLarger
							? 'xs:text-2xl text-xl sm:text-3xl'
							: 'text-2xl sm:text-3xl',
					)}
				>
					{counter.toLocaleString('pt-br')}
				</span>
				<TrendingUp />
			</div>
		</div>
	)
}
