export type ProfileLinkProps = {
	title: string
	url: string
}

export type ProfileCustomLinks = 'link1' | 'link2' | 'link3'
export type ProfileSocialMedia =
	| 'github'
	| 'linkedin'
	| 'twitter'
	| 'instagram'
	| 'youtube'
	| 'facebook'

export type ProfileData = {
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
	socialMedia: Record<ProfileSocialMedia, string>
	customLinks: Record<ProfileCustomLinks, ProfileLinkProps>
}
