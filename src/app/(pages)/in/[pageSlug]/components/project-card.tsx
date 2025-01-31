'use client'

import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { Edit, ImageIcon, Settings, Trash } from 'lucide-react'
import type { StaticImageData } from 'next/image'
import Image from 'next/image'
import { useParams } from 'next/navigation'

import { Button } from '@/components/ui/button'
import type { ProjectData } from '@/http/dto/get-projects'
import { increaseProjectClicks } from '@/http/increase-project-clicks'
import { httpUrlParser } from '@/utils/http-url-parser'

type Props = {
	data: ProjectData
	image?: string | null | StaticImageData
	isOwner: boolean
}

export function ProjectCard({ data, image, isOwner }: Props) {
	const { pageSlug } = useParams()

	async function handleClickProject() {
		if (!pageSlug || !data.id || isOwner) return
		await increaseProjectClicks(String(pageSlug), data.id)
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
							className="border-button-ghost bg-background-primary flex flex-col gap-2 rounded-xl border px-2 py-3 shadow-2xl"
							sideOffset={8}
						>
							<DropdownMenu.Item className="focus-themed flex cursor-pointer items-center gap-3 px-3 py-2 text-sm font-medium transition-colors hover:text-white/60">
								<Edit size={18} />
								Editar
							</DropdownMenu.Item>

							<DropdownMenu.Item className="focus-themed hover:text-accent-pink flex cursor-pointer items-center gap-3 px-3 py-2 text-sm font-medium transition-colors">
								<Trash size={18} />
								Remover
							</DropdownMenu.Item>
						</DropdownMenu.Content>
					</DropdownMenu.Root>

					{/* Modal edit */}
					{/* Modal delete */}
				</>
			)}
		</div>
	)
}
