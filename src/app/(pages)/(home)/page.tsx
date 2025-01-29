/* eslint-disable prettier/prettier */
import type { Metadata } from 'next'

import { Hero } from '@/app/(pages)/(home)/components/hero'
import { Faq } from '@/components/common/faq'
import { Footer } from '@/components/common/footer'
import { Header } from '@/components/common/header'
import { Pricing } from '@/components/common/pricing'
import { VideoPresentation } from '@/components/common/video-presentation'
import { trackServerEvent } from '@/lib/mixpanel'
import { getSeoTags } from '@/lib/seo'

export const metadata: Metadata = getSeoTags({
	title: 'ProjectInBio: Crie Seu Portfólio e Links em Minutos',
	description: 'Mostre seu trabalho de forma profissional e simplifique sua presença online com uma plataforma fácil e personalizável.',
	keywords: ['ProjectInBio', 'bio', 'projetos', 'redes sociais', 'link', 'página', 'profissional'],
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
			<Footer />
		</>
	)
}
