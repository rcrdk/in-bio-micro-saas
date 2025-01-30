import Image from 'next/image'

import demoProject1 from '@/assets/demo-project-1.png'
import demoProject2 from '@/assets/demo-project-2.png'

type Props = {
	variant?: '1' | '2'
}

export function ProjectCardDemo({ variant = '1' }: Props) {
	return (
		<div className="focus-themed bg-card-background hover:border-card-border flex w-[340px] gap-5 rounded-2xl border border-transparent p-3 transition-colors">
			<div className="bg-image-background flex size-24 shrink-0 overflow-hidden rounded-md">
				<Image
					src={variant === '1' ? demoProject1 : demoProject2}
					width={460}
					height={460}
					alt=""
					className="size-full object-cover"
				/>
			</div>

			<div className="flex flex-col gap-2">
				<span className="text-accent-green text-xs font-bold uppercase">
					{variant === '1' ? '15 cliques' : '3 cliques'}
				</span>

				<div className="flex flex-col gap-1">
					<span className="font-bold text-white">
						{variant === '1' ? 'BugTracer' : 'CodeLink'}
					</span>

					<span className="text-content-body text-sm">
						{variant === '1'
							? 'Rastreador simples de bugs.'
							: 'Integração de GitHub e GitLab.'}
					</span>
				</div>
			</div>
		</div>
	)
}
