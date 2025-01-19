import { ProjectCard } from '@/components/common/project-card'
import { TotalVisits } from '@/components/common/total-visits'
import { UserCard } from '@/components/common/user-card'
import { Button } from '@/components/ui/button'
import { Container } from '@/components/ui/container'
import { Input } from '@/components/ui/input'
import { Text } from '@/components/ui/text'

export function Hero() {
	return (
		<Container>
			<div className="flex min-h-svh py-10">
				<div className="mt-[35vh] flex flex-col gap-4">
					<Text variant="heading-lg" as="h1">
						Seus projetos e redes sociais em um unico link
					</Text>

					<Text variant="body-lg" as="h2">
						Crie sua própria página de projetos e compartilhe eles com o mundo.
						Acompanhe o engajamento com Analytics de cliques.
					</Text>

					<div className="mt-[10vh] flex w-full items-center gap-2">
						<Text
							variant="body-lg"
							as="span"
							className="leading-none text-white"
						>
							projectinbio.com/
						</Text>

						<Input placeholder="Seu link" />

						<Button>Criar agora</Button>
					</div>
				</div>

				<div className="flex w-full items-center justify-center">
					<div className="relative z-[1]">
						<UserCard />

						<div className="absolute -bottom-[7%] -right-[45%]">
							<TotalVisits />
						</div>

						<div className="absolute -left-[55%] top-[20%] -z-10">
							<ProjectCard />
						</div>

						<div className="absolute -left-[45%] -top-[5%] -z-10">
							<ProjectCard />
						</div>

						<div className="absolute left-1/2 top-1/2 -z-20 w-[180%] -translate-x-1/2 -translate-y-1/2 opacity-60 mix-blend-lighten blur-[580px] before:block before:aspect-square before:rounded-full before:bg-accent-purple" />
					</div>
				</div>
			</div>
		</Container>
	)
}
