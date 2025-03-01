/* eslint-disable prettier/prettier */
import {
	Facebook,
	Github,
	Instagram,
	Linkedin,
	Twitter,
	User,
	Youtube,
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

import { ModalPageCustomLinksForm } from '@/app/(pages)/in/[pageSlug]/components/modal-page-custom-links-form'
import { ModalPageInformationForm } from '@/app/(pages)/in/[pageSlug]/components/modal-page-information-form'
import { ModalPageSocialLinksForm } from '@/app/(pages)/in/[pageSlug]/components/modal-page-social-links-form'
import { ShareButton } from '@/app/(pages)/in/[pageSlug]/components/share-button'
import { Button } from '@/components/ui/button'
import { Text } from '@/components/ui/text'
import type { PageDTO, PageSocialMediaLinks } from '@/dtos/page'
import { getDownloadUrlFromPath } from '@/lib/firebase'
import { httpUrlParser } from '@/utils/http-url-parser'

type SocialMediaEntries = Array<[keyof PageSocialMediaLinks, string]>

type Props = {
	data: PageDTO
	isOwner: boolean
}

export async function UserCard({ data, isOwner }: Props) {
	const customLinks = Object.values(data.customLinks).filter(({ title, url }) => title && url)
	const socialMedia = (Object.entries(data.socialMedia) as SocialMediaEntries).filter(([, value]) => value)

	function renderSocialNetwork(socialNetwork: keyof PageSocialMediaLinks) {
		switch (socialNetwork) {
			case 'github':
				return { icon: <Github />, url: 'https://github.com' }
			case 'linkedin':
				return { icon: <Linkedin />, url: 'https://linkedin.com/in' }
			case 'twitter':
				return { icon: <Twitter />, url: 'https://x.com' }
			case 'instagram':
				return { icon: <Instagram />, url: 'https://instagram.com' }
			case 'youtube':
				return { icon: <Youtube />, url: 'https://youtube.com' }
			case 'facebook':
				return { icon: <Facebook />, url: 'https://facebook.com' }
		}
	}

	const currentPageAvatar = await getDownloadUrlFromPath(data.imagePath)

	const shouldDisplayCustomLinks = customLinks.length || isOwner
	const shouldDisplaySocialMediaLinks = socialMedia.length || isOwner

	return (
		<div className="border-card-border bg-card-background flex w-full flex-col items-center gap-5 rounded-3xl border p-5 text-white sm:w-[348px] sm:max-w-[348px]">
			<div className="bg-image-background relative flex size-48 items-center justify-center rounded-full select-none">
				{currentPageAvatar ? (
					<Image
						src={currentPageAvatar}
						width={460}
						height={460}
						alt=""
						className="size-full rounded-full object-cover"
					/>
				) : (
					<User className="size-16 opacity-30" />
				)}

				{isOwner && (
					<ModalPageInformationForm
						initialData={data}
						currentAvatar={currentPageAvatar}
					/>
				)}
			</div>

			<div className="flex w-full flex-col gap-5">
				<div className="flex flex-col gap-2">
					{data.name && (
						<Text variant="card-title" as="h3">
							{data.name}
						</Text>
					)}

					{data.description && (
						<Text className="text-white opacity-40">{data.description}</Text>
					)}
				</div>

				{shouldDisplaySocialMediaLinks && (
					<>
						<div className="from-card-background via-card-border to-card-background h-px bg-linear-to-r" />

						<div className="flex flex-col gap-2">
							<Text
								as="span"
								variant="body-sm"
								className="font-medium uppercase select-none"
							>
								Redes sociais
							</Text>

							<div className="flex flex-wrap gap-2">
								{socialMedia.map(([network, slug]) => {
									const { icon, url } = renderSocialNetwork(network)

									return (
										<Button
											as={Link}
											variant="secondary"
											href={`${url}/${slug}`}
											target="_blank"
											key={network}
											icon
										>
											{icon}
										</Button>
									)
								})}

								{isOwner && (
									<ModalPageSocialLinksForm socialMedia={data.socialMedia} />
								)}
							</div>
						</div>
					</>
				)}

				{shouldDisplayCustomLinks && (
					<>
						<div className="from-card-background via-card-border to-card-background h-px bg-linear-to-r" />

						<div className="flex w-full flex-col">
							<div className="flex w-full flex-col items-center gap-3">
								{customLinks.map(({ title, url }, index) => (
									<Button
										as={Link}
										variant={index === 0 ? 'primary' : 'secondary'}
										href={httpUrlParser(url)}
										className="w-full"
										key={index}
									>
										{title}
									</Button>
								))}

								{isOwner && (
									<ModalPageCustomLinksForm customLinks={data.customLinks} />
								)}
							</div>
						</div>
					</>
				)}

				{isOwner && <ShareButton mode="user-card" pageSlug={data.slug} />}
			</div>
		</div>
	)
}
