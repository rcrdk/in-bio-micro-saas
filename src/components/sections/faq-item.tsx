import { Text } from '@/components/ui/text'

export type FaqItemData = {
	title: string
	description: string
}

type Props = {
	data: FaqItemData
}

export function FaqItem({ data }: Props) {
	return (
		<div className="mb-4 flex break-inside-avoid-column flex-col gap-3 rounded-xl border border-background-card-divider p-5">
			<Text as="h4" variant="heading-sm">
				{data.title}
			</Text>

			<Text>{data.description}</Text>
		</div>
	)
}
