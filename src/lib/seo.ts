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
		alternates: {
			canonical: canonicalUrlRelative,
			languages: {
				pt: canonicalUrlRelative,
			},
		},
		...extraTags,
	}
}
