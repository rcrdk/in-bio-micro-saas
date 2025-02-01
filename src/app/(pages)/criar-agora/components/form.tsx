'use client'

import { sendGAEvent } from '@next/third-parties/google'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { toast } from 'sonner'

import { createPageAction } from '@/app/actions/create-page'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Text } from '@/components/ui/text'
import { useFormState } from '@/hooks/form-state'
import { env } from '@/lib/env'
import { generateSlug } from '@/utils/generate-slug'

export function FinishCreateSlugForm() {
	const inputRef = useRef<HTMLInputElement>(null)
	const labelRef = useRef<HTMLDivElement>(null)

	const router = useRouter()

	const searchParams = useSearchParams()

	const [labelWidth, setLabelWidth] = useState('0px')
	const [slug, setSlug] = useState('')

	function handleSlugChange(e: React.ChangeEvent<HTMLInputElement>) {
		const sanitizeValue = generateSlug(e.target.value)
		setSlug(sanitizeValue)
	}

	const [{ success, message }, handleSubmit, isSubmitting] = useFormState(
		createPageAction,
		{
			onSuccess() {
				sendGAEvent('event', 'create_project_effective')

				router.push(`/in/${slug}`)
			},
			resetStateMessage: true,
		},
	)

	useEffect(() => {
		if (!success && message) {
			toast.error(message, { id: 'create-project', position: 'bottom-center' })
		}
		if (success && message) {
			toast.success(message, {
				id: 'create-project',
				position: 'bottom-center',
			})
		}
	}, [success, message, isSubmitting])

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
						name="slug"
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
