import { cn } from '@/utils/tailwind-cn'

type Props = React.InputHTMLAttributes<HTMLInputElement>

export function Input(props: Props) {
	return (
		<input
			{...props}
			className={cn(
				'min-h-12 w-full rounded-xl border border-transparent bg-background-secondary px-4 py-3 text-base text-white outline-none transition-colors',
				'placeholder:text-input-placeholder',
				'hover:border-input-border-hover',
				'focus:border-input-border-focus focus:ring-4 focus:ring-white/10',
				props.className,
			)}
		/>
	)
}
