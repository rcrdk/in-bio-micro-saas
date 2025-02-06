import { z } from 'zod'

export const pageDataSchema = z.object({
	pageSlug: z.string().min(1, 'Informe o link da página'),
	name: z.string().min(1, 'Informe um nome'),
	description: z.string().min(1, 'Informe uma introdução'),
	file: z.custom<File>().optional(),
})
