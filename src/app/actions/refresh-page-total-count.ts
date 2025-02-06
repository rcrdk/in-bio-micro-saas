'use server'

import { revalidateTag } from 'next/cache'

export async function refreshPageVisitsCounterAction(slug: string) {
	revalidateTag(`get-page-by-slug-${slug}`)
	revalidateTag(`get-projects-${slug}`)
}
