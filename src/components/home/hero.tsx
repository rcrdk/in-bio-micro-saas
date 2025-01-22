import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { Container } from '@/components/ui/container'
import { Text } from '@/components/ui/text'
import { env } from '@/lib/env'

export function Hero() {
	return (
		<Container className="relative z-0 pb-20 pt-40 text-center">
			<div className="flex flex-col items-center">
				<Text
					as="span"
					className="rounded-3xl border border-border-primary bg-background-primary px-4 py-2 font-bold uppercase leading-tight text-white"
				>
					{env.NEXT_PUBLIC_TRIAL_DAYS} dias grátis
				</Text>

				<Text
					as="h1"
					variant="heading-xl"
					className="bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent"
				>
					Crie Seu Portfólio e Links em Minutos
				</Text>

				<Text variant="body-lg" className="mt-6 max-w-screen-md">
					Mostre seu trabalho de forma profissional e simplifique sua presença
					online com uma plataforma fácil e personalizável.
				</Text>

				<Button as={Link} size="lg" href="/create" className="mt-12">
					Quero fazer minha Bio
					<ArrowRight />
				</Button>
			</div>

			<div className="absolute inset-0 -z-10">
				<div className="absolute inset-0 z-10 bg-[repeating-linear-gradient(to_right,_transparent,_transparent_45px,_#ffffff_46px)] opacity-20" />
				<div className="absolute bottom-full left-1/2 w-[157px] max-w-[75%] -translate-x-1/2 translate-y-32 opacity-60 mix-blend-lighten blur-[580px] before:block before:aspect-[9/16] before:rounded-full before:bg-accent-purple" />
				<div className="absolute bottom-full left-1/2 w-[480px] max-w-[75%] -translate-x-1/2 translate-y-8 opacity-60 mix-blend-lighten blur-[580px] before:block before:aspect-square before:rounded-full before:bg-accent-purple" />
				<div className="absolute bottom-full left-1/2 w-[480px] max-w-[75%] -translate-x-1/2 translate-y-8 opacity-60 mix-blend-lighten blur-[580px] before:block before:aspect-square before:rounded-full before:bg-accent-purple" />
				<div className="absolute inset-0 z-30 bg-gradient-to-b from-transparent to-background-primary" />
			</div>
		</Container>
	)
}
