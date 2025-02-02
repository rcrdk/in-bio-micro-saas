'use client'

import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { BadgeDollarSign } from 'lucide-react'

import { useStripe } from '@/hooks/stripe'

export function UserControlsPortalButton() {
	const { createStripePortal } = useStripe()

	return (
		<DropdownMenu.Item asChild>
			<button
				className="focus-themed hover:bg-button-ghost flex w-full cursor-pointer items-center justify-start gap-3 py-2 pr-6 pl-4 text-left font-medium transition-colors"
				onClick={createStripePortal}
			>
				<BadgeDollarSign size={20} />
				Pagamentos
			</button>
		</DropdownMenu.Item>
	)
}
