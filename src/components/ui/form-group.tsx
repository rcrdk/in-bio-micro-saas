import type { ComponentProps } from 'react'

import { cn } from '@/utils/tailwind-cn'

type Props = ComponentProps<'div'>

export function FormGroup({ ...props }: Props) {
	return (
		<div {...props} className={cn('flex flex-col gap-1', props.className)} />
	)
}
