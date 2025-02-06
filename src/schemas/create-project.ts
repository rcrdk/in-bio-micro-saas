import { z } from 'zod'

export const createProjectSchema = z.object({
	pageSlug: z.string().min(1, 'Informe o link da página'),
	name: z.string().min(1, 'Informe um nome'),
	description: z.string().min(1, 'Informe uma descrição'),
	url: z.string().min(1, 'Informe um link').url('Informe um link válido'),
	file: z.custom<File>().optional(),
})
