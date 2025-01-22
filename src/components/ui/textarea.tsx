import { cn } from '@/utils/tailwind-cn'

type Props = React.TextareaHTMLAttributes<HTMLTextAreaElement>

export function Textarea(props: Props) {
	return (
		<textarea
			{...props}
			className={cn(
				'w-full resize-none rounded-xl border border-transparent bg-background-secondary px-4 py-3 text-white outline-none',
				'placeholder:text-content-placeholder',
				'hover:border-border-secondary hover:text-content-body',
				// 'active:border-border-tertiary',
				// 'focus:border-border-tertiary',
				props.className,
			)}
		/>
	)
}
