import { useRef } from 'react'

import { useClickOutside } from '@/hooks/click-outside'

type Props = {
	children: React.ReactNode
	open: boolean
	onHide: VoidFunction
}

export function Modal({ children, open, onHide }: Props) {
	const ref = useRef<HTMLDivElement>(null)

	useClickOutside(ref, onHide)

	if (!open) {
		return null
	}

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-background-modal/50 backdrop-blur-md">
			<div
				ref={ref}
				className="flex w-full max-w-screen-sm flex-col justify-between gap-8 rounded-3xl bg-background-primary p-8"
			>
				{children}
			</div>
		</div>
	)
}
