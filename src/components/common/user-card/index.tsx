import { Github, Instagram, Linkedin, Plus, Twitter } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

import { EditSocialLinks } from '@/components/common/user-card/edit-social-links'
import { Button } from '@/components/ui/button'
import { Text } from '@/components/ui/text'
import type { ProfileData } from '@/http/get-profile'

type Props = {
	data: ProfileData
}

export function UserCard({ data }: Props) {
	return (
		<div className="flex w-[348px] flex-col items-center gap-5 rounded-3xl border border-white border-opacity-10 bg-background-card p-5 text-white">
			<div className="size-48">
				<Image
					src="https://github.com/rcrdk.png"
					width={460}
					height={460}
					alt=""
					className="size-full rounded-full object-cover"
				/>
			</div>

			<div className="flex w-full flex-col gap-5">
				<div className="flex flex-col gap-2">
					<Text variant="card-title" as="h3">
						Ricardo Dev
					</Text>

					<Text className="text-white opacity-40">
						Eu crio produtos para a internet
					</Text>
				</div>

				<div className="mx-4 h-px bg-background-card-divider" />

				<div className="flex flex-col gap-2">
					<Text as="span" variant="body-sm" className="font-medium uppercase">
						Links
					</Text>

					<div className="flex flex-wrap gap-2">
						{data.socialMedia?.github && (
							<Link
								href={`https://github.com/${data.socialMedia.github}`}
								target="_blank"
								className="rounded-xl bg-background-card-button p-3 transition-colors hover:bg-background-card-button-hover"
							>
								<Github />
							</Link>
						)}

						{data.socialMedia?.linkedin && (
							<Link
								href={`https://linkedin.com/in/${data.socialMedia.linkedin}}`}
								target="_blank"
								className="rounded-xl bg-background-card-button p-3 transition-colors hover:bg-background-card-button-hover"
							>
								<Linkedin />
							</Link>
						)}

						{data.socialMedia?.twitter && (
							<Link
								href={`https://x.com/${data.socialMedia.twitter}`}
								target="_blank"
								className="rounded-xl bg-background-card-button p-3 transition-colors hover:bg-background-card-button-hover"
							>
								<Twitter />
							</Link>
						)}

						{data.socialMedia?.instagram && (
							<Link
								href={`https://instagram.com/${data.socialMedia.instagram}`}
								target="_blank"
								className="rounded-xl bg-background-card-button p-3 transition-colors hover:bg-background-card-button-hover"
							>
								<Instagram />
							</Link>
						)}

						<EditSocialLinks socialMedia={data.socialMedia} />
					</div>
				</div>

				<div className="mx-4 h-px bg-background-card-divider" />

				<div className="flex w-full flex-col">
					<div className="flex w-full flex-col items-center gap-3">
						<Button className="w-full">Confira meu template SaaS</Button>

						<button className="rounded-xl bg-background-card-button p-3 hover:bg-background-card-button-hover">
							<Plus />
						</button>
					</div>
				</div>
			</div>
		</div>
	)
}
