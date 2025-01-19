import { FaqItem } from '@/components/sections/faq-item'
import { Container } from '@/components/ui/container'
import { Text } from '@/components/ui/text'

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
			description:
				'Sim! Oferecemos um teste gratuito de 7 dias, sem compromisso. Isso permite que você explore todas as funcionalidades da nossa plataforma antes de decidir por uma assinatura.',
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
			<div className="border-t border-background-card-divider" />

			<div className="flex flex-col items-center gap-16 py-20">
				<Text variant="heading-md" as="h3">
					Perguntas frequentes
				</Text>

				<div className="max-w-screen-lg columns-2 gap-4">
					{content.map((item, index) => (
						<FaqItem data={item} key={index} />
					))}
				</div>
			</div>
		</Container>
	)
}
