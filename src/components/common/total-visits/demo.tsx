import { TrendingUp } from 'lucide-react'

export function TotalVisitsDemo() {
	return (
		<div className="pointer-events-auto flex w-min items-center gap-5 whitespace-nowrap rounded-xl border border-sticky-border bg-sticky-background px-8 py-3 shadow-lg">
			<span className="font-bold text-white">Total de visitas</span>

			<div className="flex items-center gap-2 text-accent-green">
				<span className="text-3xl font-bold">
					{(12453).toLocaleString('pt-br')}
				</span>
				<TrendingUp />
			</div>
		</div>
	)
}
