import { cn } from '@/utils/tailwind-cn'

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
	focusAccent?: boolean
	ref?: React.RefObject<HTMLInputElement | null>
}

export function Input({ focusAccent = false, ...props }: Props) {
	return (
		<input
			{...props}
			className={cn(
				'bg-background-secondary min-h-12 w-full rounded-xl border border-transparent px-4 py-3 text-base text-white outline-hidden transition-colors',
				'placeholder:text-input-placeholder',
				'hover:border-input-border-hover',
				'disabled:pointer-events-none disabled:opacity-50',
				focusAccent
					? 'focus:border-accent-purple focus:ring-accent-purple/50 focus:ring-4'
					: 'focus:border-input-border-focus focus:ring-4 focus:ring-white/10',
				props.className,
			)}
		/>
	)
}
