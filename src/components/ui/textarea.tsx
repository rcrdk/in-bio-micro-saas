import { cn } from '@/utils/tailwind-cn'

type Props = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
	error?: string[] | string
	ref?: React.RefObject<HTMLTextAreaElement | null>
}

export function Textarea(props: Props) {
	return (
		<textarea
			{...props}
			className={cn(
				'bg-background-secondary field-sizing-content w-full resize-none rounded-xl border border-transparent px-4 py-3 text-white outline-hidden',
				'placeholder:text-content-placeholder',
				'hover:border-input-border-hover',
				'focus:border-input-border-focus focus:ring-4 focus:ring-white/10',
				'disabled:pointer-events-none disabled:opacity-50',
				!!props.error &&
					'!border-red-500 selection:bg-red-500 selection:text-white placeholder:text-red-400/65 focus:ring-4 focus:ring-red-500/30',
				props.className,
			)}
		/>
	)
}
