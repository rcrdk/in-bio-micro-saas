import type { MetadataRoute } from 'next'

import { env } from '@/lib/env'
import { socialMedias } from '@/utils/get-texts-by-slug'

export default function sitemap(): MetadataRoute.Sitemap {
	const socialMediaEntries: MetadataRoute.Sitemap = socialMedias.map(
		(item) => ({
			url: `${env.NEXT_PUBLIC_APP_URL}/recursos/link-na-bio-para-${item}`,
			lastModified: new Date().toISOString(),
			changeFrequency: 'monthly',
			priority: 0.5,
		}),
	)

	const staticEntries: MetadataRoute.Sitemap = [
		{
			url: env.NEXT_PUBLIC_APP_URL,
			lastModified: new Date().toISOString(),
			changeFrequency: 'monthly',
			priority: 1,
		},
		{
			url: `${env.NEXT_PUBLIC_APP_URL}/lp`,
			lastModified: new Date().toISOString(),
			changeFrequency: 'monthly',
			priority: 1,
		},
	]

	return [...staticEntries, ...socialMediaEntries]
}
