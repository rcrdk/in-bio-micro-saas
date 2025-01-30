'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { toast } from 'sonner'

import { createLink } from '@/app/actions/create-link'
import { verifyLink } from '@/app/actions/verify-link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Text } from '@/components/ui/text'
import { env } from '@/lib/env'
import { generateSlug } from '@/utils/generate-slug'

export function FinishCreateSlugForm() {
	const inputRef = useRef<HTMLInputElement>(null)
	const labelRef = useRef<HTMLDivElement>(null)

	const router = useRouter()

	const searchParams = useSearchParams()

	const [labelWidth, setLabelWidth] = useState('0px')
	const [isSubmitting, setIsSubmitting] = useState(false)
	const [slug, setSlug] = useState('')
	const [error, setError] = useState('')

	function handleSlugChange(e: React.ChangeEvent<HTMLInputElement>) {
		const sanitizeValue = generateSlug(e.target.value)
		setSlug(sanitizeValue)
		setError('')
	}

	async function handleSubmit(e: React.FormEvent) {
		e.preventDefault()
		setIsSubmitting(true)

		if (!slug.length) {
			setIsSubmitting(false)
			return setError('Informe um link para prosseguir.')
		}

		const linkAlreadyInUse = await verifyLink(slug)

		if (linkAlreadyInUse) {
			setIsSubmitting(false)
			return setError('Esse link já está em uso. Escolha outro.')
		}

		const isLinkCreated = await createLink(slug)

		if (!isLinkCreated) {
			setIsSubmitting(false)
			return setError('Ocorreu um erro ao criar o link. Tente mais tarde.')
		}

		router.push(`/in/${slug}`)
	}

	useEffect(() => {
		setLabelWidth(`${labelRef.current?.offsetWidth ?? 0}px`)
		inputRef.current?.focus()
	}, [])

	useEffect(() => {
		const slugParam = searchParams.get('slug')

		if (slugParam) {
			setSlug(generateSlug(slugParam))
		}
	}, [searchParams])

	useEffect(() => {
		if (error) {
			toast.error(error)
			setError('')
		}
	}, [error])

	return (
		<>
			<form
				onSubmit={handleSubmit}
				className="mt-8 flex w-full flex-col gap-1 sm:flex-row sm:items-center"
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
		</>
	)
}
