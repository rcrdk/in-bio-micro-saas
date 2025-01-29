import type { Metadata } from 'next'
import { notFound, redirect } from 'next/navigation'

import { ModalCreateProject } from '@/app/(pages)/in/[pageSlug]/components/modal-create-project'
import { ProjectCard } from '@/app/(pages)/in/[pageSlug]/components/project-card'
import { TotalVisits } from '@/app/(pages)/in/[pageSlug]/components/total-visits'
import { UpgradeMessage } from '@/app/(pages)/in/[pageSlug]/components/upgrade-message'
import { UserCard } from '@/app/(pages)/in/[pageSlug]/components/user-card'
import { increaseProfileVisits } from '@/app/actions/increase-profile-visits'
import { Container } from '@/components/ui/container'
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

export const metadata: Metadata = {
	title: 'Perfil - ProjectInBio',
	description: '',
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

	// make page accessible to everyone if:
	// or: is on trial
	// or: is paid

	if (!isProfileOwner) await increaseProfileVisits(pageSlug)

	const isNotPaid =
		isProfileOwner && !session?.user.isPaid && !session?.user.isTrial

	if (isNotPaid) {
		return redirect(`/in/${profileData.slug}/upgrade`)
	}

	return (
		<div className="flex min-h-svh flex-col">
			<UpgradeMessage pageSlug={pageSlug} />

			<Container className="flex-grow">
				<div className="flex flex-col gap-6 py-6 sm:gap-10 sm:py-10 lg:flex-row lg:items-start">
					<div className="flex justify-center">
						<UserCard data={profileData} isOwner={isProfileOwner} />
					</div>

					<div className="grid w-full flex-grow gap-4 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
						{projects.map(async (project) => (
							<ProjectCard
								key={project.id}
								data={project}
								image={await getDownloadUrlFromPath(project.imagePath)}
								isOwner={isProfileOwner}
							/>
						))}

						{isProfileOwner && <ModalCreateProject pageSlug={pageSlug} />}
					</div>
				</div>
			</Container>

			{isProfileOwner && (
				<div className="pointer-events-none sticky bottom-0 flex items-center justify-center px-6 pb-6">
					<TotalVisits
						counter={profileData.totalVisits}
						isPaid={!!session.user.isPaid}
					/>
				</div>
			)}
		</div>
	)
}
