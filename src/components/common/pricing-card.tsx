import { Text } from '@/components/ui/text'
import { cn } from '@/utils/tailwind-cn'

type Props = {
	name: string
	description: string
	isRecommend?: boolean
	price: string
	priceLabel: string
	button: React.ReactNode
}

export function PricingCard({
	name,
	description,
	isRecommend = false,
	price,
	priceLabel,
	button,
}: Props) {
	return (
		<div
			className={cn(
				'flex w-[334px] flex-col items-center rounded-2xl',
				isRecommend
					? 'bg-gradient-to-r from-accent-purple to-accent-pink p-[1.6px]'
					: 'border border-background-card-divider bg-background-primary p-6 sm:p-8',
			)}
		>
			{isRecommend && (
				<span className="p-2 text-xs font-bold uppercase text-white">
					Recomendado
				</span>
			)}

			<div
				className={cn(
					'flex w-full flex-col gap-7 rounded-b-2xl bg-background-primary',
					isRecommend && 'p-6 sm:p-8',
				)}
			>
				<div className="flex flex-col">
					<Text as="span" variant="heading-sm">
						{name}
					</Text>

					<Text
						as="span"
						variant="body-md"
						// eslint-disable-next-line prettier/prettier
						dangerouslySetInnerHTML={{ __html: description.replaceAll('[', '<span class="font-medium text-accent-pink">').replaceAll(']', '</span>') }}
					/>
				</div>

				<div className="flex items-center gap-2">
					<Text variant="heading-lg" as="span">
						{price}
					</Text>
					<Text
						variant="body-lg"
						as="span"
						className="text-2xl text-content-headline"
					>
						{priceLabel}
					</Text>
				</div>

				{button}
			</div>
		</div>
	)
}
