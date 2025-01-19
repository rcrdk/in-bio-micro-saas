import { Play } from 'lucide-react'
import Image from 'next/image'

import videoThumbnail from '@/assets/video-thumbnail.jpg'
import { Container } from '@/components/ui/container'

export function VideoPresentation() {
	return (
		<Container>
			<div className="relative aspect-video overflow-hidden rounded-2xl border border-border-primary">
				<Play className="absolute left-1/2 top-1/2 size-28 -translate-x-1/2 -translate-y-1/2 text-white" />
				<Image
					src={videoThumbnail}
					width={1206}
					height={675}
					alt=""
					className="size-full object-cover"
				/>
			</div>
		</Container>
	)
}
