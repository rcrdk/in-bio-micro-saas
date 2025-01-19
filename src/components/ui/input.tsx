import { cn } from '@/utils/tailwind-merge'

type Props = React.InputHTMLAttributes<HTMLInputElement>

export function Input(props: Props) {
	return (
		<input
			{...props}
			className={cn(
				'w-full rounded-xl border border-transparent bg-background-secondary px-4 py-2 text-white outline-none',
				'placeholder:text-content-placeholder',
				'hover:border-border-secondary hover:text-content-body',
				'focus:border-border-tertiary',
				props.className,
			)}
		/>
	)
}
