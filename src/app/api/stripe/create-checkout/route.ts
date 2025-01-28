import { NextResponse } from 'next/server'

import { auth } from '@/lib/auth'
import { env } from '@/lib/env'
import { DB } from '@/lib/firebase'
import { Stripe } from '@/lib/stripe'

export async function POST(req: Request) {
	const { metadata, isSubscription } = await req.json()

	const userSession = await auth()

	if (
		!userSession ||
		!userSession.user?.id ||
		!userSession.user?.email ||
		!userSession.user?.name
	) {
		return new NextResponse('Unauthorized.', { status: 401 })
	}

	const userId = userSession.user.id
	const userEmail = userSession.user.email
	const userName = userSession.user.name

	const userRef = DB.collection('users').doc(userId ?? '')
	const userDoc = await userRef.get()

	let customerId

	if (userDoc.exists) {
		customerId = userDoc.data()?.customerId
	}

	if (!customerId) {
		const newCostumer = await Stripe.customers.create({
			email: userEmail,
			name: userName,
			metadata: {
				userId,
			},
		})

		customerId = newCostumer.id

		await userRef.update({ customerId })
	}

	const session = await Stripe.checkout.sessions.create({
		customer: customerId,
		line_items: [
			{
				price: isSubscription
					? env.STRIPE_SUBSCRIPTION_PRICE_ID
					: env.STRIPE_PRICE_ID,
				quantity: 1,
			},
		],
		mode: isSubscription ? 'subscription' : 'payment',
		metadata,
		success_url: `${req.headers.get('origin')}/${metadata.pageSlug}`,
		cancel_url: `${req.headers.get('origin')}/${metadata.pageSlug}/upgrade`,
		payment_method_types: isSubscription ? ['card'] : ['card', 'boleto'],
		client_reference_id: userId,
	})

	return NextResponse.json(
		{
			sessionId: session.id,
		},
		{ status: 200 },
	)
}
