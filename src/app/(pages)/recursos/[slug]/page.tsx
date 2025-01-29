import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { Hero } from '@/app/(pages)/recursos/[slug]/hero'
import { Faq } from '@/components/common/faq'
import { Footer } from '@/components/common/footer'
import { Header } from '@/components/common/header'
import { Pricing } from '@/components/common/pricing'
import { VideoPresentation } from '@/components/common/video-presentation'
import { trackServerEvent } from '@/lib/mixpanel'
import { getSeoTags } from '@/lib/seo'
import { getTextsBySlug } from '@/utils/get-texts-by-slug'

type Props = {
	params: Promise<{ slug: string }>
	searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { slug } = await params
	const content = await getTextsBySlug(slug)

	if (!content) {
		return notFound()
	}

	return getSeoTags({
		title: `ProjectInBio: ${content.title}`,
		description: content.description,
		keywords: [],
		canonicalUrlRelative: `/recursos/${slug}`,
	})
}

export default async function LinkInBio({ params }: Props) {
	const { slug } = await params
	const content = await getTextsBySlug(slug)

	if (!content) {
		return notFound()
	}

	trackServerEvent('page_view', {
		page: 'resouces',
		slug,
	})

	return (
		<>
			<Header />

			<Hero title={content.title} description={content.description} />

			<VideoPresentation />
			<Pricing />
			<Faq />
			<Footer />
		</>
	)
}
