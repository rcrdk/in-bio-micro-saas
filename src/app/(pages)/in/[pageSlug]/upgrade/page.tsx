import type { Metadata } from 'next'

import { AvailablePlans } from '@/app/(pages)/in/[pageSlug]/upgrade/components/available-plans'
import { Header } from '@/components/common/header'
import { Container } from '@/components/ui/container'
import { Text } from '@/components/ui/text'
import { auth } from '@/lib/auth'
import { trackServerEvent } from '@/lib/mixpanel'
import { getSeoTags } from '@/lib/seo'

export const metadata: Metadata = getSeoTags({
	title: 'Upgrade da página ProjectInBio',
})

export default async function Upgrade() {
	const session = await auth()

	trackServerEvent('page_view', {
		page: 'upgrade',
		user: session?.user.id ?? '',
	})

	return (
		<div className="flex min-h-screen flex-col items-center justify-center">
			<Header />

			<Container className="pb-20 pt-32 md:pt-36">
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
