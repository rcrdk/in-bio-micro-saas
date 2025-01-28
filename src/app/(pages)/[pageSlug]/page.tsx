import Link from 'next/link'
import { notFound, redirect } from 'next/navigation'

import { NewProject } from '@/app/(pages)/[pageSlug]/new-project'
import { increaseProfileVisits } from '@/app/actions/increase-profile-visits'
import { ProjectCard } from '@/components/common/project-card'
import { TotalVisits } from '@/components/common/total-visits'
import { UserCard } from '@/components/common/user-card'
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

	const isOnTrial = session?.user.isTrial && !session.user.isPaid
	const isNotPaid =
		isProfileOwner && !session?.user.isPaid && !session?.user.isTrial

	if (isNotPaid) {
		return redirect(`/${profileData.slug}/upgrade`)
	}

	return (
		<div className="flex min-h-svh flex-col">
			{isOnTrial && (
				<div className="sticky left-0 right-0 top-0 z-10 gap-1 border-b border-sticky-border bg-sticky-background py-3 text-center shadow-sm">
					<span>Você está usando a versão trial</span>{' '}
					<Link
						href={`/${pageSlug}/upgrade`}
						className="focus-themed font-bold text-accent-green"
					>
						Faça o upgrade agora!
					</Link>
				</div>
			)}

			<Container className="flex-grow">
				<div className="flex items-start gap-10 py-16">
					<div className="flex justify-center">
						<UserCard data={profileData} isOwner={isProfileOwner} />
					</div>

					<div className="grid w-full grid-cols-2 gap-4">
						{projects.map(async (project) => (
							<ProjectCard
								key={project.id}
								data={project}
								image={await getDownloadUrlFromPath(project.imagePath)}
								isOwner={isProfileOwner}
							/>
						))}

						{isProfileOwner && <NewProject pageSlug={pageSlug} />}
					</div>
				</div>
			</Container>

			{isProfileOwner && (
				<div className="pointer-events-none sticky bottom-0 flex items-center justify-center pb-6">
					<TotalVisits counter={profileData.totalVisits} showActions />
				</div>
			)}
		</div>
	)
}
