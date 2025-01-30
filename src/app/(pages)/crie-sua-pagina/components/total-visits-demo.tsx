import { TrendingUp } from 'lucide-react'

export function TotalVisitsDemo() {
	return (
		<div className="border-sticky-border bg-sticky-background pointer-events-auto flex w-min items-center gap-5 rounded-xl border px-8 py-3 whitespace-nowrap shadow-lg">
			<span className="font-bold text-white">Total de visitas</span>

			<div className="text-accent-green flex items-center gap-2">
				<span className="text-2xl font-bold sm:text-3xl">
					{(12453).toLocaleString('pt-br')}
				</span>
				<TrendingUp />
			</div>
		</div>
	)
}
