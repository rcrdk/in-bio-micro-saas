'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

import { createLink } from '@/app/actions/create-link'
import { verifyLink } from '@/app/actions/verify-link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Text } from '@/components/ui/text'
import { generateSlug } from '@/utils/generate-slug'

export function CreateLinkForm() {
	const router = useRouter()

	const [link, setLink] = useState('')
	const [error, setError] = useState('')

	function handleLinkChange(e: React.ChangeEvent<HTMLInputElement>) {
		const sanitizeValue = generateSlug(e.target.value)
		setLink(sanitizeValue)
		setError('')
	}

	async function handleSubmit(e: React.FormEvent) {
		e.preventDefault()

		if (!link.length) {
			return setError('Informe um link para prosseguir.')
		}

		if (link === 'create') {
			return setError('Esse link já está em uso')
		}

		// check if the user already have an page or allow multiple pages in the future.

		const linkAlreadyInUse = await verifyLink(link)

		if (linkAlreadyInUse) {
			return setError('Esse link já está em uso')
		}

		const isLinkCreated = await createLink(link)

		if (!isLinkCreated) {
			return setError('Ocorreu um erro ao criar o link')
		}

		router.push(`/${link}`)
	}

	return (
		<>
			<form
				onSubmit={handleSubmit}
				className="flex w-full flex-col gap-1 sm:flex-row sm:items-center"
			>
				<div className="relative flex-grow">
					<Text
						variant="body-md"
						as="span"
						className="pointer-events-none absolute top-0 flex h-full items-center whitespace-nowrap text-nowrap pb-1 pl-4"
					>
						projectinbio.com/
					</Text>

					<Input
						placeholder="seu-link"
						value={link}
						onChange={handleLinkChange}
						className="w-full pl-[142px]"
					/>
				</div>

				<Button className="ml-1 w-full sm:w-auto">Criar agora</Button>
			</form>

			{/* create better error handling */}
			<div>
				<Text className="text-red-500">{error}</Text>
			</div>
		</>
	)
}
