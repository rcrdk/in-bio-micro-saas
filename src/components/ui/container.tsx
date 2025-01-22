import { cn } from '@/utils/tailwind-cn'

type Props = React.HTMLAttributes<HTMLDivElement>

export function Container(props: Props) {
	return (
		<div {...props} className={cn('max-w-full px-6 sm:px-10', props.className)}>
			<div className="mx-auto max-w-7xl">{props.children}</div>
		</div>
	)
}
