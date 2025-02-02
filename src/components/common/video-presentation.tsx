import { Play } from 'lucide-react'
import Image from 'next/image'

import videoThumbnail from '@/assets/video-thumbnail.png'
import { Container } from '@/components/ui/container'

export function VideoPresentation() {
	return (
		<Container>
			<div className="-mx-3 sm:mx-0">
				<a
					href="https://www.youtube.com/watch?v=EDwb9jOVRtU"
					target="_blank"
					className="focus-accent group border-border-primary relative block aspect-video overflow-hidden rounded-2xl border select-none"
					aria-label="Assistir ao vídeo de apresentação"
				>
					<Play className="xs:size-20 pointer-events-none absolute top-1/2 left-1/2 z-10 size-16 -translate-x-1/2 -translate-y-1/2 text-white lg:size-28" />

					<Image
						src={videoThumbnail}
						width={1206}
						height={675}
						alt=""
						className="size-full object-cover opacity-75 transition-opacity group-hover:opacity-100"
					/>
				</a>
			</div>
		</Container>
	)
}
