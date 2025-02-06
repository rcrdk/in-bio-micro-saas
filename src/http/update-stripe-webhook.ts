import { DB } from '@/lib/firebase'

type Props = {
	slug: string
	isPaid?: boolean
	subscriptionEndedAt: number | null
}

export async function updateStripeWebhook({ slug, ...props }: Props) {
	await DB.collection('pages')
		.doc(slug)
		.update({
			...props,
		})
}
