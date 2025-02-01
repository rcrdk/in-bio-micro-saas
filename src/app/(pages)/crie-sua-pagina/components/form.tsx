'use client'

import { sendGTMEvent } from '@next/third-parties/google'
import { signIn } from 'next-auth/react'
import { useEffect, useRef, useState } from 'react'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Text } from '@/components/ui/text'
import { env } from '@/lib/env'
import { generateSlug } from '@/utils/generate-slug'

export function CreateSlugForm() {
	const inputRef = useRef<HTMLInputElement>(null)
	const labelRef = useRef<HTMLDivElement>(null)

	const [labelWidth, setLabelWidth] = useState('0px')
	const [isSubmitting, setIsSubmitting] = useState(false)
	const [slug, setSlug] = useState('')

	function handleSlugChange(e: React.ChangeEvent<HTMLInputElement>) {
		const sanitizeValue = generateSlug(e.target.value)
		setSlug(sanitizeValue)
	}

	async function handleSubmit(e: React.FormEvent) {
		e.preventDefault()

		sendGTMEvent({ event: 'create_page_intention' })

		try {
			setIsSubmitting(true)

			return await signIn('google', { redirectTo: `/criar-agora?slug=${slug}` })
		} catch (error) {
			toast.error(
				'Ocorreu um erro ao tentar prosseguir com a ação. Tenta mais tarde.',
			)
			setIsSubmitting(false)
		}
	}

	useEffect(() => {
		setLabelWidth(`${labelRef.current?.offsetWidth ?? 0}px`)
		inputRef.current?.focus()
	}, [])

	return (
		<form
			onSubmit={handleSubmit}
			className="flex w-full flex-col gap-1 sm:flex-row sm:items-center"
		>
			<div className="relative grow">
				<div
					ref={labelRef}
					className="pointer-events-none absolute top-0 flex h-full items-center pl-4 select-none"
				>
					<Text
						variant="body-md"
						as="span"
						className="text-nowrap whitespace-nowrap"
					>
						{env.NEXT_PUBLIC_APP_URL}/in/
					</Text>
				</div>

				<Input
					placeholder="seu-link"
					value={slug}
					onChange={handleSlugChange}
					className="w-full"
					ref={inputRef}
					focusAccent
					autoCorrect="off"
					style={{ paddingLeft: labelWidth }}
					disabled={isSubmitting}
				/>
			</div>

			<Button
				className="ml-1 w-full min-w-36 sm:w-auto"
				disabled={isSubmitting}
				loading={isSubmitting}
			>
				Criar agora
			</Button>
		</form>
	)
}
