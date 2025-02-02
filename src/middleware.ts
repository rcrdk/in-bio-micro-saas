import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

export function middleware(request: NextRequest & { ip?: string }) {
	const response = NextResponse.next()

	// forward ip
	response.headers.set('x-forwarded-for', request.ip ?? '')

	return response
}
