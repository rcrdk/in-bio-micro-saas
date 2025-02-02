/* eslint-disable prettier/prettier */
import type { Metadata } from 'next'
import { notFound, redirect } from 'next/navigation'

import { CreateProjectButton } from '@/app/(pages)/in/[pageSlug]/components/create-project-button'
import { ProjectCard } from '@/app/(pages)/in/[pageSlug]/components/project-card'
import { TotalVisits } from '@/app/(pages)/in/[pageSlug]/components/total-visits'
import { UpgradeMessage } from '@/app/(pages)/in/[pageSlug]/components/upgrade-message'
import { UserCard } from '@/app/(pages)/in/[pageSlug]/components/user-card'
import { Container } from '@/components/ui/container'
import { useTrialDays } from '@/hooks/trial-days'
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

	// eslint-disable-next-line react-hooks/rules-of-hooks
	const { trialExpired } = useTrialDays(profileData.trialEndsAt)

	const session = await auth()
	
	const isProfileOwner = profileData.userId === session?.user?.id

	if (!isProfileOwner && trialExpired && !profileData.isPaid) {
		return notFound()
	}
	
	const projects = await getProjects(pageSlug)

	if (!isProfileOwner) {
		await increaseProfileVisits(pageSlug)

		trackServerEvent('page_view', {
			page: 'profile',
			page_owner: false,
			url: `/in/${pageSlug}`
		})
	} else {
		trackServerEvent('page_view', {
			page: 'profile',
			page_owner: true,
			url: `/in/${pageSlug}`
		})
	}

	const isNotPaid = isProfileOwner && !profileData.isPaid && trialExpired
	const canCreateProjects = isProfileOwner && projects.length < env.NEXT_PUBLIC_MAX_PROJECTS

	if (isNotPaid) {
		return redirect(`/in/${profileData.slug}/upgrade`)
	}

	return (
		<div className="flex min-h-svh flex-col">
			{isProfileOwner && (!profileData.isPaid || profileData.subscriptionEndedAt) && (
				<UpgradeMessage pageSlug={pageSlug} trialEndDate={profileData.trialEndsAt} subscriptionEndedDate={profileData.subscriptionEndedAt} />
			)}

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

						{canCreateProjects && <CreateProjectButton />}
					</div>
				</div>
			</Container>

			{isProfileOwner && (
				<div className="pointer-events-none sticky bottom-0 flex items-center justify-center px-6 pb-6">
					<TotalVisits
						counter={profileData.totalVisits}
						isPaid={profileData.isPaid}
					/>
				</div>
			)}
		</div>
	)
}
