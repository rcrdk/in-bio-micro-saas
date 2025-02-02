'use client'

import { TrendingUp } from 'lucide-react'

type Props = {
	counter: number
	isPaid: boolean
}

export function TotalVisits({ counter = 0 }: Props) {
	return (
		<div className="border-sticky-border bg-sticky-background/85 sm:bg-sticky-background xs:px-8 xs:h-14 xs:gap-5 xs:justify-center pointer-events-auto flex h-12 w-full items-center justify-evenly gap-0 rounded-xl border whitespace-nowrap shadow-lg backdrop-blur-xs select-none sm:w-auto">
			<span className="xs:text-base text-sm font-bold text-white">
				Total de visitas
			</span>

			<div className="text-accent-green xs:gap-2 flex items-center gap-1">
				<span className="xs:text-2xl text-xl font-bold sm:text-3xl">
					{counter.toLocaleString('pt-br')}
				</span>
				<TrendingUp />
			</div>
		</div>
	)
}
