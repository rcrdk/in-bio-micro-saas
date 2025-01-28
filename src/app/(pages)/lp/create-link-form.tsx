'use client'

import { signIn } from 'next-auth/react'
import { useEffect, useRef, useState } from 'react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Text } from '@/components/ui/text'
import { generateSlug } from '@/utils/generate-slug'

export function CreateLinkForm() {
	const inputRef = useRef<HTMLInputElement>(null)

	const [slug, setSlug] = useState('')

	function handleSlugChange(e: React.ChangeEvent<HTMLInputElement>) {
		const sanitizeValue = generateSlug(e.target.value)
		setSlug(sanitizeValue)
	}

	async function handleSubmit(e: React.FormEvent) {
		e.preventDefault()

		await signIn('google', { redirectTo: `/create?slug=${slug}` })
	}

	useEffect(() => {
		inputRef.current?.focus()
	}, [])

	return (
		<form
			onSubmit={handleSubmit}
			className="flex w-full flex-col gap-1 sm:flex-row sm:items-center"
		>
			<div className="relative flex-grow">
				<Text
					variant="body-md"
					as="span"
					className="pointer-events-none absolute top-0 flex h-full items-center whitespace-nowrap text-nowrap pl-4"
				>
					projectinbio.com/
				</Text>

				<Input
					placeholder="seu-link"
					value={slug}
					onChange={handleSlugChange}
					className="w-full pl-[142px]"
					ref={inputRef}
					focusAccent
					autoCorrect="off"
				/>
			</div>

			<Button className="ml-1 w-full sm:w-auto">Criar agora</Button>
		</form>
	)
}
