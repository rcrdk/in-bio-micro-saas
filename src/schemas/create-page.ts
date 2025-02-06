import { z } from 'zod'

export const createPageSchema = z.object({
	slug: z.string().min(1),
})
