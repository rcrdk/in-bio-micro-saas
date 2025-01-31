/* eslint-disable prettier/prettier */
export const actionsMessages = {
	errors: {
		UNAUTHORIZED: 'Você não tem permissão para realizar esta acão.',
		UNEXPECTED: 'Ocorreu um erro inesperado ao tentar realizar esta ação. Tente mais tarde.',
		PAGE_EMPTY_SLUG: 'Informe o seu link para prosseguir.',
		PAGE_SLUG_IN_USE: 'Esse link já está em uso. Escolha outro.',
		PAGE_SLUG_CREATE: 'Ocorreu um erro ao criar o link. Tente mais tarde.',
	},

	success: {
		PROFILE_DATA_SAVED: 'Suas informações foram salvas com sucesso.',
		PROFILE_SOCIAL_LINKS_SAVED: 'Seus links de redes sociais foram salvos com sucesso.',
		PROFILE_CUSTOM_LINKS_SAVED: 'Seus links personalizados foram salvos com sucesso.',
		PROJECT_CREATED: 'Seu novo projeto foi criado com sucesso.',
		PROJECT_UPDATED: 'Seu projeto foi atualizado com sucesso.',
		PROJECT_DELETED: 'Seu projeto foi removido com sucesso.',
	},
} as const
