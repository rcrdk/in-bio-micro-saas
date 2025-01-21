'use client'

import { Plus, Upload, X } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { startTransition, useState } from 'react'

import { createProject } from '@/app/actions/create-project'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Modal } from '@/components/ui/modal'
import { Text } from '@/components/ui/text'
import { Textarea } from '@/components/ui/textarea'
import { compressFiles } from '@/utils/compress-files'

type Props = {
	profileId: string
}

export function NewProject({ profileId }: Props) {
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
		formData.append('profileId', profileId)
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
				className="flex h-[122px] w-[340px] items-center justify-center gap-5 rounded-2xl border border-dashed border-border-primary bg-background-secondary p-3 hover:border-border-secondary"
				onClick={handleToggleModal}
			>
				<Plus className="size-10 text-accent-purple" />
				<span>Novo projeto</span>
			</button>

			<Modal open={open} onHide={handleToggleModal}>
				<div className="flex items-center justify-between">
					<Text as="h5" variant="heading-sm">
						Criar projeto
					</Text>

					<Button variant="ghost" onClick={handleToggleModal}>
						<X />
					</Button>
				</div>

				<div className="flex gap-8">
					<div className="flex flex-col items-center gap-3 text-xs">
						<div className="size-[100px] overflow-hidden rounded-xl bg-background-tertiary">
							{projectImage ? (
								// eslint-disable-next-line @next/next/no-img-element
								<img
									src={projectImage}
									className="size-full object-cover"
									alt=""
								/>
							) : (
								<label
									className="flex size-full cursor-pointer items-center justify-center"
									htmlFor="imageInput"
								>
									100 x 100
								</label>
							)}
						</div>

						<label
							className="flex cursor-pointer items-center gap-1 text-white"
							htmlFor="imageInput"
						>
							<Upload className="size-4" />
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

					<div className="flex flex-grow flex-col gap-4">
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

						<div className="flex items-center justify-end">
							<Button variant="ghost" type="button" onClick={handleToggleModal}>
								Cancelar
							</Button>

							<Button disabled={isSubmitting} onClick={handleCreateProject}>
								Adicionar projeto
							</Button>
						</div>
					</div>
				</div>
			</Modal>
		</>
	)
}
