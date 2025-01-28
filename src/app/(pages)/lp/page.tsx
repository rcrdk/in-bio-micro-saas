import { Hero } from '@/app/(pages)/lp/hero'
import { Faq } from '@/components/sections/faq'
import { Header } from '@/components/sections/header'
import { Pricing } from '@/components/sections/pricing'
import { VideoPresentation } from '@/components/sections/video-presentation'

export default function Create() {
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
