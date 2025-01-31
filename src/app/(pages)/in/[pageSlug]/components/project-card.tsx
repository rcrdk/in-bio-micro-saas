'use client'

import { ImageIcon } from 'lucide-react'
import type { StaticImageData } from 'next/image'
import Image from 'next/image'
import { useParams } from 'next/navigation'

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
			{/* Dropdown: delete and edit */}

			<a
				href={httpUrlParser(data.url)}
				onClick={handleClickProject}
				target="_blank"
				className="focus-themed bg-card-background hover:border-card-border flex w-full cursor-pointer gap-5 rounded-2xl border border-transparent p-3 transition-colors"
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

					<div className="flex flex-col gap-1">
						<span className="font-bold text-white">{data.name}</span>
						<span className="text-content-body text-sm">
							{data.description}
						</span>
					</div>
				</div>
			</a>
		</div>
	)
}
