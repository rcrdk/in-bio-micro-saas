import { revalidateTag } from 'next/cache'
import { type NextRequest, NextResponse } from 'next/server'
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import StripePackage from 'stripe'

import { env } from '@/lib/env'
import { DB } from '@/lib/firebase'
import { Resend } from '@/lib/resend'
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

		switch (event.type) {
			case 'checkout.session.completed':
				{
					const subscription = event.data.object
					const slug = subscription?.metadata?.pageSlug

					if (subscription.payment_status === 'paid') {
						const userId = subscription.client_reference_id

						if (userId && slug) {
							DB.collection('pages').doc(slug).update({
								isPaid: true,
								subscriptionEndedAt: null,
							})
						}
					}

					if (
						subscription.payment_status === 'unpaid' &&
						subscription.payment_intent
					) {
						const paymentIntend = await Stripe.paymentIntents.retrieve(
							subscription.payment_intent.toString(),
						)

						const hostedVoucherUrl =
							paymentIntend.next_action?.boleto_display_details
								?.hosted_voucher_url

						const userEmail = subscription.customer_details?.email

						if (hostedVoucherUrl && userEmail) {
							Resend.emails.send({
								from: 'ricardo@rcrdk.dev',
								to: userEmail,
								subject: 'Seu boleto para pagamento',
								text: `Aqui está o seu boleto: ${hostedVoucherUrl}`,
							})
						}
					}

					if (slug) {
						revalidateTag(`get-page-by-slug-${slug}`)
					}
				}
				break

			case 'checkout.session.async_payment_succeeded':
				{
					const subscription = event.data.object
					const customerId = subscription.customer?.toString()

					if (customerId) {
						const customer = (await Stripe.customers.retrieve(
							customerId,
						)) as StripePackage.Customer

						if (customer && customer.metadata.pageSlug) {
							const slug = customer.metadata.pageSlug

							DB.collection('pages').doc(slug).update({
								isPaid: true,
								subscriptionEndedAt: null,
							})

							if (slug) {
								revalidateTag(`get-page-by-slug-${slug}`)
							}
						}
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

						if (customer && customer.metadata.pageSlug) {
							const slug = customer.metadata.pageSlug

							DB.collection('pages').doc(slug).update({
								isPaid: false,
								subscriptionEndedAt: null,
							})

							if (slug) {
								revalidateTag(`get-page-by-slug-${slug}`)
							}
						}
					}
				}
				break

			case 'customer.subscription.updated': {
				const subscription = event.data.object
				const customerId = subscription.customer.toString()

				if (customerId && subscription.current_period_end) {
					const customer = (await Stripe.customers.retrieve(
						customerId,
					)) as StripePackage.Customer

					if (customer && customer.metadata.pageSlug) {
						const slug = customer.metadata.pageSlug

						const isScheduleToEnd = subscription.cancel_at_period_end

						DB.collection('pages')
							.doc(slug)
							.update({
								subscriptionEndedAt: isScheduleToEnd
									? subscription.current_period_end * 1000
									: null,
							})

						if (slug) {
							revalidateTag(`get-page-by-slug-${slug}`)
						}
					}
				}
			}
		}

		return new NextResponse(null, { status: 200 })
	} catch (error) {
		console.error('Stripe webhook error', error)
		return new NextResponse('Internal server error.', { status: 500 })
	}
}
