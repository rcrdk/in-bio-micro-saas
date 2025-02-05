/* eslint-disable prettier/prettier */
import type { Metadata } from 'next'
import { notFound, redirect } from 'next/navigation'

import { CreateProjectButton } from '@/app/(pages)/in/[pageSlug]/components/create-project-button'
import { ProjectCard } from '@/app/(pages)/in/[pageSlug]/components/project-card'
import { ShareButton } from '@/app/(pages)/in/[pageSlug]/components/share-button'
import { TotalVisits } from '@/app/(pages)/in/[pageSlug]/components/total-visits'
import { UpgradeMessage } from '@/app/(pages)/in/[pageSlug]/components/upgrade-message'
import { UserCard } from '@/app/(pages)/in/[pageSlug]/components/user-card'
import { UserControls } from '@/app/(pages)/in/[pageSlug]/components/user-controls'
import { Container } from '@/components/ui/container'
import { useTrialDays } from '@/hooks/trial-days'
import { getPageBySlug } from '@/http/get-page-by-slug'
import { getProjects } from '@/http/get-projects'
import { increasePageVisits } from '@/http/increase-page-visits'
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
	const { pageSlug: slug } = await params
	const data = await getPageBySlug(slug)

	if (!data) {
		return notFound()
	}

	return getSeoTags({
		title: `${data.name} - Perfil na ProjectInBio`,
		description: data.description,
		keywords: [],
		canonicalUrlRelative: `/in/${slug}`,
	})
}

export default async function Page({ params }: Props) {
	const { pageSlug: slug } = await params

	const data = await getPageBySlug(slug)

	if (!data) {
		return notFound()
	}

	// eslint-disable-next-line react-hooks/rules-of-hooks
	const { trialExpired } = useTrialDays(data.trialEndsAt)

	const session = await auth()
	
	const isPageOwner = data.userId === session?.user?.id

	if (!isPageOwner && trialExpired && !data.isPaid) {
		return notFound()
	}
	
	const projects = await getProjects(slug)

	if (!isPageOwner) {
		await increasePageVisits(slug)

		trackServerEvent('page_view', {
			page: 'page',
			page_owner: false,
			url: `/in/${slug}`
		})
	} else {
		trackServerEvent('page_view', {
			page: 'page',
			page_owner: true,
			url: `/in/${slug}`
		})
	}

	const isNotPaid = isPageOwner && !data.isPaid && trialExpired
	const canCreateProjects = isPageOwner && projects.length < env.NEXT_PUBLIC_MAX_PROJECTS

	if (isNotPaid) {
		return redirect(`/in/${slug}/upgrade`)
	}

	return (
		<div className="flex min-h-svh flex-col">
			{isPageOwner && (!data.isPaid || data.subscriptionEndedAt) && (
				<UpgradeMessage pageSlug={slug} trialEndDate={data.trialEndsAt} subscriptionEndedDate={data.subscriptionEndedAt} />
			)}

			<Container className="grow">
				<div className="flex flex-col gap-6 pt-6 sm:gap-10 sm:pt-10 lg:flex-row lg:items-start">
					<div className="flex justify-center">
						<UserCard data={data} isOwner={isPageOwner} />
					</div>

					<div className="grid w-full grow gap-4 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
						{projects.map(async (project) => (
							<ProjectCard
								key={project.id}
								data={project}
								image={await getDownloadUrlFromPath(project.imagePath)}
								isOwner={isPageOwner}
							/>
						))}

						{canCreateProjects && <CreateProjectButton />}
					</div>
				</div>
			</Container>

			{isPageOwner && (
				<div className="lg:pl-[388px] pointer-events-none sticky bottom-0 flex items-center justify-center px-6 pb-6 gap-2 pt-6 sm:pt-10 bg-gradient-to-b from-background-primary/0 to-background-primary">
					
					
					<TotalVisits
						counter={data.totalVisits}
						slug={slug}
					/>

					<UserControls isPaid={data.isPaid} />
					<ShareButton mode='sticky-bottom' pageSlug={slug} />
				</div>
			)}
		</div>
	)
}
