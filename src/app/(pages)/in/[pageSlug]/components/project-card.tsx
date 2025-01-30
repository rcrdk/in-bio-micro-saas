'use client'

import { ImageIcon } from 'lucide-react'
import type { StaticImageData } from 'next/image'
import Image from 'next/image'
import Link from 'next/link'
import { useParams } from 'next/navigation'

import { increaseProjectClicks } from '@/app/actions/increase-project-clicks'
import type { ProjectData } from '@/http/get-projects'
import { httpUrlParser } from '@/utils/http-url-parser'
import { cn } from '@/utils/tailwind-cn'

type Props = {
	data: ProjectData
	image?: string | null | StaticImageData
	isOwner: boolean
	demo?: boolean
}

export function ProjectCard({ data, image, isOwner, demo = false }: Props) {
	const { pageSlug } = useParams()

	async function handleClickProject() {
		if (!pageSlug || !data.id || isOwner) return
		await increaseProjectClicks(String(pageSlug), data.id)
	}

	return (
		<Link
			href={httpUrlParser(data.projectUrl)}
			target="_blank"
			onClick={handleClickProject}
			tabIndex={demo ? -1 : undefined}
			className={cn(
				'focus-themed bg-card-background hover:border-card-border flex gap-5 rounded-2xl border border-transparent p-3 transition-colors',
				demo && 'w-[340px]',
			)}
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
					<span className="font-bold text-white">{data.projectName}</span>
					<span className="text-content-body text-sm">
						{data.projectDescription}
					</span>
				</div>
			</div>
		</Link>
	)
}
