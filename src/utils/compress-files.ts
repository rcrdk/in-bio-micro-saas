import type { Options } from 'browser-image-compression'
import imageCompression from 'browser-image-compression'

export function compressImage(file: File): Promise<File> {
	return new Promise((resolve) => {
		const options: Options = {
			maxSizeMB: 0.2,
			maxWidthOrHeight: 900,
			useWebWorker: true,
			fileType: 'image/png',
		}

		imageCompression(file, options).then((compressedFile) =>
			resolve(compressedFile),
		)
	})
}

export async function compressFiles(files: File[]) {
	const compressPromises = files.map(async (file) => {
		try {
			return await compressImage(file)
		} catch (error) {
			return null
		}
	})

	return (await Promise.all(compressPromises)).filter((file) => file != null)
}
