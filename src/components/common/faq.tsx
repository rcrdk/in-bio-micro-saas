import * as Accordion from '@radix-ui/react-accordion'
import { ChevronDown } from 'lucide-react'

import { Container } from '@/components/ui/container'
import { Text } from '@/components/ui/text'
import { env } from '@/lib/env'

export function Faq() {
	const content = [
		{
			title: 'Como funciona a criação de portfólio e links com Project in Bio',
			description:
				'Com Project in Bio, você pode criar um portfólio profissional e uma página de links em poucos minutos. Nossa plataforma oferece templates personalizáveis e uma interface fácil de usar para que você possa mostrar seu trabalho e organizar seus links de maneira eficiente.',
		},
		{
			title: 'Posso personalizar o design do meu portfólio?',
			description:
				'Sim! Com Project in Bio, você pode personalizar cores, fontes e o layout do seu portfólio, garantindo que ele reflita a sua marca pessoal.',
		},
		{
			title: 'O que acontece se eu cancelar minha assinatura?',
			description:
				'Você pode cancelar sua assinatura a qualquer momento. Seu portfólio e página de links ficarão disponíveis até o final do período pago, mas após isso, as funcionalidades premium serão desativadas.',
		},
		{
			title: 'Há um período de teste gratuito?',
			description: `Sim! Oferecemos um teste gratuito de ${env.NEXT_PUBLIC_TRIAL_DAYS} dias, sem compromisso. Isso permite que você explore todas as funcionalidades da nossa plataforma antes de decidir por uma assinatura.`,
		},
		{
			title: 'Preciso de habilidades técnicas para usar a plataforma?',
			description:
				'Não! Nossa plataforma foi desenvolvida para ser simples e intuitiva, então não é necessário conhecimento técnico. Você pode criar e personalizar seu portfólio e links sem complicações.',
		},
		{
			title: 'Posso compartilhar meu portfólio em redes sociais?',
			description:
				'Sim! Você pode facilmente compartilhar seu portfólio e página de links em suas redes sociais através de um link personalizado.',
		},
	]

	return (
		<Container>
			<div className="border-background-card-divider border-t" />

			<div className="flex flex-col items-center gap-8 pt-12 pb-20 sm:gap-12 sm:pt-20">
				<Text variant="heading-md" as="h3">
					Perguntas frequentes
				</Text>

				<Accordion.Root
					type="single"
					defaultValue="item-0"
					className="divide-border-secondary border-border-secondary w-full max-w-[704px] gap-4 divide-y rounded-lg border"
					collapsible
				>
					{content.map((item, index) => (
						<Accordion.Item key={index} value={`item-${index}`}>
							<Accordion.Trigger className="flex w-full cursor-pointer items-center justify-between gap-6 px-6 py-4 text-left [&[data-state=open]_svg]:rotate-180">
								<Text variant="heading-sm">{item.title}</Text>
								<ChevronDown
									className="shrink-0 transition-transform"
									size={28}
								/>
							</Accordion.Trigger>

							<Accordion.Content className="data-[state=closed]:animate-accordion-close data-[state=open]:animate-accordion-open overflow-hidden">
								<div className="px-6 pb-6">
									<Text>{item.description}</Text>
								</div>
							</Accordion.Content>
						</Accordion.Item>
					))}
				</Accordion.Root>
			</div>
		</Container>
	)
}
