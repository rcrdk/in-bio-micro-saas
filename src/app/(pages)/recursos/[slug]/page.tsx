import { notFound } from 'next/navigation'

import { Hero } from '@/app/(pages)/recursos/[slug]/hero'
import { Faq } from '@/components/sections/faq'
import { Header } from '@/components/sections/header'
import { Pricing } from '@/components/sections/pricing'
import { VideoPresentation } from '@/components/sections/video-presentation'
import { getTextsBySlug } from '@/utils/get-texts-by-slug'

type ParamsProps = {
	slug: string
}

type Props = {
	params: Promise<ParamsProps>
}

export default async function LinkInBio({ params }: Props) {
	// O objetivo é criar uma peagina com conteúdo diferente, essa diferenciaçnao melhora o rank no google

	const { slug } = await params
	const text = await getTextsBySlug(slug)

	if (!text) {
		return notFound()
	}

	return (
		<>
			<Header />

			<Hero title={text.title} description={text.description} />

			<VideoPresentation />
			<Pricing />
			<Faq />
		</>
	)
}
