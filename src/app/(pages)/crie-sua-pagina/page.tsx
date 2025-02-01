/* eslint-disable prettier/prettier */
import type { Metadata } from 'next'

import { Hero } from '@/app/(pages)/crie-sua-pagina/components/hero'
import { Faq } from '@/components/common/faq'
import { Footer } from '@/components/common/footer'
import { Header } from '@/components/common/header'
import { Pricing } from '@/components/common/pricing'
import { VideoPresentation } from '@/components/common/video-presentation'
import { trackServerEvent } from '@/lib/mixpanel'
import { getSeoTags } from '@/lib/seo'

export const metadata: Metadata = getSeoTags({
	title: 'ProjectInBio: Seus projetos e redes sociais em um único link',
	description: 'Crie sua própria página de projetos e compartilhe eles com o mundo. Acompanhe o engajamento com Analytics de cliques.',
	keywords: ['ProjectInBio', 'bio', 'projetos', 'redes sociais', 'link', 'página', 'profissional'],
	canonicalUrlRelative: '/crie-sua-pagina',
})

export default function Create() {
	trackServerEvent('page_view', {
		page: 'create-lp',
	})

	return (
		<>
			<Header />

			<div className="w-full overflow-hidden">
				<Hero />
				<VideoPresentation />
			</div>

			<Pricing />
			<Faq />
			<Footer />
		</>
	)
}
