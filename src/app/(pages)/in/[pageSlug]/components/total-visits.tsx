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
		<div className="pointer-events-auto w-full whitespace-nowrap rounded-xl border border-sticky-border bg-sticky-background/85 shadow-lg backdrop-blur-sm sm:w-auto sm:bg-sticky-background">
			<div className="flex items-center justify-center gap-3 px-3 py-2 sm:gap-5 sm:px-8 sm:py-3">
				<span className="text-sm font-bold text-white sm:text-base">
					Total de visitas
				</span>

				<div className="flex items-center gap-1 text-accent-green sm:gap-2">
					<span className="text-2xl font-bold sm:text-3xl">
						{counter.toLocaleString('pt-br')}
					</span>
					<TrendingUp />
				</div>

				<div className="ml-2 flex items-center gap-4 border-l border-border-secondary pl-3 sm:hidden">
					<button
						className="p-1"
						aria-label="Menu"
						onClick={() => setShowMenu((prev) => !prev)}
					>
						<Menu />
					</button>
				</div>

				<div className="hidden items-center gap-4 border-l border-border-secondary pl-5 sm:flex">
					<Link
						href="/"
						className="focus-themed block py-1 text-base text-content-placeholder transition-colors hover:text-white"
					>
						Home
					</Link>

					{isPaid && <TotalVisitsPortalButton />}

					<form action={authActions}>
						<button className="focus-themed text-base text-content-placeholder transition-colors hover:text-white">
							Sair
						</button>
					</form>
				</div>
			</div>

			<Collapsible.Root open={showMenu}>
				<Collapsible.Content className="overflow-hidden data-[state=closed]:animate-collapsibleClose data-[state=open]:animate-collapsibleOpen">
					<div className="flex flex-wrap pb-1 text-center sm:hidden">
						<div className="mb-1 w-full border-t border-border-secondary/50" />

						<Link
							href="/"
							className="focus-themed block flex-grow py-1 text-base text-content-placeholder transition-colors hover:text-white"
						>
							Home
						</Link>

						{isPaid && <TotalVisitsPortalButton />}

						<form action={authActions} className="flex-grow">
							<button className="focus-themed w-full py-1 text-base text-content-placeholder transition-colors hover:text-white">
								Sair
							</button>
						</form>
					</div>
				</Collapsible.Content>
			</Collapsible.Root>
		</div>
	)
}
