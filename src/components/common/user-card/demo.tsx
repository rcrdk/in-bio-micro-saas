import { Github, Instagram, Linkedin, Twitter } from 'lucide-react'
import Image from 'next/image'

import placeholderUserPicture from '@/assets/demo-user.jpg'
import { Button } from '@/components/ui/button'
import { Text } from '@/components/ui/text'

export function UserCardDemo() {
	return (
		<div className="flex w-[348px] flex-col items-center gap-5 rounded-3xl border border-card-border bg-card-background/85 p-5 text-white backdrop-blur-sm">
			<div className="relative flex size-48 items-center justify-center rounded-full bg-image-background">
				<Image
					src={placeholderUserPicture}
					width={460}
					height={460}
					alt=""
					className="size-full rounded-full object-cover"
				/>
			</div>

			<div className="flex w-full flex-col gap-5">
				<div className="flex flex-col gap-2">
					<Text variant="card-title" as="h3">
						John Doe
					</Text>

					<Text className="text-white opacity-40">
						Eu crio produtos para a internet
					</Text>
				</div>

				<div className="h-px bg-gradient-to-r from-card-background via-card-border to-card-background" />

				<div className="flex flex-col gap-2">
					<Text as="span" variant="body-sm" className="font-medium uppercase">
						Links
					</Text>

					<div className="flex flex-wrap gap-2">
						<Button as="div" variant="secondary" icon>
							<Github />
						</Button>
						<Button as="div" variant="secondary" icon>
							<Linkedin />
						</Button>
						<Button as="div" variant="secondary" icon>
							<Twitter />
						</Button>
						<Button as="div" variant="secondary" icon>
							<Instagram />
						</Button>
					</div>
				</div>

				<div className="h-px bg-gradient-to-r from-card-background via-card-border to-card-background" />

				<div className="flex w-full flex-col">
					<div className="flex w-full flex-col items-center gap-3">
						<Button as="div" className="w-full">
							Confira meu template SaaS
						</Button>
					</div>
				</div>

				<div className="h-4" />
			</div>
		</div>
	)
}
