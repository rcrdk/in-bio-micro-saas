'use client'

import { UserPen } from 'lucide-react'
import { useParams } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { toast } from 'sonner'

import { updateProfileInformationAction } from '@/app/actions/update-profile-information'
import { Button } from '@/components/ui/button'
import { Dialog } from '@/components/ui/dialog'
import { FormError } from '@/components/ui/form-error'
import { FormGroup } from '@/components/ui/form-group'
import { FormImage } from '@/components/ui/form-image'
import { Label } from '@/components/ui/form-label'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useFormState } from '@/hooks/form-state'
import type { ProfileData } from '@/http/dto/get-profile'

type Props = {
	initialData: Pick<ProfileData, 'name' | 'description' | 'imagePath'>
	profileAvatar?: string
}

export function ModalProfileInformation({ initialData, profileAvatar }: Props) {
	const formRef = useRef<HTMLFormElement>(null)

	const [open, setOpen] = useState(false)

	const { pageSlug } = useParams()

	function handleToggleModal() {
		setOpen((prev) => !prev)
	}

	const [{ success, message, errors }, handleSubmit, isSubmitting] =
		useFormState(updateProfileInformationAction, {
			onSuccess() {
				handleToggleModal()
			},
			resetStateMessage: true,
		})

	useEffect(() => {
		if (!success && message) {
			toast.error(message, { id: 'save-profile-information' })
		}
		if (success && message) {
			toast.success(message, { id: 'save-profile-information' })
		}
	}, [success, message, isSubmitting])

	return (
		<>
			<div className="absolute top-0 right-0 rounded-full">
				<Button variant="secondary" onClick={handleToggleModal} icon="rounded">
					<UserPen />
				</Button>
			</div>

			<Dialog
				title="Seu perfil"
				description="Faça uma primeira impressão sua."
				submmitButton={{
					label: 'Salvar informações',
					loading: isSubmitting,
					onClick: () => formRef.current?.requestSubmit(),
				}}
				open={open}
				onOpenChange={handleToggleModal}
			>
				<form
					onSubmit={handleSubmit}
					className="flex flex-col gap-8 sm:flex-row"
					ref={formRef}
				>
					<input type="hidden" name="pageSlug" defaultValue={pageSlug} />

					<FormImage mode="user" currentImage={profileAvatar} />

					<div className="flex grow flex-col gap-4">
						<FormGroup>
							<Label htmlFor="name">Seu nome</Label>
							<Input
								placeholder="Informe seu nome"
								id="name"
								name="name"
								defaultValue={initialData.name}
							/>
							<FormError message={errors?.name} />
						</FormGroup>

						<FormGroup>
							<Label htmlFor="description">Sua introdução</Label>
							<Textarea
								placeholder="Fale um pouco sobre você"
								name="description"
								id="description"
								defaultValue={initialData.description}
								rows={2}
							/>
							<FormError message={errors?.description} />
						</FormGroup>
					</div>
				</form>
			</Dialog>
		</>
	)
}
