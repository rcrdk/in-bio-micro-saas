import { Plus } from 'lucide-react'
import Link from 'next/link'

import { ProjectCard } from '@/components/common/project-card'
import { TotalVisits } from '@/components/common/total-visits'
import { UserCard } from '@/components/common/user-card'

type ParamsProps = {
	profileId: string
}

type Props = {
	params: Promise<ParamsProps>
}

export default async function ProfilePage({ params }: Props) {
	const { profileId } = await params

	return (
		<>
			<div className="sticky left-0 right-0 top-0 z-10 gap-1 bg-background-tertiary py-2 text-center shadow-sm">
				<span>Você está usando a versão trial</span>{' '}
				<Link
					href={`/${profileId}/upgrade`}
					className="font-bold text-accent-green"
				>
					Faça o upgrade agora!
				</Link>
			</div>

			<div className="relative flex min-h-svh overflow-hidden py-20">
				<div className="flex h-min w-1/2 justify-center">
					<UserCard />
				</div>

				<div className="flex w-full flex-wrap content-start justify-center gap-4">
					<ProjectCard />
					<ProjectCard />
					<ProjectCard />
					<ProjectCard />

					<button className="flex h-[122px] w-[340px] items-center justify-center gap-5 rounded-2xl border border-dashed border-border-primary bg-background-secondary p-3 hover:border-border-secondary">
						<Plus className="size-10 text-accent-purple" />
						<span>Novo projeto</span>
					</button>
				</div>

				<div className="absolute bottom-4 left-0 right-0 mx-auto w-min">
					<TotalVisits />
				</div>
			</div>
		</>
	)
}
