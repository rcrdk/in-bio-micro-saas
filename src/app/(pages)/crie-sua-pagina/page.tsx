import type { Metadata } from 'next'

import { Hero } from '@/app/(pages)/crie-sua-pagina/components/hero'
import { Faq } from '@/components/common/faq'
import { Header } from '@/components/common/header'
import { Pricing } from '@/components/common/pricing'
import { VideoPresentation } from '@/components/common/video-presentation'
import { trackServerEvent } from '@/lib/mixpanel'

export const metadata: Metadata = {
	title: 'ProjectInBio - Seus projetos e redes sociais em um unico link',
	description:
		'Crie sua própria página de projetos e compartilhe eles com o mundo. Acompanhe o engajamento com Analytics de cliques.',
}

export default function Create() {
	trackServerEvent('page_view', {
		page: 'lp',
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
		</>
	)
}
