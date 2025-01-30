import type { ComponentProps } from 'react'

import { cn } from '@/utils/tailwind-cn'

type Props = ComponentProps<'label'>

export function Label({ ...props }: Props) {
	return (
		<label
			{...props}
			className={cn(
				'text-sm leading-normal font-bold text-white',
				props.className,
			)}
		/>
	)
}
