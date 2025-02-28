'use client'

import { useEffect, useRef, useState } from 'react'
import { useParams } from 'next/navigation'
import { Facebook, Github, Instagram, Linkedin, Settings, Twitter, Youtube } from 'lucide-react'
import { toast } from 'sonner'

import { updatePageSocialMediaAction } from '@/app/actions/update-page-social-media'
import { Button } from '@/components/ui/button'
import { Dialog } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import type { PageDTO } from '@/dtos/page'
import { useFormState } from '@/hooks/form-state'

type Props = Pick<PageDTO, 'socialMedia'>

export function ModalPageSocialLinksForm({ socialMedia }: Props) {
	const formRef = useRef<HTMLFormElement>(null)

	const [open, setOpen] = useState(false)
	const { pageSlug: slug } = useParams()

	function handleToggleModal() {
		setOpen((prev) => !prev)
	}

	const [{ success, message }, handleSubmit, isSubmitting] = useFormState(updatePageSocialMediaAction, {
		onSuccess() {
			handleToggleModal()
		},
		resetStateMessage: true,
	})

	useEffect(() => {
		if (!success && message) {
			toast.error(message, { id: 'save-page-social-media' })
		}
		if (success && message) {
			toast.success(message, { id: 'save-page-social-media' })
		}
	}, [success, message, isSubmitting])

	return (
		<>
			<Button variant="ghost" onClick={handleToggleModal} aria-label="Configurar redes sociais" icon>
				<Settings />
			</Button>

			<Dialog
				title="Suas redes sociais"
				description="Apresente sua redes sociais para as pessoas te acompanharem."
				submmitButton={{
					label: 'Salvar informações',
					loading: isSubmitting,
					onClick: () => formRef.current?.requestSubmit(),
				}}
				open={open}
				onOpenChange={handleToggleModal}
			>
				<form onSubmit={handleSubmit} ref={formRef}>
					<input type="hidden" name="pageSlug" defaultValue={slug} />

					<div className="grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-4">
						<div className="relative">
							<Github className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2" />
							<Input
								placeholder="nome de usuário"
								name="github"
								defaultValue={socialMedia.github}
								className="pl-14"
								inputMode="url"
							/>
						</div>

						<div className="relative">
							<Linkedin className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2" />
							<Input
								placeholder="nome de usuário"
								name="linkedin"
								defaultValue={socialMedia.linkedin}
								className="pl-14"
								inputMode="url"
							/>
						</div>

						<div className="relative">
							<Twitter className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2" />
							<Input
								placeholder="nome de usuário"
								name="twitter"
								defaultValue={socialMedia.twitter}
								className="pl-14"
								inputMode="url"
							/>
						</div>

						<div className="relative">
							<Instagram className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2" />
							<Input
								placeholder="nome de usuário"
								name="instagram"
								defaultValue={socialMedia.instagram}
								className="pl-14"
								inputMode="url"
							/>
						</div>

						<div className="relative">
							<Youtube className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2" />
							<Input
								placeholder="nome de usuário"
								name="youtube"
								defaultValue={socialMedia.youtube}
								className="pl-14"
								inputMode="url"
							/>
						</div>

						<div className="relative">
							<Facebook className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2" />
							<Input
								placeholder="nome de usuário"
								name="facebook"
								defaultValue={socialMedia.facebook}
								className="pl-14"
								inputMode="url"
							/>
						</div>
					</div>
				</form>
			</Dialog>
		</>
	)
}
