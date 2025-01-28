import type { Metadata } from 'next'

import { Hero } from '@/app/(pages)/(home)/hero'
import { Faq } from '@/components/sections/faq'
import { Header } from '@/components/sections/header'
import { Pricing } from '@/components/sections/pricing'
import { VideoPresentation } from '@/components/sections/video-presentation'
import { env } from '@/lib/env'
import { trackServerEvent } from '@/lib/mixpanel'
import { getSeoTags } from '@/lib/seo'

export const metadata: Metadata = getSeoTags({
	title: 'ProjectInBio - Crie Seu Portfólio e Links em Minutos',
	description:
		'Mostre seu trabalho de forma profissional e simplifique sua presença online com uma plataforma fácil e personalizável.',
	keywords: [
		'ProjectInBio',
		'bio',
		'projetos',
		'redes sociais',
		'link',
		'página',
		'profissional',
	],
	domain: env.NEXT_PUBLIC_APP_URL,
	siteName: 'ProjectInBio',
	canonicalUrlRelative: '/',
})

export default function Home() {
	trackServerEvent('page_view', {
		page: 'home',
	})

	return (
		<>
			<Header />
			<Hero />
			<VideoPresentation />
			<Pricing />
			<Faq />
		</>
	)
}
