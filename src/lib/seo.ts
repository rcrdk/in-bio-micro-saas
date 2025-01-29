import type { Metadata } from 'next'

import { env } from '@/lib/env'

type Props = {
	title: string
	description?: string
	keywords?: string[]
	canonicalUrlRelative?: string
	extraTags?: Metadata
}

export function getSeoTags({
	title,
	description,
	keywords,
	canonicalUrlRelative,
	extraTags,
}: Props): Metadata {
	return {
		title,
		description,
		keywords,
		applicationName: 'ProjectInBio',
		metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
		openGraph: {
			title,
			description,
			siteName: 'ProjectInBio',
			type: 'website',
			images: {
				url: '/opengraph-image.png',
				width: '1200',
				height: '630',
				type: 'image/png',
			},
		},
		twitter: {
			title,
			description,
			card: 'summary_large_image',
			images: {
				url: '/twitter-image.png',
				width: '1200',
				height: '630',
				type: 'image/png',
			},
		},
		alternates: {
			canonical: canonicalUrlRelative,
			languages: {
				pt: canonicalUrlRelative,
			},
		},
		...extraTags,
	}
}
