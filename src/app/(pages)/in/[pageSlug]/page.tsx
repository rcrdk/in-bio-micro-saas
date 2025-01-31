import type { Metadata } from 'next'
import { notFound, redirect } from 'next/navigation'

import { ModalCreateProject } from '@/app/(pages)/in/[pageSlug]/components/modal-create-project'
import { ProjectCard } from '@/app/(pages)/in/[pageSlug]/components/project-card'
import { TotalVisits } from '@/app/(pages)/in/[pageSlug]/components/total-visits'
import { UpgradeMessage } from '@/app/(pages)/in/[pageSlug]/components/upgrade-message'
import { UserCard } from '@/app/(pages)/in/[pageSlug]/components/user-card'
import { Container } from '@/components/ui/container'
import { getProfileBySlug } from '@/http/get-profile-by-slug'
import { getProjects } from '@/http/get-projects'
import { increaseProfileVisits } from '@/http/increase-profile-visits'
import { auth } from '@/lib/auth'
import { env } from '@/lib/env'
import { getDownloadUrlFromPath } from '@/lib/firebase'
import { trackServerEvent } from '@/lib/mixpanel'
import { getSeoTags } from '@/lib/seo'

type Props = {
	params: Promise<{ pageSlug: string }>
	searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { pageSlug } = await params
	const profileData = await getProfileBySlug(pageSlug)

	if (!profileData) {
		return notFound()
	}

	return getSeoTags({
		title: `${profileData.name} - Perfil na ProjectInBio`,
		description: profileData.description,
		keywords: [],
		canonicalUrlRelative: `/in/${profileData.slug}`,
	})
}

export default async function ProfilePage({ params }: Props) {
	const { pageSlug } = await params

	const profileData = await getProfileBySlug(pageSlug)

	if (!profileData) {
		return notFound()
	}

	const projects = await getProjects(pageSlug)
	const session = await auth()

	const isProfileOwner = profileData.userId === session?.user?.id

	// make page accessible to everyone if:
	// or: is on trial
	// or: is paid

	if (!isProfileOwner) {
		await increaseProfileVisits(pageSlug)

		trackServerEvent('page_view', {
			page: 'profile',
			slug: pageSlug,
			owner: 'no',
		})
	} else {
		trackServerEvent('page_view', {
			page: 'profile',
			slug: pageSlug,
			owner: 'yes',
		})
	}

	const isNotPaid =
		isProfileOwner && !session?.user.isPaid && !session?.user.isTrial

	if (isNotPaid) {
		return redirect(`/in/${profileData.slug}/upgrade`)
	}

	const canCreateProjects =
		isProfileOwner && projects.length < env.NEXT_PUBLIC_MAX_PROJECTS

	return (
		<div className="flex min-h-svh flex-col">
			<UpgradeMessage pageSlug={pageSlug} />

			<Container className="grow">
				<div className="flex flex-col gap-6 py-6 sm:gap-10 sm:py-10 lg:flex-row lg:items-start">
					<div className="flex justify-center">
						<UserCard data={profileData} isOwner={isProfileOwner} />
					</div>

					<div className="grid w-full grow gap-4 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
						{projects.map(async (project) => (
							<ProjectCard
								key={project.id}
								data={project}
								image={await getDownloadUrlFromPath(project.imagePath)}
								isOwner={isProfileOwner}
							/>
						))}

						{canCreateProjects && <ModalCreateProject pageSlug={pageSlug} />}
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
