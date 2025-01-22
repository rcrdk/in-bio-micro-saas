import { Github, Instagram, Linkedin, Twitter, User } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

import placeholderUserPicture from '@/assets/demo-user.jpg'
import { EditCustomLinks } from '@/components/common/user-card/edit-custom-links'
import { EditSocialLinks } from '@/components/common/user-card/edit-social-links'
import { EditUserCard } from '@/components/common/user-card/edit-user-card'
import { Button } from '@/components/ui/button'
import { Text } from '@/components/ui/text'
import type { ProfileData, ProfileSocialMedia } from '@/http/get-profile'
import { auth } from '@/lib/auth'
import { getDownloadUrlFromPath } from '@/lib/firebase'
import { httpUrlParser } from '@/utils/http-url-parser'
import { cn } from '@/utils/tailwind-cn'

type Props = {
	data: ProfileData
	isOwner: boolean
	demo?: boolean
}

export async function UserCard({ data, isOwner, demo = false }: Props) {
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
		(demo ? placeholderUserPicture : undefined) ??
		(await getDownloadUrlFromPath(data.imagePath)) ??
		session?.user?.image ??
		null

	const shouldDisplayCustomLinks = customLinks.length || isOwner
	const shouldDisplaySocialMediaLinks = socialMedia.length || isOwner

	return (
		<div
			className={cn(
				'border-card-border flex w-[348px] flex-col items-center gap-5 rounded-3xl border p-5 text-white',
				demo ? 'bg-card-background/85 backdrop-blur-sm' : 'bg-card-background',
			)}
		>
			<div className="bg-image-background relative flex size-48 items-center justify-center rounded-full">
				{currentProfilePicture ? (
					<Image
						src={demo ? placeholderUserPicture : currentProfilePicture}
						width={460}
						height={460}
						alt=""
						className="size-full rounded-full object-cover"
					/>
				) : (
					<User className="size-16 opacity-30" />
				)}

				{isOwner && !demo && (
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
						<div className="from-card-background via-card-border to-card-background h-px bg-gradient-to-r" />

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
											tabIndex={demo ? -1 : undefined}
											icon
										>
											{icon}
										</Button>
									)
								})}

								{isOwner && !demo && (
									<EditSocialLinks socialMedia={data.socialMedia} />
								)}
							</div>
						</div>
					</>
				)}

				{shouldDisplayCustomLinks && (
					<>
						<div className="from-card-background via-card-border to-card-background h-px bg-gradient-to-r" />

						<div className="flex w-full flex-col">
							<div className="flex w-full flex-col items-center gap-3">
								{customLinks.map(({ title, url }, index) => (
									<Button
										as={Link}
										href={httpUrlParser(url)}
										className="w-full"
										key={index}
										tabIndex={demo ? -1 : undefined}
									>
										{title}
									</Button>
								))}

								{isOwner && !demo && (
									<EditCustomLinks customLinks={data.customLinks} />
								)}
							</div>
						</div>
					</>
				)}

				{demo && <div className="h-4" />}
			</div>
		</div>
	)
}
