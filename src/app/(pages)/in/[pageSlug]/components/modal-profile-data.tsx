'use client'

import { Loader, Upload, User, UserPen, X } from 'lucide-react'
import type { StaticImageData } from 'next/image'
import Image from 'next/image'
import { useParams, useRouter } from 'next/navigation'
import { startTransition, useState } from 'react'

import { updateProfile } from '@/app/actions/update-profile-data'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Modal } from '@/components/ui/modal'
import { Text } from '@/components/ui/text'
import { Textarea } from '@/components/ui/textarea'
import type { ProfileData } from '@/http/get-profile'
import { compressFiles } from '@/utils/compress-files'

type Props = {
	initialData: Pick<ProfileData, 'name' | 'description' | 'imagePath'>
	currentProfilePicture: string | null | StaticImageData
}

export function ModalProfileData({
	initialData,
	currentProfilePicture,
}: Props) {
	const [open, setOpen] = useState(false)
	const [isSubmitting, setIsSubmitting] = useState(false)

	const [profileName, setProfileName] = useState(initialData.name ?? '')
	const [profileDescription, setProfileDescription] = useState(
		initialData.description ?? '',
	)
	const [profileImage, setProfileImage] = useState<string | null>(null)

	const router = useRouter()
	const { pageSlug } = useParams()

	function handleToggleModal() {
		setOpen((prev) => !prev)
	}

	function handleImageInput(e: React.ChangeEvent<HTMLInputElement>) {
		const file = e.target.files?.[0] ?? null

		if (file) {
			const imageValue = URL.createObjectURL(file)
			setProfileImage(imageValue)
		} else {
			setProfileImage(null)
		}
	}

	async function handleSaveProfile() {
		setIsSubmitting(true)

		if (!pageSlug) return

		const formData = new FormData()

		formData.append('pageSlug', String(pageSlug))
		formData.append('name', profileName)
		formData.append('description', profileDescription)

		const imageInput = document.getElementById(
			'profileImageInput',
		) as HTMLInputElement

		if (imageInput.files?.length) {
			const compressedFile = await compressFiles(Array.from(imageInput.files))
			formData.append('file', compressedFile[0])
		}

		await updateProfile(formData)

		startTransition(() => {
			setIsSubmitting(false)
			handleToggleModal()

			router.refresh()
		})
	}

	return (
		<>
			<div className="absolute right-0 top-0 rounded-full">
				<Button variant="secondary" onClick={handleToggleModal} icon="rounded">
					<UserPen />
				</Button>
			</div>

			<Modal open={open} onHide={handleToggleModal}>
				<div className="flex items-center justify-between gap-4">
					<Text as="h5" variant="heading-sm">
						Alterar informações do perfil
					</Text>

					<Button
						size="sm"
						variant="ghost"
						onClick={handleToggleModal}
						aria-label="Fechar"
						icon
					>
						<X />
					</Button>
				</div>

				<div className="flex gap-8">
					<div className="flex flex-col items-center gap-3 text-sm">
						<div className="flex size-40 flex-shrink-0 overflow-hidden rounded-full bg-image-background">
							{profileImage && (
								<Image
									src={profileImage}
									width={500}
									height={500}
									alt=""
									className="size-full object-cover object-center"
								/>
							)}

							{!profileImage && currentProfilePicture && (
								<Image
									src={currentProfilePicture}
									width={500}
									height={500}
									alt=""
									className="size-full object-cover object-center"
								/>
							)}

							{!profileImage && !currentProfilePicture && (
								<label
									className="flex size-full cursor-pointer items-center justify-center"
									htmlFor="profileImageInput"
								>
									<User className="size-10 opacity-30" />
								</label>
							)}
						</div>

						<label
							className="flex cursor-pointer items-center gap-1 text-white"
							htmlFor="profileImageInput"
						>
							<Upload className="size-3" />
							<span>{profileImage ? 'Alterar' : 'Adicionar'} imagem</span>
						</label>

						<input
							type="file"
							id="profileImageInput"
							accept="image/*"
							className="hidden"
							onChange={handleImageInput}
						/>
					</div>

					<div className="flex flex-grow flex-col gap-4">
						<div className="flex flex-col gap-1">
							<Text as="label" variant="label" htmlFor="name">
								Seu nome
							</Text>
							<Input
								placeholder="Informe seu nome"
								id="name"
								value={profileName}
								onChange={(e) => setProfileName(e.target.value)}
							/>
						</div>

						<div className="flex flex-col gap-1">
							<Text as="label" variant="label" htmlFor="description">
								Sua introdução
							</Text>

							<Textarea
								placeholder="Fale um pouco sobre você"
								id="description"
								value={profileDescription}
								onChange={(e) => setProfileDescription(e.target.value)}
								rows={2}
							/>
						</div>
					</div>
				</div>

				<div className="flex items-center justify-end gap-4">
					<Button variant="ghost" type="button" onClick={handleToggleModal}>
						Cancelar
					</Button>

					<Button
						disabled={isSubmitting}
						onClick={handleSaveProfile}
						className="min-w-52"
					>
						{isSubmitting ? (
							<Loader size={20} className="animate-spin" />
						) : (
							'Salvar informaçõoes'
						)}
					</Button>
				</div>
			</Modal>
		</>
	)
}
