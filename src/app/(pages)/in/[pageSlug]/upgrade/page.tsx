import type { Metadata } from 'next'

import { AvailablePlans } from '@/app/(pages)/in/[pageSlug]/upgrade/components/available-plans'
import { Header } from '@/components/common/header'
import { Container } from '@/components/ui/container'
import { Text } from '@/components/ui/text'

export const metadata: Metadata = {
	title: 'Escolha um plano - ProjectInBio',
	description: '',
}

export default async function Upgrade() {
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
