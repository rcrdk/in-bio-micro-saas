import { Button } from '@/components/ui/button'
import { Container } from '@/components/ui/container'
import { Text } from '@/components/ui/text'
import { env } from '@/lib/env'

export function Pricing() {
	return (
		<Container className="pb-20 pt-36">
			<div className="flex flex-col items-center gap-14">
				<div className="flex max-w-[800px] flex-col items-center gap-6 text-center">
					<Text variant="heading-md" as="h3">
						Um valor acessível para todos
					</Text>

					<Text variant="body-lg">
						Junte-se à comunidade de criadores e profissionais que já estão
						elevando sua presença online. Teste gratuitamente por{' '}
						<strong className="text-accent-pink">
							{env.NEXT_PUBLIC_TRIAL_DAYS} dias
						</strong>
						, sem compromisso!
					</Text>
				</div>

				<div className="flex items-end gap-9">
					<div className="flex w-[304px] flex-col gap-7 rounded-2xl border border-background-card-divider bg-background-primary p-8">
						<div className="flex flex-col">
							<Text as="span" variant="heading-sm">
								Mensal
							</Text>
							<Text as="span" variant="body-md">
								Apenas
							</Text>
						</div>

						<div className="flex items-center gap-1">
							<Text variant="heading-lg" as="span">
								R$ 9,99
							</Text>
							<Text
								variant="body-lg"
								as="span"
								className="text-2xl text-content-headline"
							>
								/mês
							</Text>
						</div>

						<Button variant="secondary">Assinar</Button>
					</div>

					<div className="flex w-[304px] flex-col items-center rounded-2xl bg-gradient-to-r from-accent-purple to-accent-pink p-[1.6px]">
						<span className="p-2 text-xs font-bold uppercase text-white">
							Recomendado
						</span>

						<div className="flex w-full flex-col gap-7 rounded-b-2xl bg-background-primary p-8">
							<div className="flex flex-col">
								<Text as="span" variant="heading-sm">
									Anual
								</Text>
								<Text as="span" variant="body-md">
									Economize com
								</Text>
							</div>

							<div className="flex items-center gap-1">
								<Text variant="heading-lg" as="span">
									R$ 99
								</Text>
								<Text
									variant="body-lg"
									as="span"
									className="text-2xl text-content-headline"
								>
									/ano
								</Text>
							</div>

							<Button>Assinar</Button>
						</div>
					</div>
				</div>
			</div>
		</Container>
	)
}
