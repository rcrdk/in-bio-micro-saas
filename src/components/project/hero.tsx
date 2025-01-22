/* eslint-disable prettier/prettier */
'use client'

import { animated, useSpring } from '@react-spring/web'

import { ProjectCardDemo } from '@/components/common/project-card/demo'
import { TotalVisits } from '@/components/common/total-visits'
import { UserCardDemo } from '@/components/common/user-card/demo'
import { CreateLinkForm } from '@/components/create/create-link-form'
import { Container } from '@/components/ui/container'
import { Text } from '@/components/ui/text'


const calc = (x: number, y: number) => [x - window.innerWidth / 2, y - window.innerHeight / 2]
const translationOne = (x: number, y: number) => `translate3d(${x / 30}px,${y / 30}px,0)`
const translationTwo = (x: number, y: number) => `translate3d(${x / -30}px,${y / -30}px,0)`
const translationThree = (x: number, y: number) => `translate3d(${x / -5}px,${y / -5}px,0)`

export function Hero() {
	const [parallaxProps, setTranslate] = useSpring(() => ({
		xy: [0, 0],
		config: { mass: 10, tension: 550, friction: 140 },
	}))

	function onMouseParallax(event: React.MouseEvent<HTMLDivElement>) {
		const { clientX: x, clientY: y } = event
		setTranslate({ xy: calc(x, y) })
	}

	const Animated = animated('div')

	return (
		<Container>
			<div
				className="flex flex-col items-center text-center lg:flex-row lg:text-left"
				onMouseMove={onMouseParallax}
			>
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
						<Animated style={{ transform: parallaxProps.xy.to(translationTwo) }}>
							<TotalVisits counter={12453} />
						</Animated>
					</div>

					<div className="relative z-[2]">
						<Animated style={{ transform: parallaxProps.xy.to(translationOne) }}>
							<UserCardDemo />
						</Animated>
					</div>

					<div className="absolute left-1/2 top-1/2 -z-10 w-[600px] -translate-x-1/2 -translate-y-1/2 ">
						<Animated style={{ transform: parallaxProps.xy.to(translationThree) }}>
							<div className='opacity-60 mix-blend-lighten blur-[580px] aspect-square rounded-full bg-accent-purple' />
						</Animated>
					</div>

					<div className="absolute -top-10 left-0 z-[1]">
						<Animated style={{ transform: parallaxProps.xy.to(translationTwo) }}>
							<div className="flex flex-col gap-6">
								<div className="ml-14">
									<ProjectCardDemo variant="1" />
								</div>

								<ProjectCardDemo variant="2" />
							</div>
						</Animated>
					</div>
				</div>
			</div>
		</Container>
	)
}
