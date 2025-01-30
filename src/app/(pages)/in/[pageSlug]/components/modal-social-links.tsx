'use client'

import {
	Facebook,
	Github,
	Instagram,
	Linkedin,
	Settings,
	Twitter,
	Youtube,
} from 'lucide-react'
import { useParams } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { toast } from 'sonner'

import { updateProfileSocialMedia } from '@/app/actions/update-profile-social-media'
import { Button } from '@/components/ui/button'
import { Dialog } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { useFormState } from '@/hooks/form-state'
import type { ProfileData } from '@/http/get-profile'

type Props = Pick<ProfileData, 'socialMedia'>

export function ModalSocialLinks({ socialMedia }: Props) {
	const formRef = useRef<HTMLFormElement>(null)

	const [open, setOpen] = useState(false)
	const { pageSlug } = useParams()

	function handleToggleModal() {
		setOpen((prev) => !prev)
	}

	const [{ success, message }, handleSubmit, isSubmitting] = useFormState(
		updateProfileSocialMedia,
		{
			onSuccess() {
				handleToggleModal()
			},
		},
	)

	useEffect(() => {
		if (!success && message) {
			toast.error(message, { id: 'save-profile-social-media' })
		}
		if (success && message) {
			toast.success(message, { id: 'save-profile-social-media' })
		}
	}, [success, message, isSubmitting])

	return (
		<>
			<Button
				variant="ghost"
				onClick={handleToggleModal}
				aria-label="Configurar redes sociais"
				icon
			>
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
					<input type="hidden" name="pageSlug" defaultValue={pageSlug} />

					<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
						<div className="relative">
							<Github className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2" />
							<Input
								placeholder="nome de usuário"
								name="github"
								defaultValue={socialMedia.github}
								className="pl-14"
							/>
						</div>

						<div className="relative">
							<Linkedin className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2" />
							<Input
								placeholder="nome de usuário"
								name="linkedin"
								defaultValue={socialMedia.linkedin}
								className="pl-14"
							/>
						</div>

						<div className="relative">
							<Twitter className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2" />
							<Input
								placeholder="nome de usuário"
								name="twitter"
								defaultValue={socialMedia.twitter}
								className="pl-14"
							/>
						</div>

						<div className="relative">
							<Instagram className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2" />
							<Input
								placeholder="nome de usuário"
								name="instagram"
								defaultValue={socialMedia.instagram}
								className="pl-14"
							/>
						</div>

						<div className="relative">
							<Youtube className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2" />
							<Input
								placeholder="nome de usuário"
								name="youtube"
								defaultValue={socialMedia.youtube}
								className="pl-14"
							/>
						</div>

						<div className="relative">
							<Facebook className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2" />
							<Input
								placeholder="nome de usuário"
								name="facebook"
								defaultValue={socialMedia.facebook}
								className="pl-14"
							/>
						</div>
					</div>
				</form>
			</Dialog>
		</>
	)
}
