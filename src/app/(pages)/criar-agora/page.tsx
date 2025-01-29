import type { Metadata } from 'next'

import { FinishCreateSlugForm } from '@/app/(pages)/criar-agora/components/form'
import { Header } from '@/components/common/header'
import { Container } from '@/components/ui/container'
import { Text } from '@/components/ui/text'
import { trackServerEvent } from '@/lib/mixpanel'

export const metadata: Metadata = {
	title: 'Crie sua página - ProjectInBio',
	description:
		'Crie sua própria página de projetos e compartilhe eles com o mundo. Acompanhe o engajamento com Analytics de cliques.',
}

export default function Home() {
	trackServerEvent('page_view', {
		page: 'create',
	})

	return (
		<>
			<Header hidePageButton />

			<Container className="flex min-h-svh items-center py-24">
				<div className="m-auto flex w-full max-w-xl flex-col gap-4">
					<Text variant="heading-md" className="text-center">
						Finalize a criação da sua página
					</Text>

					<Text variant="body-lg" className="text-center">
						Confirme como ficará seu link e prossiga:
					</Text>

					<FinishCreateSlugForm />
				</div>
			</Container>
		</>
	)
}
