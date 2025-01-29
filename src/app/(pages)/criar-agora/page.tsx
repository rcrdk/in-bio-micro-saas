import type { Metadata } from 'next'

import { FinishCreateSlugForm } from '@/app/(pages)/criar-agora/components/form'
import { Header } from '@/components/common/header'
import { Container } from '@/components/ui/container'
import { Text } from '@/components/ui/text'
import { trackServerEvent } from '@/lib/mixpanel'
import { getSeoTags } from '@/lib/seo'

export const metadata: Metadata = getSeoTags({
	title: 'Finalize a criação da sua página ProjectInBio',
})

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
