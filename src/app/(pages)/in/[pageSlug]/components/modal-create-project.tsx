'use client'

import { ImageIcon, Plus, Upload } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { startTransition, useState } from 'react'

import { createProject } from '@/app/actions/create-project'
import { Dialog } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Text } from '@/components/ui/text'
import { Textarea } from '@/components/ui/textarea'
import { compressFiles } from '@/utils/compress-files'

type Props = {
	pageSlug: string
}

export function ModalCreateProject({ pageSlug }: Props) {
	const [open, setOpen] = useState(false)
	const [isSubmitting, setIsSubmitting] = useState(false)

	const [projectName, setProjectName] = useState('')
	const [projectDescription, setProjectDescription] = useState('')
	const [projectUrl, setProjectUrl] = useState('')
	const [projectImage, setProjectImage] = useState<string | null>(null)

	const router = useRouter()

	function handleToggleModal() {
		setOpen((prev) => !prev)
	}

	function handleImageInput(e: React.ChangeEvent<HTMLInputElement>) {
		const file = e.target.files?.[0] ?? null

		if (file) {
			const imageValue = URL.createObjectURL(file)
			setProjectImage(imageValue)
		} else {
			setProjectImage(null)
		}
	}

	async function handleCreateProject() {
		setIsSubmitting(true)

		const imageInput = document.getElementById('imageInput') as HTMLInputElement

		if (!imageInput.files?.length) return

		const compressedFile = await compressFiles(Array.from(imageInput.files))

		const formData = new FormData()

		formData.append('file', compressedFile[0])
		formData.append('pageSlug', pageSlug)
		formData.append('name', projectName)
		formData.append('url', projectUrl)
		formData.append('description', projectDescription)

		await createProject(formData)

		startTransition(() => {
			setIsSubmitting(false)

			handleToggleModal()

			setProjectName('')
			setProjectDescription('')
			setProjectUrl('')
			setProjectImage(null)

			router.refresh()
		})
	}

	return (
		<>
			<button
				className="focus-themed border-button-ghost bg-card-background hover:border-card-border flex min-h-[130px] grow cursor-pointer items-center justify-center gap-5 rounded-2xl border border-dashed p-3 transition-colors"
				onClick={handleToggleModal}
			>
				<Plus className="text-accent-green size-7" />
				<span className="font-medium">Novo projeto</span>
			</button>

			<Dialog
				title="Novo projeto"
				description="Mostre um trabalho importante."
				submmitButton={{
					label: 'Adicionar projeto',
					loading: isSubmitting,
					onClick: () => handleCreateProject,
					// onClick: () => {}, // myFormRef.requestSubmit()
				}}
				open={open}
				onOpenChange={handleToggleModal}
			>
				<div className="flex gap-8">
					<div className="flex flex-col items-center gap-3 text-sm">
						<div className="bg-image-background size-36 shrink-0 overflow-hidden rounded-xl">
							{projectImage ? (
								<Image
									src={projectImage}
									width={500}
									height={500}
									className="size-full object-cover"
									alt=""
								/>
							) : (
								<label
									className="flex size-full cursor-pointer items-center justify-center"
									htmlFor="imageInput"
								>
									<ImageIcon className="size-10 opacity-30" />
								</label>
							)}
						</div>

						<label
							className="flex cursor-pointer items-center gap-1 text-white"
							htmlFor="imageInput"
						>
							<Upload className="size-3" />
							<span>{projectImage ? 'Alterar' : 'Adicionar'} imagem</span>
						</label>

						<input
							type="file"
							id="imageInput"
							accept="image/*"
							className="hidden"
							onChange={handleImageInput}
						/>
					</div>

					<div className="flex grow flex-col gap-4">
						<div className="flex flex-col gap-1">
							<Text as="label" variant="label" htmlFor="projectName">
								Nome do projeto:
							</Text>

							<Input
								placeholder="Digite o nome do projeto"
								id="projectName"
								value={projectName}
								onChange={(e) => setProjectName(e.target.value)}
							/>
						</div>

						<div className="flex flex-col gap-1">
							<Text as="label" variant="label" htmlFor="projectUrl">
								Link do projeto:
							</Text>

							<Input
								type="url"
								placeholder="Digite o link do projeto"
								id="projectUrl"
								value={projectUrl}
								onChange={(e) => setProjectUrl(e.target.value)}
							/>
						</div>

						<div className="flex flex-col gap-1">
							<Text as="label" variant="label" htmlFor="projectDescription">
								Descrição do projeto:
							</Text>

							<Textarea
								placeholder="Dê uma breve descrição do seu projeto"
								id="projectDescription"
								rows={3}
								value={projectDescription}
								onChange={(e) => setProjectDescription(e.target.value)}
							/>
						</div>
					</div>
				</div>
			</Dialog>
		</>
	)
}
