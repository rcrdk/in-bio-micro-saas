import { cn } from '@/utils/tailwind-cn'

type Props = React.TextareaHTMLAttributes<HTMLTextAreaElement>

export function Textarea(props: Props) {
	return (
		<textarea
			{...props}
			className={cn(
				'bg-background-secondary w-full resize-none rounded-xl border border-transparent px-4 py-3 text-white outline-hidden',
				'placeholder:text-content-placeholder',
				'hover:border-input-border-hover',
				'focus:border-input-border-focus focus:ring-4 focus:ring-white/10',
				'disabled:pointer-events-none disabled:opacity-50',
				props.className,
			)}
		/>
	)
}
