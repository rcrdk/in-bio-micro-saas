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
			<form onSubmit={handleSubmit} className="flex items-center gap-2">
				<Text variant="body-lg" as="span" className="leading-none text-white">
					projectinbio.com/
				</Text>

				<Input
					placeholder="Seu link"
					value={link}
					onChange={handleLinkChange}
				/>

				<Button className="w-40">Criar</Button>
			</form>

			<div>
				<Text className="text-red-500">{error}</Text>
			</div>
		</>
	)
}
