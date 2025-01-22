import demoProject1 from '@/assets/demo-project-1.png'
import demoProject2 from '@/assets/demo-project-2.png'
import { ProjectCard } from '@/components/common/project-card'
import { TotalVisits } from '@/components/common/total-visits'
import { UserCard } from '@/components/common/user-card'
import { CreateLinkForm } from '@/components/create/create-link-form'
import { Container } from '@/components/ui/container'
import { Text } from '@/components/ui/text'
import type { ProfileData } from '@/http/get-profile'
import type { ProjectData } from '@/http/get-projects'

export function Hero() {
	const placeholderUserData: ProfileData = {
		name: 'John Doe',
		description: 'Eu crio produtos para a internet',
		userId: '',
		slug: '',
		imagePath: '',
		totalVisits: 12453,
		customLinks: {
			link1: {
				title: 'Confira meu template SaaS',
				url: '.',
			},
			link2: {
				title: '',
				url: '',
			},
			link3: {
				title: '',
				url: '',
			},
		},
		socialMedia: {
			github: '.',
			linkedin: '.',
			twitter: '.',
			instagram: '.',
		},
		createdAt: 0,
		updatedAt: 0,
	}

	const placeholderProjectOne: ProjectData = {
		id: '',
		userId: '',
		projectName: 'BugTracer',
		projectDescription: 'Rastreador simples de bugs.',
		projectUrl: '',
		imagePath: '',
		totalClicks: 15,
		createdAt: 0,
		updatedAt: 0,
	}

	const placeholderProjectTwo: ProjectData = {
		id: '',
		userId: '',
		projectName: 'CodeLink',
		projectDescription: 'Integração de GitHub e GitLab.',
		projectUrl: '',
		imagePath: '',
		totalClicks: 2,
		createdAt: 0,
		updatedAt: 0,
	}

	return (
		<Container>
			<div className="flex flex-col items-center text-center lg:flex-row lg:text-left">
				<div className="flex flex-col gap-4 pb-32 pt-32 lg:pb-16 lg:pr-10 lg:pt-40">
					<Text variant="heading-lg" as="h1">
						Seus projetos e redes sociais em um unico link
					</Text>

					<Text variant="body-lg" as="h2">
						Crie sua própria página de projetos e compartilhe eles com o mundo.
						Acompanhe o engajamento com Analytics de cliques.
					</Text>

					<div className="mt-8 flex w-full flex-col items-center gap-2 self-center sm:max-w-[500px] lg:mt-16 lg:max-w-full">
						<CreateLinkForm />
					</div>
				</div>

				<div className="pointer-events-none relative z-[1] mb-32 flex w-full max-w-screen-md select-none items-center justify-center lg:my-32 lg:min-w-[530px] lg:max-w-none">
					<div className="absolute bottom-0 right-0 z-[3] translate-y-1/2">
						<TotalVisits counter={12453} />
					</div>

					<div className="relative z-[2]">
						<UserCard data={placeholderUserData} isOwner demo />
					</div>

					<div className="absolute left-1/2 top-1/2 -z-10 w-[600px] -translate-x-1/2 -translate-y-1/2 opacity-60 mix-blend-lighten blur-[580px] before:block before:aspect-square before:rounded-full before:bg-accent-purple" />

					<div className="absolute -top-10 left-0 z-[1] flex flex-col gap-6">
						<div className="ml-14">
							<ProjectCard
								data={placeholderProjectOne}
								isOwner
								image={demoProject1}
								demo
							/>
						</div>

						<ProjectCard
							data={placeholderProjectTwo}
							isOwner
							image={demoProject2}
							demo
						/>
					</div>
				</div>
			</div>
		</Container>
	)
}
