import 'server-only'

import { DB } from '@/lib/firebase'

export type ProjectData = {
	id: string
	userId: string
	projectName: string
	projectDescription: string
	projectUrl: string
	imagePath: string
	createdAt: number
	totalVisits?: number
}

export async function getProjects(profileId: string) {
	const snapshot = await DB.collection('projects')
		.doc(profileId)
		.collection('projects')
		.get()

	return snapshot.docs.map((docs) => docs.data()) as ProjectData[]
}
