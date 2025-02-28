import Link from 'next/link'

import { PricingCard } from '@/components/common/pricing-card'
import { Button } from '@/components/ui/button'
import { Container } from '@/components/ui/container'
import { Text } from '@/components/ui/text'
import { env } from '@/lib/env'

export function Pricing() {
	return (
		<Container className="pt-20 pb-20 md:pt-36">
			<div className="flex flex-col items-center gap-14">
				<div className="flex max-w-[800px] flex-col items-center gap-6 text-center">
					<Text variant="heading-md" as="h3">
						Um valor acessível para todos
					</Text>

					<Text variant="body-lg">
						Junte-se à comunidade de criadores e profissionais que já estão elevando sua presença online. Teste
						gratuitamente por <strong className="text-accent-pink">{env.NEXT_PUBLIC_TRIAL_DAYS} dias</strong>, sem
						compromisso!
					</Text>
				</div>

				<div className="flex flex-row flex-wrap items-end justify-center gap-8 md:gap-9">
					<PricingCard
						name="Mensal"
						description="Valor recorrente de"
						price="R$ 9,90"
						priceLabel="/mês"
						button={
							<Button as={Link} href="/crie-sua-pagina" variant="secondary">
								Assinar
							</Button>
						}
					/>

					<PricingCard
						name="Anual"
						description="Economize [R$ 18,90] no ano"
						price="R$ 99,90"
						priceLabel="/ano"
						button={
							<Button as={Link} href="/crie-sua-pagina">
								Assinar
							</Button>
						}
						isRecommend
					/>
				</div>
			</div>
		</Container>
	)
}
