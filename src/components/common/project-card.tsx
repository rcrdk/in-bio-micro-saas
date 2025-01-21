'use client'

import { ImageIcon } from 'lucide-react'
import type { StaticImageData } from 'next/image'
import Image from 'next/image'
import Link from 'next/link'
import { useParams } from 'next/navigation'

import { increaseProjectClicks } from '@/app/actions/increase-project-clicks'
import type { ProjectData } from '@/http/get-projects'
import { httpUrlParser } from '@/utils/http-url-parser'

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
		>
			<div className="flex w-[340px] gap-5 rounded-2xl border border-transparent bg-background-secondary p-3 hover:border-border-secondary">
				<div className="flex size-24 flex-shrink-0 overflow-hidden rounded-md bg-background-tertiary">
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
						<span className="text-xs font-bold uppercase text-accent-green">
							{data.totalClicks === 1
								? '1 clique'
								: `${data.totalClicks ?? 0} cliques`}
						</span>
					)}

					<div className="flex flex-col">
						<span className="font-bold text-white">{data.projectName}</span>
						<span className="text-sm text-content-body">
							{data.projectDescription}
						</span>
					</div>
				</div>
			</div>
		</Link>
	)
}
