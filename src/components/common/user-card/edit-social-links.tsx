'use client'

import { Github, Instagram, Linkedin, Plus, Twitter, X } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import { startTransition, useState } from 'react'

import { createSocialLinks } from '@/app/actions/create-social-links'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Modal } from '@/components/ui/modal'
import { Text } from '@/components/ui/text'
import type { ProfileData } from '@/http/get-profile'

type Props = Pick<ProfileData, 'socialMedia'>

export function EditSocialLinks({ socialMedia }: Props) {
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
			<button
				className="rounded-xl bg-background-card-button p-3 transition-colors hover:bg-background-card-button-hover"
				onClick={handleToggleModal}
			>
				<Plus />
			</button>

			<Modal open={open} onHide={handleToggleModal}>
				<div className="flex items-center justify-between">
					<Text as="h5" variant="heading-sm">
						Adicionar links
					</Text>

					<Button variant="ghost" onClick={handleToggleModal}>
						<X />
					</Button>
				</div>

				<div className="flex flex-col gap-4">
					<div className="flex items-center gap-2">
						<Github />
						<span className="text-white/30">/</span>
						<Input
							placeholder="usuario"
							value={github}
							onChange={(e) => setGithub(e.target.value)}
						/>
					</div>

					<div className="flex items-center gap-2">
						<Linkedin />
						<span className="text-white/30">/</span>
						<Input
							placeholder="usuario"
							value={linkedin}
							onChange={(e) => setLinkedin(e.target.value)}
						/>
					</div>

					<div className="flex items-center gap-2">
						<Twitter />
						<span className="text-white/30">/</span>
						<Input
							placeholder="usuario"
							value={twitter}
							onChange={(e) => setTwitter(e.target.value)}
						/>
					</div>

					<div className="flex items-center gap-2">
						<Instagram />
						<span className="text-white/30">/</span>
						<Input
							placeholder="usuario"
							value={instagram}
							onChange={(e) => setInstagram(e.target.value)}
						/>
					</div>
				</div>

				<div className="flex items-center justify-end">
					<Button variant="ghost" type="button" onClick={handleToggleModal}>
						Cancelar
					</Button>

					<Button disabled={isSubmitting} onClick={handleEditLinks}>
						Salvar links
					</Button>
				</div>
			</Modal>
		</>
	)
}
