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
import type { ProfileData } from '@/http/get-profile'

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

					<div className="flex items-center gap-2">
						<FormGroup>
							<Text as="label" variant="label">
								Título do link:
							</Text>
							<Input
								placeholder="Informe um nome"
								name="title1"
								defaultValue={customLinks.link1.title}
							/>
						</FormGroup>

						<FormGroup className="grow">
							<Text as="label" variant="label">
								URL:
							</Text>
							<Input
								placeholder="Informe um link"
								type="url"
								name="url1"
								defaultValue={customLinks.link1.url}
							/>
							<FormError message={errors?.url1} />
						</FormGroup>
					</div>

					<div className="flex items-center gap-2">
						<FormGroup>
							<Text as="label" variant="label" hidden>
								Título do link:
							</Text>
							<Input
								placeholder="Informe um nome"
								name="title2"
								defaultValue={customLinks.link2.title}
							/>
						</FormGroup>

						<FormGroup className="grow">
							<Text as="label" variant="label" hidden>
								URL:
							</Text>
							<Input
								placeholder="Informe um link"
								type="url"
								name="url2"
								defaultValue={customLinks.link2.url}
							/>
							<FormError message={errors?.url2} />
						</FormGroup>
					</div>

					<div className="flex items-center gap-2">
						<FormGroup>
							<Text as="label" variant="label" hidden>
								Título do link:
							</Text>
							<Input
								placeholder="Informe um nome"
								name="title3"
								defaultValue={customLinks.link3.title}
							/>
						</FormGroup>

						<FormGroup className="grow">
							<Text as="label" variant="label" hidden>
								URL:
							</Text>
							<Input
								placeholder="Informe um link"
								type="url"
								name="url3"
								defaultValue={customLinks.link3.url}
							/>
							<FormError message={errors?.url3} />
						</FormGroup>
					</div>
				</form>
			</Dialog>
		</>
	)
}
