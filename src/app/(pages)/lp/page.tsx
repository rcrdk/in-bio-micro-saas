import type { Metadata } from 'next'

import { Hero } from '@/app/(pages)/lp/hero'
import { Faq } from '@/components/sections/faq'
import { Header } from '@/components/sections/header'
import { Pricing } from '@/components/sections/pricing'
import { VideoPresentation } from '@/components/sections/video-presentation'
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
