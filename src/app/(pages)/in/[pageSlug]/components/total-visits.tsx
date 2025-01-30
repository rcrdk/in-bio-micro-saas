'use client'

import * as Collapsible from '@radix-ui/react-collapsible'
import { Menu, TrendingUp } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

import { TotalVisitsPortalButton } from '@/app/(pages)/in/[pageSlug]/components/total-visits-portal-button'
import { authActions } from '@/app/actions/auth'

type Props = {
	counter: number
	isPaid: boolean
}

export function TotalVisits({ counter = 0, isPaid }: Props) {
	const [showMenu, setShowMenu] = useState(false)

	return (
		<div className="border-sticky-border bg-sticky-background/85 sm:bg-sticky-background pointer-events-auto w-full rounded-xl border whitespace-nowrap shadow-lg backdrop-blur-xs sm:w-auto">
			<div className="flex items-center justify-center gap-3 px-3 py-2 sm:gap-5 sm:px-8 sm:py-3">
				<span className="text-sm font-bold text-white sm:text-base">
					Total de visitas
				</span>

				<div className="text-accent-green flex items-center gap-1 sm:gap-2">
					<span className="text-2xl font-bold sm:text-3xl">
						{counter.toLocaleString('pt-br')}
					</span>
					<TrendingUp />
				</div>

				<div className="border-border-secondary ml-2 flex items-center gap-4 border-l pl-3 sm:hidden">
					<button
						className="p-1"
						aria-label="Menu"
						onClick={() => setShowMenu((prev) => !prev)}
					>
						<Menu />
					</button>
				</div>

				<div className="border-border-secondary hidden items-center gap-4 border-l pl-5 sm:flex">
					<Link
						href="/"
						className="focus-themed text-content-placeholder block py-1 text-base transition-colors hover:text-white"
					>
						Home
					</Link>

					{isPaid && <TotalVisitsPortalButton />}

					<form action={authActions}>
						<button className="focus-themed text-content-placeholder text-base transition-colors hover:text-white">
							Sair
						</button>
					</form>
				</div>
			</div>

			<Collapsible.Root open={showMenu}>
				<Collapsible.Content className="data-[state=closed]:animate-collapsible-close data-[state=open]:animate-collapsible-open overflow-hidden">
					<div className="flex flex-wrap pb-1 text-center sm:hidden">
						<div className="border-border-secondary/50 mb-1 w-full border-t" />

						<Link
							href="/"
							className="focus-themed text-content-placeholder block grow py-1 text-base transition-colors hover:text-white"
						>
							Home
						</Link>

						{isPaid && <TotalVisitsPortalButton />}

						<form action={authActions} className="grow">
							<button className="focus-themed text-content-placeholder w-full py-1 text-base transition-colors hover:text-white">
								Sair
							</button>
						</form>
					</div>
				</Collapsible.Content>
			</Collapsible.Root>
		</div>
	)
}
