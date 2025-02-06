'use client'

import { RefreshCw, TrendingUp } from 'lucide-react'

import { refreshPageVisitsCounterAction } from '@/app/actions/refresh-page-total-count'
import { Button } from '@/components/ui/button'
import { cn } from '@/utils/tailwind-cn'

type Props = {
	counter: number
	slug: string
}

export function TotalVisits({ counter = 0, slug }: Props) {
	const isCounterLarger = counter > 99999

	return (
		<div className="border-sticky-border bg-sticky-background/85 sm:bg-sticky-background xs:px-8 xs:gap-5 xs:justify-center xs:h-14 pointer-events-auto relative flex h-12 w-full items-center justify-evenly gap-0 rounded-xl border whitespace-nowrap shadow-lg backdrop-blur-xs select-none sm:w-auto">
			<div className="absolute top-1/2 left-0 -translate-1/2">
				<Button
					variant="ghost"
					icon="rounded"
					className="bg-sticky-background border-sticky-border size-8"
					onClick={() => refreshPageVisitsCounterAction(slug)}
					aria-label="Atualizar contagem de visualizações"
				>
					<RefreshCw width={14} />
				</Button>
			</div>

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
