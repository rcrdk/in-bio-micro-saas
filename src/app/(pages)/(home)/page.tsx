import { Hero } from '@/app/(pages)/(home)/hero'
import { Faq } from '@/components/sections/faq'
import { Header } from '@/components/sections/header'
import { Pricing } from '@/components/sections/pricing'
import { VideoPresentation } from '@/components/sections/video-presentation'

export default function Home() {
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
