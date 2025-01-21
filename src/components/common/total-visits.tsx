import { TrendingUp } from 'lucide-react'

type Props = {
	counter: number
}

export function TotalVisits({ counter = 0 }: Props) {
	return (
		<div className="pointer-events-auto flex w-min items-center gap-5 whitespace-nowrap rounded-xl border border-border-primary bg-background-secondary px-8 py-3 shadow-lg">
			<span className="font-bold text-white">Total de visitas</span>

			<div className="flex items-center gap-2 text-accent-green">
				<span className="text-3xl font-bold">
					{counter.toLocaleString('pt-br')}
				</span>
				<TrendingUp />
			</div>

			{/* <div className="flex items-center gap-2">
				<button>Portal</button>

				<button>Sair</button>
			</div> */}
		</div>
	)
}
