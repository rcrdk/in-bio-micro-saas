'use client'

import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { Edit, ImageIcon, Settings, Trash } from 'lucide-react'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import { useCallback, useState } from 'react'

import { ModalProjectDelete } from '@/app/(pages)/in/[pageSlug]/components/modal-project-delete'
import { ModalProjectForm } from '@/app/(pages)/in/[pageSlug]/components/modal-project-form'
import { Button } from '@/components/ui/button'
import { increaseProjectClicks } from '@/http/increase-project-clicks'
import type { ProjectData } from '@/http/types/get-projects'
import { httpUrlParser } from '@/utils/http-url-parser'

type Props = {
	data: ProjectData
	image?: string
	isOwner: boolean
}

export function ProjectCard({ data, image, isOwner }: Props) {
	const { pageSlug: slug } = useParams()

	const [openEdit, setOpenEdit] = useState(false)
	const [openRemove, setOpenRemove] = useState(false)

	const handleToggleEditModal = useCallback(() => {
		setOpenEdit((prev) => !prev)
	}, [])

	const handleToggleRemoveModal = useCallback(() => {
		setOpenRemove((prev) => !prev)
	}, [])

	async function handleClickProject() {
		if (!slug || !data.id || isOwner) return
		await increaseProjectClicks(String(slug), data.id)
	}

	return (
		<div className="relative flex">
			<a
				href={httpUrlParser(data.url)}
				onClick={handleClickProject}
				target="_blank"
				className="focus-themed bg-card-background hover:border-card-border flex w-full cursor-pointer gap-5 rounded-2xl border border-transparent py-3 pr-4 pl-3 transition-colors select-none"
			>
				<div className="bg-image-background flex size-24 shrink-0 overflow-hidden rounded-md">
					{image ? (
						<Image
							src={image}
							width={460}
							height={460}
							alt=""
							className="size-full object-cover"
						/>
					) : (
						<ImageIcon className="m-auto size-6 opacity-25" />
					)}
				</div>

				<div className="flex flex-col gap-2">
					{isOwner && (
						<span className="text-accent-green text-xs font-bold uppercase">
							{data.totalClicks === 1
								? '1 clique'
								: `${data.totalClicks ?? 0} cliques`}
						</span>
					)}

					<div className="flex flex-col gap-2">
						<span className="block leading-5 font-bold text-pretty text-white">
							{data.name}
						</span>
						<span className="text-content-body block text-sm text-pretty">
							{data.description}
						</span>
					</div>
				</div>
			</a>

			{isOwner && (
				<>
					<DropdownMenu.Root>
						<DropdownMenu.Trigger asChild>
							<Button
								icon="rounded"
								variant="secondary"
								aria-label="Opções"
								className="absolute top-0 right-0 size-8 -translate-y-1/4 translate-x-1/4 text-white/75"
							>
								<Settings size={20} />
							</Button>
						</DropdownMenu.Trigger>

						<DropdownMenu.Content
							align="end"
							className="bg-sticky-background border-sticky-border pointer-events-auto flex flex-col gap-1 rounded-xl border p-2 shadow-lg select-none"
							sideOffset={8}
						>
							<DropdownMenu.Item
								className="focus-themed hover:bg-button-ghost flex w-full cursor-pointer items-center justify-start gap-3 py-2 pr-6 pl-4 text-left font-medium transition-all active:scale-95 active:duration-75"
								onClick={handleToggleEditModal}
							>
								<Edit size={20} />
								Editar
							</DropdownMenu.Item>

							<DropdownMenu.Item
								className="focus-themed hover:bg-accent-pink/15 hover:text-accent-pink flex w-full cursor-pointer items-center justify-start gap-3 py-2 pr-6 pl-4 text-left font-medium transition-all active:scale-95 active:duration-75"
								onClick={handleToggleRemoveModal}
							>
								<Trash size={20} />
								Remover
							</DropdownMenu.Item>
						</DropdownMenu.Content>
					</DropdownMenu.Root>

					<ModalProjectForm
						open={openEdit}
						onOpenChange={handleToggleEditModal}
						mode="edit"
						initialData={data}
						initialImage={image}
					/>

					<ModalProjectDelete
						open={openRemove}
						onOpenChange={handleToggleRemoveModal}
						project={data}
					/>
				</>
			)}
		</div>
	)
}
