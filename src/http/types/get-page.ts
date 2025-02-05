export type PageCustomLinkProps = {
	title: string
	url: string
}

export type PageCustomLinks = 'link1' | 'link2' | 'link3'
export type PageSocialNetworks =
	| 'github'
	| 'linkedin'
	| 'twitter'
	| 'instagram'
	| 'youtube'
	| 'facebook'

export type PageData = {
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
	socialMedia: Record<PageSocialNetworks, string>
	customLinks: Record<PageCustomLinks, PageCustomLinkProps>
}
