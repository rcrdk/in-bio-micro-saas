import { Resend as ResendInstance } from 'resend'

import { env } from '@/lib/env'

export const Resend = new ResendInstance(env.RESEND_SECRET_KEY)
