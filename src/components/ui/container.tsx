import { cn } from '@/utils/tailwind-merge'

type Props = React.HTMLAttributes<HTMLDivElement>

export function Container(props: Props) {
	return (
		<div {...props} className={cn('px-8', props.className)}>
			<div className="mx-auto max-w-7xl">{props.children}</div>
		</div>
	)
}
