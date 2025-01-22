import { Github, Instagram, Linkedin, Twitter, User } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

import { EditCustomLinks } from '@/components/common/user-card/edit-custom-links'
import { EditSocialLinks } from '@/components/common/user-card/edit-social-links'
import { EditUserCard } from '@/components/common/user-card/edit-user-card'
import { Button } from '@/components/ui/button'
import { Text } from '@/components/ui/text'
import type { ProfileData, ProfileSocialMedia } from '@/http/get-profile'
import { auth } from '@/lib/auth'
import { getDownloadUrlFromPath } from '@/lib/firebase'
import { httpUrlParser } from '@/utils/http-url-parser'

type Props = {
	data: ProfileData
	isOwner: boolean
}

export async function UserCard({ data, isOwner }: Props) {
	const session = await auth()

	// eslint-disable-next-line prettier/prettier
	const customLinks = data.customLinks && Object.values(data.customLinks).filter(({ title, url }) => title && url)
	// eslint-disable-next-line prettier/prettier
	const socialMedia = data.socialMedia && Object.entries(data.socialMedia).filter(([, value]) => value) as [ProfileSocialMedia, string][]

	function renderSocialNetwork(socialNetwork: ProfileSocialMedia) {
		switch (socialNetwork) {
			case 'github':
				return { icon: <Github />, url: 'https://github.com' }
			case 'linkedin':
				return { icon: <Linkedin />, url: 'https://linkedin.com/in' }
			case 'twitter':
				return { icon: <Twitter />, url: 'https://x.com' }
			case 'instagram':
				return { icon: <Instagram />, url: 'https://instagram.com' }
		}
	}

	const currentProfilePicture =
		(await getDownloadUrlFromPath(data.imagePath)) ??
		session?.user?.image ??
		null

	const shouldDisplayCustomLinks = customLinks.length || isOwner
	const shouldDisplaySocialMediaLinks = socialMedia.length || isOwner

	return (
		<div className="flex w-[348px] flex-col items-center gap-5 rounded-3xl border border-card-border bg-card-background p-5 text-white">
			<div className="relative flex size-48 items-center justify-center rounded-full bg-image-background">
				{currentProfilePicture ? (
					<Image
						src={currentProfilePicture}
						width={460}
						height={460}
						alt=""
						className="size-full rounded-full object-cover"
					/>
				) : (
					<User className="size-16 opacity-30" />
				)}

				{isOwner && (
					<EditUserCard
						initialData={data}
						currentProfilePicture={currentProfilePicture}
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
						<div className="h-px bg-gradient-to-r from-card-background via-card-border to-card-background" />

						<div className="flex flex-col gap-2">
							<Text
								as="span"
								variant="body-sm"
								className="font-medium uppercase"
							>
								Links
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

								{isOwner && <EditSocialLinks socialMedia={data.socialMedia} />}
							</div>
						</div>
					</>
				)}

				{shouldDisplayCustomLinks && (
					<>
						<div className="h-px bg-gradient-to-r from-card-background via-card-border to-card-background" />

						<div className="flex w-full flex-col">
							<div className="flex w-full flex-col items-center gap-3">
								{customLinks.map(({ title, url }, index) => (
									<Button
										as={Link}
										href={httpUrlParser(url)}
										className="w-full"
										key={index}
									>
										{title}
									</Button>
								))}

								{isOwner && <EditCustomLinks customLinks={data.customLinks} />}
							</div>
						</div>
					</>
				)}
			</div>
		</div>
	)
}
