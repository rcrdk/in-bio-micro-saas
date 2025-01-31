'use client'

import { Plus } from 'lucide-react'
import { useState } from 'react'

import { ModalFormProject } from '@/app/(pages)/in/[pageSlug]/components/modal-form-project'

export function CreateProjectButton() {
	const [open, setOpen] = useState(false)

	function handleToggleModal() {
		setOpen((prev) => !prev)
	}

	return (
		<>
			<button
				className="focus-themed border-button-ghost bg-card-background hover:border-card-border flex min-h-[130px] grow cursor-pointer items-center justify-center gap-5 rounded-2xl border border-dashed p-3 transition-colors select-none"
				onClick={handleToggleModal}
			>
				<Plus className="text-accent-green size-7" />
				<span className="font-medium">Novo projeto</span>
			</button>

			<ModalFormProject
				open={open}
				onOpenChange={handleToggleModal}
				mode="create"
			/>
		</>
	)
}
