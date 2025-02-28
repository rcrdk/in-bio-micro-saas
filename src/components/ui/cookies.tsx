'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import * as RadixDialog from '@radix-ui/react-dialog'
import { ThumbsUp } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Container } from '@/components/ui/container'

export default function Cookies() {
	const localStorageEntry = '@INBIO:display-cookies-popup-1.0.0'

	const [showMessage, setShowMessage] = useState(false)

	function handleDismiss() {
		setShowMessage(false)
		localStorage.setItem(localStorageEntry, 'dismissed')
	}

	useEffect(() => {
		const hasDismissed = localStorage.getItem(localStorageEntry)

		const timer = setTimeout(() => {
			if (!hasDismissed) setShowMessage(true)
		}, 2000)

		return () => {
			clearTimeout(timer)
		}
	}, [])

	return (
		<RadixDialog.Root open={showMessage} onOpenChange={handleDismiss}>
			<RadixDialog.Portal>
				<RadixDialog.Overlay className="data-[state=open]:animate-dialog-overlay-show data-[state=closed]:animate-dialog-overlay-hide fixed inset-0 z-[98] bg-gradient-to-b from-black/75 to-black opacity-75" />

				<RadixDialog.Content className="data-[state=open]:animate-dialog-cookies-show data-[state=closed]:animate-dialog-cookies-hide fixed right-0 bottom-8 left-0 z-[99]">
					<RadixDialog.Title className="sr-only">Aviso de cookies</RadixDialog.Title>

					<Container>
						<div className="border-border-secondary xs:px-8 xs:py-5 mx-auto flex max-w-[1100px] flex-col items-center gap-6 rounded-xl border bg-black px-6 py-4 sm:flex-row sm:gap-8">
							<p className="xs:text-base grow text-center text-sm text-pretty sm:text-left">
								Este site usa cookies para lhe oferecer uma melhor experiência de navegação. Ao continuar navegando,
								você concorda com o uso de cookies de acordo com nossa{' '}
								<Link href="/politica-de-privacidade" className="underline">
									política de privacidade
								</Link>{' '}
								e nossos{' '}
								<Link href="/termos-de-uso" className="underline">
									termos de uso
								</Link>
								.
							</p>

							<Button
								variant="primary"
								disabled={!showMessage}
								type="button"
								onClick={handleDismiss}
								className="w-full sm:w-auto"
							>
								<ThumbsUp />
								<span>Estou de acordo</span>
							</Button>
						</div>
					</Container>
				</RadixDialog.Content>
			</RadixDialog.Portal>
		</RadixDialog.Root>
	)
}
