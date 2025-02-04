'use client'

import * as RadixDialog from '@radix-ui/react-dialog'
import { X } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Text } from '@/components/ui/text'
import { cn } from '@/utils/tailwind-cn'

type Props = {
	open: boolean
	onOpenChange: VoidFunction
	title: string
	description: string
	submmitButton?: {
		label: string
		loading: boolean
		onClick: VoidFunction
	}
	children: React.ReactNode
	hideCloseButton?: boolean
	dialogActions?: boolean
}

export function Dialog({
	open,
	onOpenChange,
	title,
	description,
	submmitButton,
	children,
	hideCloseButton = false,
	dialogActions = false,
}: Props) {
	return (
		<RadixDialog.Root open={open} onOpenChange={onOpenChange}>
			<RadixDialog.Portal>
				<RadixDialog.Overlay className="data-[state=open]:animate-dialog-overlay-show data-[state=closed]:animate-dialog-overlay-hide bg-background-modal/50 fixed inset-0 z-[98] backdrop-blur-sm" />

				<RadixDialog.Overlay className="fixed inset-0 z-[99] overflow-y-auto">
					<RadixDialog.Content
						className="data-[state=open]:animate-dialog-content-show data-[state=closed]:animate-dialog-content-hide sm-p-6 !pointer-events-none flex min-h-svh items-end justify-center p-4 sm:items-center md:p-10"
						onOpenAutoFocus={(e) => e.preventDefault()}
					>
						<div
							className={cn(
								'bg-background-primary border-border-primary pointer-events-auto flex w-full flex-col rounded-3xl border p-6 sm:gap-8 sm:p-8',
								dialogActions
									? 'max-w-(--breakpoint-xs) gap-3 sm:gap-4'
									: 'max-w-(--breakpoint-xs) gap-6 sm:max-w-(--breakpoint-sm) sm:gap-8',
							)}
						>
							<div className="flex justify-between gap-6 sm:items-start">
								<div className="flex grow flex-col gap-1 text-center sm:text-left">
									<RadixDialog.Title asChild>
										<Text variant="heading-sm">{title}</Text>
									</RadixDialog.Title>

									<RadixDialog.Description asChild>
										<Text className="text-sm opacity-60">{description}</Text>
									</RadixDialog.Description>
								</div>

								{!hideCloseButton && (
									<RadixDialog.Close asChild>
										<Button
											size="sm"
											variant="ghost"
											aria-label="Fechar"
											className="hidden sm:flex"
											icon
										>
											<X />
										</Button>
									</RadixDialog.Close>
								)}
							</div>

							<div>{children}</div>

							<div className="flex flex-col-reverse justify-end gap-2 sm:flex-row sm:gap-4">
								<RadixDialog.Close type="button" asChild>
									<Button variant="ghost">
										{submmitButton ? 'Cancelar' : 'Voltar'}
									</Button>
								</RadixDialog.Close>

								{submmitButton && (
									<Button
										variant="primary"
										className={dialogActions ? 'min-w-36' : 'min-w-56'}
										onClick={submmitButton.onClick}
										loading={submmitButton.loading}
										disabled={submmitButton.loading}
									>
										{submmitButton.label}
									</Button>
								)}
							</div>
						</div>
					</RadixDialog.Content>
				</RadixDialog.Overlay>
			</RadixDialog.Portal>
		</RadixDialog.Root>
	)
}
