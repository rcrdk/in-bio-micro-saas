export type PageCustomLinks = Record<
	'link1' | 'link2' | 'link3',
	{ title: string; url: string }
>

export type PageSocialMediaLinks = Record<
	'github' | 'linkedin' | 'twitter' | 'instagram' | 'youtube' | 'facebook',
	string
>

export type PageDTO = {
	name: string
	slug: string
	description: string
	imagePath: string | null
	isPaid: boolean
	userId: string
	totalVisits: number
	trialEndsAt: number
	createdAt: number
	updatedAt: number
	subscriptionEndedAt: number | null
	socialMedia: PageSocialMediaLinks
	customLinks: PageCustomLinks
}
