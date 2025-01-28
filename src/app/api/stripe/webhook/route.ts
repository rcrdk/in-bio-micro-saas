import { type NextRequest, NextResponse } from 'next/server'
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import StripePackage from 'stripe'

import { env } from '@/lib/env'
import { DB } from '@/lib/firebase'
import { Stripe } from '@/lib/stripe'

export async function POST(req: NextRequest) {
	try {
		const body = await req.text()

		const signature = req.headers.get('stripe-signature')
		const secret = env.STRIPE_WEBHOOK_SECRET

		if (!signature || !secret) {
			return new NextResponse('Stripe webhook secret or signature not found.', {
				status: 400,
			})
		}

		const event = Stripe.webhooks.constructEvent(body, signature, secret)

		// quando o cancelamento for imediato: customer.subscription.deleted
		// quando o cancelamento for após o ciclo pago: customer.subscription.updated

		switch (event.type) {
			case 'checkout.session.completed':
				if (event.data.object.payment_status === 'paid') {
					const userId = event.data.object.client_reference_id

					if (userId) {
						await DB.collection('users').doc(userId).update({
							isPaid: true,
						})
					}
				}

				if (
					event.data.object.payment_status === 'unpaid' &&
					event.data.object.payment_intent
				) {
					const paymentIntend = await Stripe.paymentIntents.retrieve(
						event.data.object.payment_intent.toString(),
					)

					const hostedVoucherUrl =
						paymentIntend.next_action?.boleto_display_details
							?.hosted_voucher_url

					if (hostedVoucherUrl) {
						// const userEmail = event.data.object.customer_details?.email
						console.log('Enviar e-mail para o cliente por e-mail.')
					}
				}
				break

			case 'checkout.session.async_payment_succeeded':
				{
					const userId = event.data.object.client_reference_id

					if (event.data.object.payment_status === 'paid' && userId) {
						await DB.collection('users').doc(userId).update({
							isPaid: true,
						})
					}
				}
				break

			case 'customer.subscription.deleted':
				{
					const subscription = event.data.object
					const customerId = subscription.customer.toString()

					if (customerId) {
						const customer = (await Stripe.customers.retrieve(
							customerId,
						)) as StripePackage.Customer

						if (customer && customer.metadata.userId) {
							const userId = customer.metadata.userId

							await DB.collection('users').doc(userId).update({
								isPaid: false,
							})
						}
					}
				}

				break
		}

		return new NextResponse(null, { status: 200 })
	} catch (error) {
		console.error('Stripe webhook error', error)
		return new NextResponse('Internal server error.', { status: 500 })
	}
}
