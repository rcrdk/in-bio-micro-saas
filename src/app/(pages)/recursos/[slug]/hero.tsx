'use client'

import Link from 'next/link'
import { sendGTMEvent } from '@next/third-parties/google'
import { ArrowRight } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Container } from '@/components/ui/container'
import { Text } from '@/components/ui/text'
import { env } from '@/lib/env'

type Props = {
	title?: string
	description?: string
	slug: string
}

export function Hero({ title, description, slug }: Props) {
	return (
		<Container className="relative z-0 pt-40 pb-20 text-center">
			<div className="flex flex-col items-center">
				<Text
					as="span"
					className="border-border-primary bg-background-primary rounded-3xl border px-4 py-2 leading-tight font-bold text-white uppercase select-none"
				>
					{env.NEXT_PUBLIC_TRIAL_DAYS} dias grátis
				</Text>

				<Text
					as="h1"
					variant="heading-xl"
					className="bg-linear-to-r from-white to-slate-400 bg-clip-text text-transparent"
				>
					{title || 'Crie Seu Portfólio e Links em Minutos'}
				</Text>

				<Text variant="body-lg" className="mt-6 max-w-(--breakpoint-md)">
					{description ||
						'Mostre seu trabalho de forma profissional e simplifique sua presença online com uma plataforma fácil e personalizável.'}
				</Text>

				<Button
					as={Link}
					size="lg"
					href="/crie-sua-pagina"
					className="mt-10 w-full sm:mt-12 sm:w-auto"
					onClick={() => sendGTMEvent({ event: 'cta_home_clicks', slug })}
				>
					Quero fazer minha Bio
					<ArrowRight />
				</Button>
			</div>

			<div className="absolute inset-0 -z-10">
				<div className="absolute inset-0 z-10 bg-[repeating-linear-gradient(to_right,_transparent,_transparent_45px,_#ffffff_46px)] opacity-20" />
				<div className="before:bg-accent-purple absolute bottom-full left-1/2 w-[157px] max-w-[75%] translate-0 -translate-x-1/2 translate-y-32 translate-z-0 opacity-60 mix-blend-lighten blur-[580px] backface-hidden before:block before:aspect-9/16 before:rounded-full" />
				<div className="before:bg-accent-purple absolute bottom-full left-1/2 w-[480px] max-w-[75%] translate-0 -translate-x-1/2 translate-y-8 translate-z-0 opacity-60 mix-blend-lighten blur-[580px] backface-hidden before:block before:aspect-square before:rounded-full" />
				<div className="before:bg-accent-purple absolute bottom-full left-1/2 w-[480px] max-w-[75%] translate-0 -translate-x-1/2 translate-y-8 translate-z-0 opacity-60 mix-blend-lighten blur-[580px] backface-hidden before:block before:aspect-square before:rounded-full" />
				<div className="to-background-primary absolute inset-0 z-30 bg-linear-to-b from-transparent" />
			</div>
		</Container>
	)
}
