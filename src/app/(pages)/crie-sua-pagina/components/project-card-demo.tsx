import Image from 'next/image'

import demoProject1 from '@/assets/demo-project-1.png'
import demoProject2 from '@/assets/demo-project-2.png'

type Props = {
	variant?: '1' | '2'
}

export function ProjectCardDemo({ variant = '1' }: Props) {
	return (
		<div className="focus-themed flex w-[340px] gap-5 rounded-2xl border border-transparent bg-card-background p-3 transition-colors hover:border-card-border">
			<div className="flex size-24 flex-shrink-0 overflow-hidden rounded-md bg-image-background">
				<Image
					src={variant === '1' ? demoProject1 : demoProject2}
					width={460}
					height={460}
					alt=""
					className="size-full object-cover"
				/>
			</div>

			<div className="flex flex-col gap-2">
				<span className="text-xs font-bold uppercase text-accent-green">
					{variant === '1' ? '15 cliques' : '3 cliques'}
				</span>

				<div className="flex flex-col gap-1">
					<span className="font-bold text-white">
						{variant === '1' ? 'BugTracer' : 'CodeLink'}
					</span>

					<span className="text-sm text-content-body">
						{variant === '1'
							? 'Rastreador simples de bugs.'
							: 'Integração de GitHub e GitLab.'}
					</span>
				</div>
			</div>
		</div>
	)
}
