'use client'

import { ImageIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

import type { ProjectData } from '@/http/get-projects'

type Props = {
	data: ProjectData
	image: string | null
	isOwner: boolean
}

export function ProjectCard({ data, image, isOwner }: Props) {
	async function handleClickProject() {
		'use client'
		// to do
	}

	const parsedUrl = data.projectUrl.startsWith('http')
		? data.projectUrl
		: `https://${data.projectUrl}`

	return (
		<Link href={parsedUrl} target="_blank" onClick={handleClickProject}>
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
							{data.totalVisits === 1
								? '1 clique'
								: `${data.totalVisits ?? 0} cliques`}
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
