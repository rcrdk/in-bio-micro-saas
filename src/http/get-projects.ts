import 'server-only'

import { DB } from '@/lib/firebase'

export type ProjectData = {
	id: string
	userId: string
	projectName: string
	projectDescription: string
	projectUrl: string
	imagePath: string
	totalClicks: number
	createdAt: number
	updatedAt: number
}

export async function getProjects(slug: string) {
	const snapshot = await DB.collection('profiles')
		.doc(slug)
		.collection('projects')
		.get()

	return snapshot.docs.map((docs) => docs.data()) as ProjectData[]
}
