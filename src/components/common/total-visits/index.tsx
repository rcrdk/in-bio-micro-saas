import { TrendingUp } from 'lucide-react'

import { authActions } from '@/app/actions/auth'
import { PortalButton } from '@/components/common/total-visits/portal-button'
import { auth } from '@/lib/auth'

type Props = {
	counter: number
	showActions?: boolean
}

export async function TotalVisits({ counter = 0, showActions = false }: Props) {
	const session = await auth()

	return (
		<div className="pointer-events-auto flex w-min items-center gap-5 whitespace-nowrap rounded-xl border border-sticky-border bg-sticky-background px-8 py-3 shadow-lg">
			<span className="font-bold text-white">Total de visitas</span>

			<div className="flex items-center gap-2 text-accent-green">
				<span className="text-3xl font-bold">
					{counter.toLocaleString('pt-br')}
				</span>
				<TrendingUp />
			</div>

			{showActions && (
				<div className="flex items-center gap-4 border-l border-border-secondary pl-5">
					{session?.user.isPaid && <PortalButton />}

					<form action={authActions}>
						<button className="focus-themed text-base text-content-placeholder transition-colors hover:text-white">
							Sair
						</button>
					</form>
				</div>
			)}
		</div>
	)
}
