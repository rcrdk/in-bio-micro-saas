import type { Metadata } from 'next'

type Props = {
	title: string
	description: string
	keywords: string[]
	siteName: string
	domain: string
	canonicalUrlRelative: string
	extraTags?: Metadata
	locale?: string
}

export function getSeoTags({
	title,
	description,
	keywords,
	siteName,
	domain,
	canonicalUrlRelative,
	extraTags,
	locale,
}: Props): Metadata {
	return {
		title,
		description,
		keywords,
		applicationName: siteName,
		metadataBase: new URL(domain),
		openGraph: {
			title,
			description,
			url: domain,
			siteName,
			type: 'website',
		},
		twitter: {
			title,
			description,
			card: 'summary_large_image',
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
