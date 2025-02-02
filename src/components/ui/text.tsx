/* eslint-disable prettier/prettier */
import { cn } from '@/utils/tailwind-cn'

interface Props<T extends React.ElementType> {
	as?: T
	variant?:
		| 'heading-xl'
		| 'heading-lg'
		| 'heading-md'
		| 'heading-sm'
		| 'heading-xs'
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
				variant === 'heading-xl' && 'text-4xl font-bold leading-tight lg:leading-[1.15] text-white xs:text-5xl sm:text-6xl md:text-7xl xl:text-8xl',
				variant === 'heading-lg' && 'text-3xl font-bold leading-snug text-white xs:text-4xl md:text-5xl',
				variant === 'heading-md' && 'text-2xl font-bold leading-tight text-white xs:text-3xl md:text-4xl',
				variant === 'heading-sm' && 'text-lg sm:text-xl font-bold leading-snug text-white',
				variant === 'heading-xs' && 'text-base font-bold leading-snug text-white',
				variant === 'body-lg' && 'text-base xs:text-lg font-normal leading-snug text-content-body md:text-xl',
				variant === 'body-md' && 'text-base font-normal leading-normal text-content-body',
				variant === 'body-sm' && 'text-xs font-normal leading-relaxed text-content-body',
				variant === 'label' && 'text-sm font-bold leading-normal text-white',
				variant === 'card-title' && 'text-3xl font-bold leading-tight text-white',
				props.className,
			)}
		/>
	)
}
