'use client'

import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { Home, LogOut, Settings } from 'lucide-react'
import Link from 'next/link'

import { UserControlsPortalButton } from '@/app/(pages)/in/[pageSlug]/components/user-controls-portal-button'
import { authAction } from '@/app/actions/auth'

type Props = {
	isPaid: boolean
}

export function UserControls({ isPaid }: Props) {
	return (
		<DropdownMenu.Root>
			<DropdownMenu.Trigger
				className="border-sticky-border bg-sticky-background/85 sm:bg-sticky-background focus-themed hover:border-button-ghost-hover xs:size-14 pointer-events-auto flex size-12 shrink-0 cursor-pointer items-center justify-center rounded-xl border shadow-lg backdrop-blur-xs select-none"
				aria-label="Configurações do usuário"
			>
				<Settings />
			</DropdownMenu.Trigger>

			<DropdownMenu.Content
				align="end"
				side="top"
				sideOffset={8}
				className="bg-sticky-background border-sticky-border pointer-events-auto flex flex-col gap-1 rounded-xl border p-2 shadow-lg"
			>
				<DropdownMenu.Item asChild>
					<Link
						href="/"
						className="focus-themed hover:bg-button-ghost flex w-full cursor-pointer items-center justify-start gap-3 py-2 pr-6 pl-4 text-left font-medium transition-colors"
					>
						<Home size={20} />
						Início
					</Link>
				</DropdownMenu.Item>

				{isPaid && <UserControlsPortalButton />}

				<form action={authAction}>
					<button className="focus-themed hover:bg-button-ghost flex w-full cursor-pointer items-center justify-start gap-3 py-2 pr-6 pl-4 text-left font-medium transition-colors">
						<LogOut size={20} />
						Sair
					</button>
				</form>
			</DropdownMenu.Content>
		</DropdownMenu.Root>
	)
}
