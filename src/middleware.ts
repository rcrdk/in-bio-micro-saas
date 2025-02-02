import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { v4 as uuid } from 'uuid'

export function middleware(request: NextRequest) {
	const cacheKey = '@INBIO-ip-cache-id-1.0.0'
	const expirationInSeconds = 60 * 60 * 12 // half-day
	const cacheValue = uuid()

	const cacheExists = request.cookies.get(cacheKey)?.value

	const response = NextResponse.next()

	if (!cacheExists) {
		response.cookies.set(cacheKey, cacheValue, { maxAge: expirationInSeconds })
	}

	return response
}
