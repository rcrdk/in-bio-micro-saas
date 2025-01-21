import Link from 'next/link'
import { notFound } from 'next/navigation'

import { NewProject } from '@/app/(pages)/[pageSlug]/new-project'
import { increaseProfileVisits } from '@/app/actions/increase-profile-visits'
import { ProjectCard } from '@/components/common/project-card'
import { TotalVisits } from '@/components/common/total-visits'
import { UserCard } from '@/components/common/user-card'
import { getProfile } from '@/http/get-profile'
import { getProjects } from '@/http/get-projects'
import { auth } from '@/lib/auth'
import { getDownloadUrlFromPath } from '@/lib/firebase'

type ParamsProps = {
	pageSlug: string
}

type Props = {
	params: Promise<ParamsProps>
}

export default async function ProfilePage({ params }: Props) {
	const { pageSlug } = await params

	const profileData = await getProfile(pageSlug)

	if (!profileData) {
		return notFound()
	}

	const projects = await getProjects(pageSlug)
	const session = await auth()

	const isProfileOwner = profileData.userId === session?.user?.id

	if (!isProfileOwner) await increaseProfileVisits(pageSlug)

	// check user active subscription

	return (
		<>
			<div className="sticky left-0 right-0 top-0 z-10 gap-1 bg-background-tertiary py-2 text-center shadow-sm">
				<span>Você está usando a versão trial</span>{' '}
				<Link
					href={`/${pageSlug}/upgrade`}
					className="font-bold text-accent-green"
				>
					Faça o upgrade agora!
				</Link>
			</div>

			<div className="flex min-h-svh overflow-hidden py-20">
				<div className="flex h-min w-1/2 justify-center">
					<UserCard data={profileData} isOwner={isProfileOwner} />
				</div>

				<div className="flex w-full flex-wrap content-start justify-center gap-4">
					{projects.map(async (project) => (
						<ProjectCard
							key={project.id}
							data={project}
							image={await getDownloadUrlFromPath(project.imagePath)}
							isOwner={isProfileOwner}
						/>
					))}

					{isProfileOwner && <NewProject profileId={pageSlug} />}
				</div>
			</div>

			{isProfileOwner && (
				<div className="pointer-events-none sticky bottom-0 flex items-center justify-center pb-4">
					<TotalVisits counter={profileData.totalVisits} />
				</div>
			)}
		</>
	)
}
