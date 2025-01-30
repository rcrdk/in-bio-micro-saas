import { ImageIcon, Upload, User } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'

type Props = {
	mode: 'project' | 'user'
	currentImage?: string
}

export function FormImage({ mode, currentImage }: Props) {
	const [selectedImage, setSelectedImage] = useState<string | null>(null)

	async function handleImageInput(e: React.ChangeEvent<HTMLInputElement>) {
		const file = e.target.files?.[0]

		if (file) {
			const render = new FileReader()
			render.readAsDataURL(file)

			render.onload = () => {
				const output = render.result?.toString() ?? null
				setSelectedImage(output)
			}
		} else {
			setSelectedImage(null)
		}
	}

	return (
		<div className="flex flex-col items-center gap-3">
			<label
				htmlFor="formFileInput"
				className="bg-image-background border-border-primary hover:border-border-secondary flex size-40 shrink-0 cursor-pointer overflow-hidden rounded-full border transition-colors"
			>
				{selectedImage && (
					<Image
						src={selectedImage}
						width={500}
						height={500}
						alt=""
						className="size-full object-cover object-center"
					/>
				)}

				{!selectedImage && currentImage && (
					<Image
						src={currentImage}
						width={500}
						height={500}
						alt=""
						className="size-full object-cover object-center"
					/>
				)}

				{!selectedImage && !currentImage && (
					<span className="flex size-full items-center justify-center">
						{mode === 'user' && <User className="size-10 opacity-30" />}
						{mode === 'project' && <ImageIcon className="size-10 opacity-30" />}
					</span>
				)}
			</label>

			<label
				className="flex cursor-pointer items-center gap-2 text-sm text-white hover:underline"
				htmlFor="formFileInput"
			>
				<Upload className="size-4" />
				{selectedImage || currentImage ? 'Alterar imagem' : 'Adicionar imagem'}
			</label>

			<input
				type="file"
				name="file"
				id="formFileInput"
				accept="image/*"
				onChange={handleImageInput}
				className="hidden"
			/>
		</div>
	)
}
