import 'server-only'

export const socialMedias = [
	'instagram',
	'facebook',
	'x',
	'linkedin',
	'youtube',
]

export async function getTextsBySlug(slug: string) {
	const fullSlug = `link-na-bio-para-${slug}`

	const content = socialMedias.find((item) => fullSlug.includes(item))

	if (content) {
		const capitalizeName = content.charAt(0).toUpperCase() + content.slice(1)

		return {
			title: `Link na bio para ${capitalizeName}`,
			description: `Compartilhe todos os seus links no seu perfil no ${capitalizeName}. Acompanhe o engajamento com o Analytics de cliques.`,
		}
	}

	return null
}
