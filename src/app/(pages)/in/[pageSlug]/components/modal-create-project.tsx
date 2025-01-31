'use client'

import { Plus } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { toast } from 'sonner'

import { createProjectAction } from '@/app/actions/create-project'
import { Dialog } from '@/components/ui/dialog'
import { FormError } from '@/components/ui/form-error'
import { FormGroup } from '@/components/ui/form-group'
import { FormImage } from '@/components/ui/form-image'
import { Label } from '@/components/ui/form-label'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useFormState } from '@/hooks/form-state'

type Props = {
	pageSlug: string
}

export function ModalCreateProject({ pageSlug }: Props) {
	const formRef = useRef<HTMLFormElement>(null)

	const [open, setOpen] = useState(false)

	function handleToggleModal() {
		setOpen((prev) => !prev)
	}

	const [{ success, message, errors }, handleSubmit, isSubmitting] =
		useFormState(createProjectAction, {
			onSuccess() {
				handleToggleModal()
			},
			resetStateMessage: true,
		})

	useEffect(() => {
		if (!success && message) {
			toast.error(message, { id: 'create-project' })
		}
		if (success && message) {
			toast.success(message, { id: 'create-project' })
		}
	}, [success, message, isSubmitting])

	return (
		<>
			<button
				className="focus-themed border-button-ghost bg-card-background hover:border-card-border flex min-h-[130px] grow cursor-pointer items-center justify-center gap-5 rounded-2xl border border-dashed p-3 transition-colors"
				onClick={handleToggleModal}
			>
				<Plus className="text-accent-green size-7" />
				<span className="font-medium">Novo projeto</span>
			</button>

			<Dialog
				title="Novo projeto"
				description="Mostre um trabalho importante."
				submmitButton={{
					label: 'Adicionar projeto',
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

					<FormImage mode="project" />

					<div className="flex grow flex-col gap-4">
						<FormGroup>
							<Label htmlFor="name">Nome do projeto:</Label>
							<Input
								placeholder="Digite o nome do projeto"
								id="name"
								name="name"
							/>
							<FormError message={errors?.name} />
						</FormGroup>

						<FormGroup>
							<Label htmlFor="url">Link do projeto:</Label>
							<Input
								placeholder="Digite o link do projeto"
								id="url"
								name="url"
							/>
							<FormError message={errors?.url} />
						</FormGroup>

						<FormGroup>
							<Label htmlFor="description">Descrição do projeto:</Label>
							<Textarea
								placeholder="Dê uma breve descrição do seu projeto"
								id="description"
								name="description"
								rows={3}
							/>
							<FormError message={errors?.description} />
						</FormGroup>
					</div>
				</form>
			</Dialog>
		</>
	)
}
