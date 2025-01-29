'use client'

import {
	Github,
	Instagram,
	Linkedin,
	Loader,
	Settings,
	Twitter,
	X,
} from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import { startTransition, useState } from 'react'

import { createSocialLinks } from '@/app/actions/create-social-links'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Modal } from '@/components/ui/modal'
import { Text } from '@/components/ui/text'
import type { ProfileData } from '@/http/get-profile'

type Props = Pick<ProfileData, 'socialMedia'>

export function ModalSocialLinks({ socialMedia }: Props) {
	const [open, setOpen] = useState(false)
	const [isSubmitting, setIsSubmitting] = useState(false)

	const router = useRouter()
	const { pageSlug } = useParams()

	const [github, setGithub] = useState(socialMedia?.github ?? '')
	const [linkedin, setLinkedin] = useState(socialMedia?.linkedin ?? '')
	const [twitter, setTwitter] = useState(socialMedia?.twitter ?? '')
	const [instagram, setInstagram] = useState(socialMedia?.instagram ?? '')

	function handleToggleModal() {
		setOpen((prev) => !prev)
	}

	async function handleEditLinks() {
		setIsSubmitting(true)

		if (!pageSlug) return

		await createSocialLinks({
			pageSlug: String(pageSlug),
			github,
			linkedin,
			twitter,
			instagram,
		})

		startTransition(() => {
			setIsSubmitting(false)
			handleToggleModal()

			router.refresh()
		})
	}

	return (
		<>
			<Button
				variant="ghost"
				onClick={handleEditLinks}
				aria-label="Adicionar link"
				icon
			>
				<Settings />
			</Button>

			<Modal open={open} onHide={handleToggleModal}>
				<div className="flex items-center justify-between gap-4">
					<Text as="h5" variant="heading-sm">
						Adicionar links
					</Text>

					<Button
						size="sm"
						variant="ghost"
						onClick={handleToggleModal}
						aria-label="Fechar"
						icon
					>
						<X />
					</Button>
				</div>

				<div className="flex flex-col gap-4">
					<div className="relative">
						<Github className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2" />
						<Input
							placeholder="nome de usuário"
							value={github}
							onChange={(e) => setGithub(e.target.value)}
							className="pl-14"
						/>
					</div>

					<div className="relative">
						<Linkedin className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2" />
						<Input
							placeholder="nome de usuário"
							value={linkedin}
							onChange={(e) => setLinkedin(e.target.value)}
							className="pl-14"
						/>
					</div>

					<div className="relative">
						<Twitter className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2" />
						<Input
							placeholder="nome de usuário"
							value={twitter}
							onChange={(e) => setTwitter(e.target.value)}
							className="pl-14"
						/>
					</div>

					<div className="relative">
						<Instagram className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2" />
						<Input
							placeholder="nome de usuário"
							value={instagram}
							onChange={(e) => setInstagram(e.target.value)}
							className="pl-14"
						/>
					</div>
				</div>

				<div className="flex items-center justify-end gap-4">
					<Button variant="ghost" type="button" onClick={handleToggleModal}>
						Cancelar
					</Button>

					<Button
						disabled={isSubmitting}
						onClick={handleEditLinks}
						className="min-w-40"
					>
						{isSubmitting ? (
							<Loader size={20} className="animate-spin" />
						) : (
							'Salvar links'
						)}
					</Button>
				</div>
			</Modal>
		</>
	)
}
