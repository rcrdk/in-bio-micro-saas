/* eslint-disable prettier/prettier */
import { cn } from '@/utils/tailwind-cn'

type Props<T extends React.ElementType> = {
	as?: T
	variant?: 'primary' | 'secondary' | 'ghost'
	size?: 'sm' | 'md' | 'lg'
	icon?: boolean | 'rounded'
}

export function Button<T extends React.ElementType = 'button'>({ as, variant = 'primary', size = 'md', icon = false, ...props }: Props<T> & Omit<React.ComponentPropsWithoutRef<T>, keyof Props<T>>) {
	const Component = as || 'button'

	return (
		<Component
			{...props}
			className={cn(
				'flex flex-shrink-0 items-center gap-4 justify-center text-center select-none whitespace-nowrap rounded-xl border font-bold text-white transition-all outline-none border-transparent',
				'hover:opacity-90',
				'active:scale-95 active:duration-75',
				'disabled:opacity-50 disabled:pointer-events-none',

				variant === 'primary' && 'bg-accent-purple hover:bg-accent-purple-hover focus-visible:ring-4 focus-visible:ring-accent-purple/75 focus-visible:ring-offset-1 focus-visible:ring-offset-background-primary',
				variant === 'secondary' && ' bg-button-secondary hover:bg-button-secondary-hover focus-visible:ring-4 focus-visible:ring-button-secondary-focus focus-visible:ring-offset-[2px] focus-visible:ring-offset-background-primary',
				variant === 'ghost' && 'border-button-ghost hover:border-button-ghost-hover focus-visible:ring-4 focus-visible:ring-button-ghost-hover focus-visible:border-button-ghost-focus',

				size === 'sm' && !icon && 'px-4 h-10',
				size === 'md' && !icon && 'px-6 h-12',
				size === 'lg' && !icon && 'px-8 h-16 text-lg',

				size === 'sm' && icon && 'px-0 size-10',
				size === 'md' && icon && 'px-0 size-12',
				size === 'lg' && icon && 'px-0 size-16',

				icon === 'rounded' && 'rounded-full',

				props.className,
			)}
		/>
	)
}
