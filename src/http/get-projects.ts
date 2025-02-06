import 'server-only'

import { unstable_cache as cache } from 'next/cache'

import type { ProjectDTO } from '@/dtos/projects'
import { DB } from '@/lib/firebase'

async function getProjectsFn(slug: string) {
	const snapshot = await DB.collection('pages')
		.doc(slug)
		.collection('projects')
		.orderBy('createdAt', 'desc')
		.get()

	return snapshot.docs.map((docs) => docs.data()) as ProjectDTO[]
}

export async function getProjects(slug: string) {
	return cache(() => getProjectsFn(slug), [`get-projects-${slug}`], {
		tags: ['get-projects', `get-projects-${slug}`],
		revalidate: 60 * 60 * 12, // half-day
	})()
}
