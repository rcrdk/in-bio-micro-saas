import type { Metadata } from 'next'
import Link from 'next/link'

import { Footer } from '@/components/common/footer'
import { Header } from '@/components/common/header'
import { Container } from '@/components/ui/container'
import { Text } from '@/components/ui/text'
import { env } from '@/lib/env'
import { getSeoTags } from '@/lib/seo'

export const metadata: Metadata = getSeoTags({
	title: 'Política de privacidade da ProjectInBio',
})

export default function PrivacyPolicy() {
	return (
		<>
			<Header />

			<Container className="pt-32 pb-20 md:pt-40">
				<Text as="h1" variant="heading-lg" className="mb-16">
					Política de privacidade
				</Text>

				<div className="flex flex-col gap-6">
					<Text>
						A sua privacidade é importante para nós. É política do ProjectInBio respeitar a sua privacidade em relação a
						qualquer informação sua que possamos coletar no site{' '}
						<Link href={env.NEXT_PUBLIC_APP_URL} className="underline">
							ProjectInBio
						</Link>
						, e outros sites que possuímos e operamos.
					</Text>

					<Text>
						Solicitamos informações pessoais apenas quando realmente precisamos delas para lhe fornecer um serviço.
						Fazemo-lo por meios justos e legais, com o seu conhecimento e consentimento. Também informamos por que
						estamos coletando e como será usado.
					</Text>

					<Text>
						Apenas retemos as informações coletadas pelo tempo necessário para fornecer o serviço solicitado. Quando
						armazenamos dados, protegemos dentro de meios comercialmente aceitáveis para evitar perdas e roubos, bem
						como acesso, divulgação, cópia, uso ou modificação não autorizados.
					</Text>

					<Text>
						Não compartilhamos informações de identificação pessoal publicamente ou com terceiros, exceto quando exigido
						por lei.
					</Text>

					<Text>
						O nosso site pode ter links para sites externos que não são operados por nós. Esteja ciente de que não temos
						controle sobre o conteúdo e práticas desses sites e não podemos aceitar responsabilidade por suas
						respectivas&nbsp;
						<Link href={`${env.NEXT_PUBLIC_APP_URL}/politica-de-privacidade`} className="underline">
							políticas de privacidade
						</Link>
						.
					</Text>

					<Text>
						Você é livre para recusar a nossa solicitação de informações pessoais, entendendo que talvez não possamos
						fornecer alguns dos serviços desejados.
					</Text>

					<Text>
						O uso continuado de nosso site será considerado como aceitação de nossas práticas em torno de privacidade e
						informações pessoais. Se você tiver alguma dúvida sobre como lidamos com dados do usuário e informações
						pessoais, entre em contacto connosco.
					</Text>

					<ul className="list-disc pl-8">
						<Text as="li">
							O serviço Google AdSense que usamos para veicular publicidade usa um cookie DoubleClick para veicular
							anúncios mais relevantes em toda a Web e limitar o número de vezes que um determinado anúncio é exibido
							para você.
						</Text>

						<Text as="li">
							Para mais informações sobre o Google AdSense, consulte as FAQs oficiais sobre privacidade do Google
							AdSense.
						</Text>

						<Text as="li">
							Utilizamos anúncios para compensar os custos de funcionamento deste site e fornecer financiamento para
							futuros desenvolvimentos. Os cookies de publicidade comportamental usados por este site foram projetados
							para garantir que você forneça os anúncios mais relevantes sempre que possível, rastreando anonimamente
							seus interesses e apresentando coisas semelhantes que possam ser do seu interesse.
						</Text>

						<Text as="li">
							Vários parceiros anunciam em nosso nome e os cookies de rastreamento de afiliados simplesmente nos
							permitem ver se nossos clientes acessaram o site através de um dos sites de nossos parceiros, para que
							possamos creditá-los adequadamente e, quando aplicável, permitir que nossos parceiros afiliados ofereçam
							qualquer promoção que pode fornecê-lo para fazer uma compra.
						</Text>
					</ul>

					<Text as="h2" variant="heading-sm">
						Compromisso do Usuário
					</Text>

					<Text>
						O usuário se compromete a fazer uso adequado dos conteúdos e da informação que o ProjectInBio oferece no
						site e com caráter enunciativo, mas não limitativo:
					</Text>

					<ol className="list-decimal pl-8">
						<Text as="li">
							Não se envolver em atividades que sejam ilegais ou contrárias à boa fé a à ordem pública;
						</Text>

						<Text as="li">
							Não difundir propaganda ou conteúdo de natureza racista, xenofóbica, bets ou azar, qualquer tipo de
							pornografia ilegal, de apologia ao terrorismo ou contra os direitos humanos;
						</Text>

						<Text as="li">
							Não causar danos aos sistemas físicos (hardwares) e lógicos (softwares) do ProjectInBio, de seus
							fornecedores ou terceiros, para introduzir ou disseminar vírus informáticos ou quaisquer outros sistemas
							de hardware ou software que sejam capazes de causar danos anteriormente mencionados.
						</Text>
					</ol>

					<Text as="h2" variant="heading-sm">
						Mais informações
					</Text>

					<Text>
						Esperemos que esteja esclarecido e, como mencionado anteriormente, se houver algo que você não tem certeza
						se precisa ou não, geralmente é mais seguro deixar os cookies ativados, caso interaja com um dos recursos
						que você usa em nosso site.
					</Text>

					<Text>Esta política é efetiva a partir de 31 de janeiro de 2025</Text>
				</div>
			</Container>

			<Footer />
		</>
	)
}
