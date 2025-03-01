'use client'

import { useEffect, useRef } from 'react'
import { useParams } from 'next/navigation'
import { useWindowSize } from 'react-haiku'
import { toast } from 'sonner'

import { createProjectAction } from '@/app/actions/create-project'
import { updateProjectAction } from '@/app/actions/update-project'
import { Dialog } from '@/components/ui/dialog'
import { FormError } from '@/components/ui/form-error'
import { FormGroup } from '@/components/ui/form-group'
import { FormImage } from '@/components/ui/form-image'
import { Label } from '@/components/ui/form-label'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import type { ProjectDTO } from '@/dtos/projects'
import { useFormState } from '@/hooks/form-state'

type Props = {
	open: boolean
	onOpenChange: VoidFunction
	mode: 'create' | 'edit'
	initialData?: ProjectDTO
	initialImage?: string
}

export function ModalProjectForm({ open, onOpenChange, mode, initialData, initialImage }: Props) {
	const formRef = useRef<HTMLFormElement>(null)

	const { pageSlug: slug } = useParams()
	const { width } = useWindowSize()

	const formActionByMode = mode === 'create' ? createProjectAction : updateProjectAction

	const [{ success, message, errors }, handleSubmit, isSubmitting] = useFormState(formActionByMode, {
		onSuccess() {
			onOpenChange()
		},
		resetStateMessage: true,
	})

	useEffect(() => {
		if (!success && message) {
			toast.error(message, { id: 'create-edit-project' })
		}
		if (success && message) {
			toast.success(message, { id: 'create-edit-project' })
		}
	}, [success, message, isSubmitting])

	return (
		<>
			<Dialog
				title={mode === 'create' ? 'Novo projeto' : 'Editar projeto'}
				description="Mostre um trabalho importante."
				submmitButton={{
					label: mode === 'create' ? 'Adicionar projeto' : 'Salvar projeto',
					loading: isSubmitting,
					onClick: () => formRef.current?.requestSubmit(),
				}}
				open={open}
				onOpenChange={onOpenChange}
			>
				<form onSubmit={handleSubmit} className="flex flex-col gap-8 sm:flex-row" ref={formRef}>
					<input type="hidden" name="pageSlug" defaultValue={slug} />

					{mode === 'edit' && initialData && <input type="hidden" name="projectId" defaultValue={initialData.id} />}

					<FormImage mode="project" currentImage={initialImage} />

					<div className="flex grow flex-col gap-2 sm:gap-4">
						<FormGroup>
							<Label htmlFor="name">Nome do projeto:</Label>
							<Input
								placeholder="Digite o nome do projeto"
								id="name"
								name="name"
								error={errors?.name}
								defaultValue={initialData?.name}
							/>
							<FormError message={errors?.name} />
						</FormGroup>

						<FormGroup>
							<Label htmlFor="url">Link do projeto:</Label>
							<Input
								placeholder="Digite o link do projeto"
								inputMode="url"
								id="url"
								name="url"
								defaultValue={initialData?.url}
								error={errors?.url}
							/>
							<FormError message={errors?.url} />
						</FormGroup>

						<FormGroup>
							<Label htmlFor="description">Descrição do projeto:</Label>
							<Textarea
								placeholder="Dê uma breve descrição do seu projeto"
								id="description"
								name="description"
								rows={width < 640 ? 6 : 3}
								defaultValue={initialData?.description}
								error={errors?.description}
							/>
							<FormError message={errors?.description} />
						</FormGroup>
					</div>
				</form>
			</Dialog>
		</>
	)
}
