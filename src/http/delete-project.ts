import { DB, Storage } from '@/lib/firebase'

type DeleteProjectRequest = {
	slug: string
	projectId: string
}

export async function deleteProject({ slug, projectId }: DeleteProjectRequest) {
	const ref = DB.collection('pages').doc(slug).collection('projects').doc(projectId)

	const imagePath = (await ref.get()).data()?.imagePath

	if (imagePath) {
		const storageRef = Storage.file(imagePath)
		const currentStoragePathExists = await storageRef.exists()

		if (currentStoragePathExists) await storageRef.delete()
	}

	await ref.delete()
}
