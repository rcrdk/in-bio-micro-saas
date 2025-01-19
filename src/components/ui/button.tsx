/* eslint-disable prettier/prettier */
import { cn } from '@/utils/tailwind-merge'

type Props<T extends React.ElementType> = {
	as?: T
	variant?: 'primary' | 'secondary' | 'ghost'
}

export function Button<T extends React.ElementType = 'button'>({ as, variant = 'primary', ...props }: Props<T> & Omit<React.ComponentPropsWithoutRef<T>, keyof Props<T>>) {
	const Component = as || 'button'

	return (
		<Component
			{...props}
			className={cn(
				'flex items-center gap-4 justify-evenly text-center select-none whitespace-nowrap rounded-xl border py-2 px-4 font-bold text-white transition-all outline-none border-transparent',
				'hover:opacity-90',
				'active:scale-95 active:duration-75',
				'disabled:opacity-70 disabled:cursor-not-allowed',

				variant === 'primary' && 'bg-accent-purple hover:bg-accent-purple-darken',
				variant === 'secondary' && ' bg-background-tertiary hover:bg-background-card-button-hover',
				variant === 'ghost' && 'border-border-primary',
				props.className,
			)}
		/>
	)
}
