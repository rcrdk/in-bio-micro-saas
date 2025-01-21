import 'server-only'

import { DB } from '@/lib/firebase'

export type ProfileLinkProps = {
	title: string
	url: string
}

export type ProfileCustomLinks = 'link1' | 'link2' | 'link3'
export type ProfileSocialMedia = 'github' | 'linkedin' | 'twitter' | 'instagram'

export type ProfileData = {
	name: string
	description: string
	imagePath: string | null
	userId: string
	totalVisits: number
	createdAt: number
	socialMedia: Record<ProfileSocialMedia, string>
	customLinks: Record<ProfileCustomLinks, ProfileLinkProps>
}

export async function getProfile(profileId: string) {
	const snapshot = await DB.collection('profiles').doc(profileId).get()

	return snapshot.data() as ProfileData | undefined
}
