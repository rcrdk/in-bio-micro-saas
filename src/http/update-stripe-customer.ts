import { DB } from '@/lib/firebase'
import { Stripe } from '@/lib/stripe'

type Props = {
	userId: string
	slug: string
	name: string
	email: string
}

export async function updateStripeCustomer({ userId, slug, name, email }: Props) {
	const ref = DB.collection('users').doc(userId)
	const data = await ref.get()

	let customerId

	if (data.exists) {
		customerId = data.data()?.customerId
	}

	if (!customerId) {
		const newCostumer = await Stripe.customers.create({
			name,
			email,
			metadata: {
				userId,
				pageSlug: slug,
			},
		})

		customerId = newCostumer.id

		await ref.update({ customerId })
	}

	return { customerId }
}
