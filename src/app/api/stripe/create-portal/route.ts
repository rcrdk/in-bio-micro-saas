import { NextResponse } from 'next/server'

import { auth } from '@/lib/auth'
import { Stripe } from '@/lib/stripe'

export async function POST(request: Request) {
	const session = await auth()

	if (!session?.user.customerId) {
		return new NextResponse('Unauthorized.', { status: 401 })
	}

	try {
		const portalSession = await Stripe.billingPortal.sessions.create({
			customer: session.user.customerId,
			return_url: `${request.headers.get('origin')}/`,
		})

		return NextResponse.json({ url: portalSession.url }, { status: 200 })
	} catch {
		return new NextResponse('Internal server error.', { status: 500 })
	}
}
