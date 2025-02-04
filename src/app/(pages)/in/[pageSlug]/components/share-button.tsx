'use client'

import { Share, Share2 } from 'lucide-react'
import { useClipboard, useDeviceOS } from 'react-haiku'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import { env } from '@/lib/env'

type Props = {
	pageSlug: string
	mode: 'sticky-bottom' | 'user-card'
}

export function ShareButton({ pageSlug, mode }: Props) {
	const shareLink = `${env.NEXT_PUBLIC_APP_URL}/in/${pageSlug}`
	const toastMessage =
		'O link da página foi copiado para área de transferiencia.'

	const clipboard = useClipboard({ timeout: 500 })
	const userDevice = useDeviceOS()

	const isIosOrAndroid = ['iOS', 'Android'].includes(userDevice)

	async function handleCopyUrl() {
		if (!isIosOrAndroid) {
			return toast.info(toastMessage, { id: 'toast-link' })
		}

		try {
			await navigator.share({ title: 'Ok!', url: shareLink })
		} catch (err) {
			clipboard.copy(shareLink)

			if (clipboard.copied) {
				toast.info(toastMessage, { id: 'toast-link' })
			}
		}
	}

	if (mode === 'sticky-bottom') {
		return (
			<button
				className="border-sticky-border bg-sticky-background/85 sm:bg-sticky-background focus-themed hover:border-button-ghost-hover xs:size-14 pointer-events-auto hidden size-12 shrink-0 cursor-pointer items-center justify-center rounded-xl border shadow-lg backdrop-blur-xs transition-all select-none active:scale-95 active:duration-75 sm:flex"
				onClick={handleCopyUrl}
				aria-label="Compartilhar o link"
			>
				{isIosOrAndroid ? <Share /> : <Share2 />}
			</button>
		)
	}

	if (mode === 'user-card') {
		return (
			<Button variant="ghost" onClick={handleCopyUrl} className="sm:hidden">
				{isIosOrAndroid ? <Share /> : <Share2 />}
				Compartilhar a página
			</Button>
		)
	}
}
