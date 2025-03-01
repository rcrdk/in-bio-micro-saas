'use client'

import { useEffect, useRef } from 'react'
import { useParams } from 'next/navigation'
import { toast } from 'sonner'

import { deleteProjectAction } from '@/app/actions/delete-project'
import { Dialog } from '@/components/ui/dialog'
import type { ProjectDTO } from '@/dtos/projects'
import { useFormState } from '@/hooks/form-state'

type Props = {
	open: boolean
	onOpenChange: VoidFunction
	project: ProjectDTO
}

export function ModalProjectDelete({ open, onOpenChange, project }: Props) {
	const formRef = useRef<HTMLFormElement>(null)

	const { pageSlug: slug } = useParams()

	const [{ success, message }, handleSubmit, isSubmitting] = useFormState(deleteProjectAction, {
		onSuccess() {
			onOpenChange()
		},
		resetStateMessage: true,
	})

	useEffect(() => {
		if (!success && message) {
			toast.error(message, { id: 'remove-project' })
		}
		if (success && message) {
			toast.success(message, { id: 'remove-project' })
		}
	}, [success, message, isSubmitting])

	return (
		<Dialog
			title="Remover projeto"
			description={`Confirme a ação de remoção do projeto "${project.name}" incluindo a contagem de cliques.`}
			submmitButton={{
				label: 'Remover',
				loading: isSubmitting,
				onClick: () => formRef.current?.requestSubmit(),
			}}
			open={open}
			onOpenChange={onOpenChange}
			hideCloseButton
			dialogActions
		>
			<form onSubmit={handleSubmit} className="flex flex-col gap-8 sm:flex-row" ref={formRef}>
				<input type="hidden" name="pageSlug" defaultValue={slug} />
				<input type="hidden" name="projectId" defaultValue={project.id} />
			</form>
		</Dialog>
	)
}
