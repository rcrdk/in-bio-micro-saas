import { z } from 'zod'

export const deleteProjectSchema = z.object({
	pageSlug: z.string().min(1, 'Informe o link da página'),
	projectId: z.string().min(1, 'Informe o id do projeto'),
})
