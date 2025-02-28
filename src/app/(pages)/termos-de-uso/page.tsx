import type { Metadata } from 'next'
import Link from 'next/link'

import { Footer } from '@/components/common/footer'
import { Header } from '@/components/common/header'
import { Container } from '@/components/ui/container'
import { Text } from '@/components/ui/text'
import { env } from '@/lib/env'
import { getSeoTags } from '@/lib/seo'

export const metadata: Metadata = getSeoTags({
	title: 'Termos de uso da ProjectInBio',
})

export default function TermsOfUse() {
	return (
		<>
			<Header />

			<Container className="pt-32 pb-20 md:pt-40">
				<Text as="h1" variant="heading-lg" className="mb-16">
					Termos de uso
				</Text>

				<div className="flex flex-col gap-6">
					<Text as="h2" variant="heading-md">
						1. Termos
					</Text>

					<Text>
						Ao acessar ao site{' '}
						<Link href={env.NEXT_PUBLIC_APP_URL} className="underline">
							ProjectInBio
						</Link>
						, concorda em cumprir estes termos de serviço, todas as leis e regulamentos aplicáveis e concorda que é
						responsável pelo cumprimento de todas as leis locais aplicáveis. Se você não concordar com algum desses
						termos, está proibido de usar ou acessar este site. Os materiais contidos neste site são protegidos pelas
						leis de direitos autorais e marcas comerciais aplicáveis.
					</Text>

					<Text as="h2" variant="heading-md" className="mt-4">
						2. Uso de Licença
					</Text>

					<Text>
						É concedida permissão para baixar temporariamente uma cópia dos materiais (informações ou software) no site
						ProjectInBio , apenas para visualização transitória pessoal e não comercial. Esta é a concessão de uma
						licença, não uma transferência de título e, sob esta licença, você não pode:
					</Text>

					<ol className="list-decimal pl-8">
						<Text as="li">modificar ou copiar os materiais;</Text>
						<Text as="li">
							usar os materiais para qualquer finalidade comercial ou para exibição pública (comercial ou não
							comercial);
						</Text>
						<Text as="li">
							tentar descompilar ou fazer engenharia reversa de qualquer software contido no site ProjectInBio;
						</Text>
						<Text as="li">remover quaisquer direitos autorais ou outras notações de propriedade dos materiais; ou</Text>
						<Text as="li">
							transferir os materiais para outra pessoa ou &#39;espelhe&#39; os materiais em qualquer outro servidor.
						</Text>
					</ol>

					<Text>
						Esta licença será automaticamente rescindida se você violar alguma dessas restrições e poderá ser rescindida
						por ProjectInBio a qualquer momento. Ao encerrar a visualização desses materiais ou após o término desta
						licença, você deve apagar todos os materiais baixados em sua posse, seja em formato eletrónico ou impresso.
					</Text>

					<Text as="h2" variant="heading-md" className="mt-4">
						3. Isenção de responsabilidade
					</Text>

					<ol className="list-decimal pl-8">
						<Text as="li">
							Os materiais no site da ProjectInBio são fornecidos &#39;como estão&#39;. ProjectInBio não oferece
							garantias, expressas ou implícitas, e, por este meio, isenta e nega todas as outras garantias, incluindo,
							sem limitação, garantias implícitas ou condições de comercialização, adequação a um fim específico ou não
							violação de propriedade intelectual ou outra violação de direitos.
						</Text>
						<Text as="li">
							Além disso, o ProjectInBio não garante ou faz qualquer representação relativa à precisão, aos resultados
							prováveis ou à confiabilidade do uso dos materiais em seu site ou de outra forma relacionado a esses
							materiais ou em sites vinculados a este site.
						</Text>
					</ol>

					<Text as="h2" variant="heading-md" className="mt-4">
						4. Limitações
					</Text>

					<Text>
						Em nenhum caso o ProjectInBio ou seus fornecedores serão responsáveis por quaisquer danos (incluindo, sem
						limitação, danos por perda de dados ou lucro ou devido a interrupção dos negócios) decorrentes do uso ou da
						incapacidade de usar os materiais em ProjectInBio, mesmo que ProjectInBio ou um representante autorizado da
						ProjectInBio tenha sido notificado oralmente ou por escrito da possibilidade de tais danos. Como algumas
						jurisdições não permitem limitações em garantias implícitas, ou limitações de responsabilidade por danos
						conseqüentes ou incidentais, essas limitações podem não se aplicar a você.
					</Text>

					<Text as="h2" variant="heading-md" className="mt-4">
						5. Precisão dos materiais
					</Text>

					<Text>
						Os materiais exibidos no site da ProjectInBio podem incluir erros técnicos, tipográficos ou fotográficos.
						ProjectInBio não garante que qualquer material em seu site seja preciso, completo ou atual. ProjectInBio
						pode fazer alterações nos materiais contidos em seu site a qualquer momento, sem aviso prévio. No entanto,
						ProjectInBio não se compromete a atualizar os materiais.
					</Text>

					<Text as="h2" variant="heading-md" className="mt-4">
						6. Links
					</Text>

					<Text>
						O ProjectInBio não analisou todos os sites vinculados ao seu site e não é responsável pelo conteúdo de
						nenhum site vinculado. A inclusão de qualquer link não implica endosso por ProjectInBio do site. O uso de
						qualquer site vinculado é por conta e risco do usuário.
					</Text>

					<Text as="h3" variant="heading-sm">
						Modificações
					</Text>

					<Text>
						O ProjectInBio pode revisar estes termos de serviço do site a qualquer momento, sem aviso prévio. Ao usar
						este site, você concorda em ficar vinculado à versão atual desses termos de serviço.
					</Text>

					<Text as="h3" variant="heading-sm">
						Lei aplicável
					</Text>

					<Text>
						Estes termos e condições são regidos e interpretados de acordo com as leis do ProjectInBio e você se submete
						irrevogavelmente à jurisdição exclusiva dos tribunais naquele estado ou localidade.
					</Text>
				</div>
			</Container>

			<Footer />
		</>
	)
}
