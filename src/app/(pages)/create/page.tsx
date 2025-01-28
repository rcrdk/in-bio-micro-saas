import type { Metadata } from 'next'

import { CreateNow } from '@/app/(pages)/create/create-now'
import { Header } from '@/components/sections/header'
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
				<div className="flex flex-col gap-6">
					<Text variant="heading-md" className="text-center">
						Crie sua página
					</Text>

					<CreateNow />
				</div>
			</Container>
		</>
	)
}
