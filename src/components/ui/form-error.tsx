import { cn } from '@/utils/tailwind-cn'

interface FormErrorProps {
	message?: string[] | string
	floating?: boolean
}

export function FormError({ message, floating = false }: FormErrorProps) {
	return message ? (
		<p
			className={cn(
				'top-[3px] right-0 pl-1 text-xs leading-normal text-red-500 select-none sm:absolute dark:text-red-400',
				floating &&
					'sm:bg-background-primary top-0 right-2 sm:-translate-y-1/3 sm:rounded-xl sm:border sm:border-red-500 sm:px-2 sm:py-1 sm:leading-none',
			)}
		>
			{typeof message === 'string' ? message : message.at(0)}
		</p>
	) : null
}
