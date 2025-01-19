import Image from 'next/image'

export function ProjectCard() {
	return (
		<div className="flex w-[340px] gap-5 rounded-2xl border border-transparent bg-background-secondary p-3 hover:border-border-secondary">
			<div className="size-24 flex-shrink-0 overflow-hidden rounded-md">
				<Image
					src="https://github.com/rcrdk.png"
					width={460}
					height={460}
					alt=""
					className="size-full object-cover"
				/>
			</div>

			<div className="flex flex-col gap-2">
				<span className="text-xs font-bold uppercase text-accent-green">
					10 cliques
				</span>

				<div className="flex flex-col">
					<span className="font-bold text-white">Projeto 1</span>
					<span className="text-sm text-content-body">
						Lorem ipsum dolor sit amet.
					</span>
				</div>
			</div>
		</div>
	)
}
