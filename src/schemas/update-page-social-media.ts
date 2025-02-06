import { z } from 'zod'

export const pageSocialMediaSchema = z.object({
	pageSlug: z.string().min(1, 'Informe o link da página'),
	github: z.string().optional().default(''),
	linkedin: z.string().optional().default(''),
	twitter: z.string().optional().default(''),
	instagram: z.string().optional().default(''),
	youtube: z.string().optional().default(''),
	facebook: z.string().optional().default(''),
})
