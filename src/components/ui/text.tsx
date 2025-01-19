/* eslint-disable prettier/prettier */
import { cn } from '@/utils/tailwind-merge'

interface Props<T extends React.ElementType> {
	as?: T
	variant?:
		| 'heading-xl'
		| 'heading-lg'
		| 'heading-md'
		| 'heading-sm'
		| 'body-lg'
		| 'body-md'
		| 'body-sm'
		| 'card-title'
		| 'label'
}

export function Text<T extends React.ElementType = 'p'>({
	as,
	variant = 'body-md',
	...props
}: Props<T> & Omit<React.ComponentPropsWithoutRef<T>, keyof Props<T>>) {
	const Component = as || 'p'
	
	return (
		<Component
			{...props}
			className={cn(
				'text-balance',
				variant === 'heading-xl' && 'text-8xl font-bold leading-tight text-white',
				variant === 'heading-lg' && 'text-5xl font-bold leading-snug text-white',
				variant === 'heading-md' && 'text-4xl font-bold leading-tight text-white',
				variant === 'heading-sm' && 'text-xl font-bold leading-snug text-white',
				variant === 'body-lg' && 'text-xl font-normal leading-snug text-content-body',
				variant === 'body-md' && 'text-base font-normal leading-normal text-content-body',
				variant === 'body-sm' && 'text-xs font-normal leading-relaxed text-content-body',
				variant === 'label' && 'text-base font-bold leading-normal text-white',
				variant === 'card-title' && 'text-3xl font-bold leading-tight text-white',
				props.className,
			)}
		/>
	)
}
