import { NextResponse } from 'next/server'

import { updateStripeCustomer } from '@/http/update-stripe-customer'
import { auth } from '@/lib/auth'
import { env } from '@/lib/env'
import { trackServerEvent } from '@/lib/mixpanel'
import { Stripe } from '@/lib/stripe'

export async function POST(req: Request) {
	const { metadata, isSubscription } = await req.json()

	const session = await auth()

	if (!session?.user || !session.user.id || !session.user.email || !session.user.name) {
		return new NextResponse('Unauthorized.', { status: 401 })
	}

	const { id, email, name } = session.user

	const { customerId } = await updateStripeCustomer({
		userId: id,
		slug: metadata.slug,
		name,
		email,
	})

	const price = isSubscription ? env.STRIPE_SUBSCRIPTION_PRICE_ID : env.STRIPE_PAYMENT_PRICE_ID

	const stripeSession = await Stripe.checkout.sessions.create({
		customer: customerId,
		line_items: [{ price, quantity: 1 }],
		mode: isSubscription ? 'subscription' : 'payment',
		metadata,
		success_url: `${req.headers.get('origin')}/in/${metadata.pageSlug}`,
		cancel_url: `${req.headers.get('origin')}/in/${metadata.pageSlug}/upgrade`,
		payment_method_types: isSubscription ? ['card'] : ['card', 'boleto'],
		client_reference_id: id,
	})

	trackServerEvent('checkout_created', {
		priceId: price,
		isSubscription,
	})

	return NextResponse.json({ sessionId: stripeSession.id }, { status: 200 })
}
