import { z } from 'zod'

export const pageCustomLinksSchema = z.object({
	pageSlug: z.string().min(1, 'Informe o link da página.'),
	title1: z.string().optional().default(''),
	title2: z.string().optional().default(''),
	title3: z.string().optional().default(''),
	url1: z.string().url('Informe um link válido').optional().default('').or(z.literal('')),
	url2: z.string().url('Informe um link válido').optional().default('').or(z.literal('')),
	url3: z.string().url('Informe um link válido').optional().default('').or(z.literal('')),
})
