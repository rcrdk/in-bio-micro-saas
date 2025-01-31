'use client'

import { Settings } from 'lucide-react'
import { useParams } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { toast } from 'sonner'

import { updateProfileCustomLinks } from '@/app/actions/update-profile-custom-links'
import { Button } from '@/components/ui/button'
import { Dialog } from '@/components/ui/dialog'
import { FormError } from '@/components/ui/form-error'
import { FormGroup } from '@/components/ui/form-group'
import { Input } from '@/components/ui/input'
import { Text } from '@/components/ui/text'
import { useFormState } from '@/hooks/form-state'
import type { ProfileData } from '@/http/dto/get-profile'

type Props = Pick<ProfileData, 'customLinks'>

export function ModalCustomLinks({ customLinks }: Props) {
	const formRef = useRef<HTMLFormElement>(null)

	const [open, setOpen] = useState(false)
	const { pageSlug } = useParams()

	function handleToggleModal() {
		setOpen((prev) => !prev)
	}

	const [{ success, message, errors }, handleSubmit, isSubmitting] =
		useFormState(updateProfileCustomLinks, {
			onSuccess() {
				handleToggleModal()
			},
			resetStateMessage: true,
		})

	useEffect(() => {
		if (!success && message) {
			toast.error(message, { id: 'save-profile-custom-links' })
		}
		if (success && message) {
			toast.success(message, { id: 'save-profile-custom-links' })
		}
	}, [success, message, isSubmitting])

	return (
		<>
			<Button
				variant="ghost"
				onClick={handleToggleModal}
				aria-label="Adicionar link"
				className="w-full"
			>
				<Settings />
				Configurar links
			</Button>

			<Dialog
				title="Seus links personalizados"
				description="Divulgue seu site ou outros links relevates."
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
					className="flex flex-col gap-4"
					ref={formRef}
				>
					<input type="hidden" name="pageSlug" defaultValue={pageSlug} />

					<div className="flex flex-col gap-2 sm:flex-row sm:items-start">
						<Text variant="heading-xs" className="text-center sm:hidden">
							Link 1:
						</Text>

						<FormGroup>
							<Input
								placeholder="Informe um nome"
								name="title1"
								id="title1"
								defaultValue={customLinks.link1.title}
							/>
						</FormGroup>

						<FormGroup className="grow">
							<Input
								placeholder="Informe um link"
								name="url1"
								id="url1"
								defaultValue={customLinks.link1.url}
								error={errors?.url1}
							/>
							<FormError message={errors?.url1} floating />
						</FormGroup>
					</div>

					<div className="flex flex-col gap-2 sm:flex-row sm:items-start">
						<Text variant="heading-xs" className="text-center sm:hidden">
							Link 2:
						</Text>

						<FormGroup>
							<Input
								placeholder="Informe um nome"
								name="title2"
								id="title2"
								defaultValue={customLinks.link2.title}
							/>
						</FormGroup>

						<FormGroup className="grow">
							<Input
								placeholder="Informe um link"
								name="url2"
								id="url2"
								defaultValue={customLinks.link2.url}
								error={errors?.url2}
							/>
							<FormError message={errors?.url2} floating />
						</FormGroup>
					</div>

					<div className="flex flex-col gap-2 sm:flex-row sm:items-start">
						<Text variant="heading-xs" className="text-center sm:hidden">
							Link 3:
						</Text>

						<FormGroup>
							<Input
								placeholder="Informe um nome"
								name="title3"
								id="title3"
								defaultValue={customLinks.link3.title}
							/>
						</FormGroup>

						<FormGroup className="grow">
							<Input
								placeholder="Informe um link"
								name="url3"
								id="url3"
								defaultValue={customLinks.link3.url}
								error={errors?.url3}
							/>
							<FormError message={errors?.url3} floating />
						</FormGroup>
					</div>
				</form>
			</Dialog>
		</>
	)
}
