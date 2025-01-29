'use client'

import { Loader, Settings, X } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import { startTransition, useState } from 'react'

import { createCustomLinks } from '@/app/actions/create-custom-links'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Modal } from '@/components/ui/modal'
import { Text } from '@/components/ui/text'
import type { ProfileData } from '@/http/get-profile'

type Props = Pick<ProfileData, 'customLinks'>

export function ModalCustomLinks({ customLinks }: Props) {
	const [open, setOpen] = useState(false)
	const [isSubmitting, setIsSubmitting] = useState(false)

	const [link1, setLink1] = useState(
		customLinks?.link1 ?? {
			title: '',
			url: '',
		},
	)

	const [link2, setLink2] = useState(
		customLinks?.link2 ?? {
			title: '',
			url: '',
		},
	)

	const [link3, setLink3] = useState(
		customLinks?.link3 ?? {
			title: '',
			url: '',
		},
	)

	const router = useRouter()
	const { pageSlug } = useParams()

	function handleToggleModal() {
		setOpen((prev) => !prev)
	}

	async function handleEditLinks() {
		setIsSubmitting(true)

		if (!pageSlug) return

		await createCustomLinks({
			pageSlug: String(pageSlug),
			link1,
			link2,
			link3,
		})

		startTransition(() => {
			setIsSubmitting(false)

			handleToggleModal()

			router.refresh()
		})
	}

	return (
		<>
			<Button
				variant="secondary"
				onClick={handleEditLinks}
				aria-label="Adicionar link"
				className="w-full"
			>
				<Settings />
				Configurar links
			</Button>

			<Modal open={open} onHide={handleToggleModal}>
				<div className="flex items-center justify-between gap-4">
					<Text as="h5" variant="heading-sm">
						Adicionar links personalizados
					</Text>

					<Button
						size="sm"
						variant="ghost"
						onClick={handleToggleModal}
						aria-label="fechar"
						icon
					>
						<X />
					</Button>
				</div>

				<div className="flex flex-col gap-4">
					<div className="flex items-center gap-2">
						<div className="flex flex-col gap-1">
							<Text as="label" variant="label">
								Título do link:
							</Text>
							<Input
								placeholder="Informe um nome"
								value={link1.title}
								onChange={(e) =>
									setLink1((prev) => ({ ...prev, title: e.target.value }))
								}
							/>
						</div>

						<div className="flex flex-grow flex-col gap-1">
							<Text as="label" variant="label">
								URL:
							</Text>
							<Input
								placeholder="Informe um link"
								type="url"
								value={link1.url}
								onChange={(e) =>
									setLink1((prev) => ({ ...prev, url: e.target.value }))
								}
							/>
						</div>
					</div>

					<div className="flex items-center gap-2">
						<div className="flex flex-col gap-1">
							<Text as="label" variant="label" hidden>
								Título do link:
							</Text>
							<Input
								placeholder="Informe um nome"
								value={link2.title}
								onChange={(e) =>
									setLink2((prev) => ({ ...prev, title: e.target.value }))
								}
							/>
						</div>

						<div className="flex flex-grow flex-col gap-1">
							<Text as="label" variant="label" hidden>
								URL:
							</Text>
							<Input
								placeholder="Informe um link"
								type="url"
								value={link2.url}
								onChange={(e) =>
									setLink2((prev) => ({ ...prev, url: e.target.value }))
								}
							/>
						</div>
					</div>

					<div className="flex items-center gap-2">
						<div className="flex flex-col gap-1">
							<Text as="label" variant="label" hidden>
								Título do link:
							</Text>
							<Input
								placeholder="Informe um nome"
								value={link3.title}
								onChange={(e) =>
									setLink3((prev) => ({ ...prev, title: e.target.value }))
								}
							/>
						</div>

						<div className="flex flex-grow flex-col gap-1">
							<Text as="label" variant="label" hidden>
								URL:
							</Text>
							<Input
								placeholder="Informe um link"
								type="url"
								value={link3.url}
								onChange={(e) =>
									setLink3((prev) => ({ ...prev, url: e.target.value }))
								}
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
						onClick={handleEditLinks}
						className="min-w-40"
					>
						{isSubmitting ? (
							<Loader size={20} className="animate-spin" />
						) : (
							'Salvar links'
						)}
					</Button>
				</div>
			</Modal>
		</>
	)
}
