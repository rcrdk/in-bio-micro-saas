import { Play } from 'lucide-react'
import Image from 'next/image'

import videoThumbnail from '@/assets/video-thumbnail.png'
import { Container } from '@/components/ui/container'

export function VideoPresentation() {
	return (
		<Container>
			<div className="group relative aspect-video overflow-hidden rounded-2xl border border-border-primary">
				<Play className="pointer-events-none absolute left-1/2 top-1/2 z-10 size-28 -translate-x-1/2 -translate-y-1/2 text-white" />
				<Image
					src={videoThumbnail}
					width={1206}
					height={675}
					alt=""
					className="size-full object-cover opacity-75 transition-opacity group-hover:opacity-100"
				/>
			</div>
		</Container>
	)
}
