import type { Metadata } from 'next'

import { AvailablePlans } from '@/app/(pages)/in/[pageSlug]/upgrade/components/available-plans'
import { Header } from '@/components/common/header'
import { Container } from '@/components/ui/container'
import { Text } from '@/components/ui/text'
import { trackServerEvent } from '@/lib/mixpanel'
import { getSeoTags } from '@/lib/seo'

export const metadata: Metadata = getSeoTags({
	title: 'Upgrade da página ProjectInBio',
})

export type Props = {
	params: Promise<{ pageSlug: string }>
	searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function Upgrade({ params }: Props) {
	const { pageSlug: slug } = await params

	trackServerEvent('page_view', {
		page: 'upgrade',
		url: `/in/${slug}/upgrade`,
	})

	return (
		<div className="flex min-h-screen flex-col items-center justify-center">
			<Header />

			<Container className="pt-32 pb-20 md:pt-36">
				<div className="flex flex-col items-center gap-14">
					<div className="flex max-w-[800px] flex-col items-center gap-6 text-center">
						<Text as="h1" variant="heading-md">
							Mantenha sua página ativa
						</Text>

						<Text variant="body-lg">
							Faça o upgrade para que as pessoas possam continuar visitando sua
							página.
						</Text>
					</div>

					<div className="flex flex-row flex-wrap items-end justify-center gap-8 md:gap-9">
						<AvailablePlans />
					</div>
				</div>
			</Container>
		</div>
	)
}
