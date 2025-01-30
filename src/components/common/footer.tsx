import Image from 'next/image'
import Link from 'next/link'

import brandImage from '@/assets/brand.svg'
import { Container } from '@/components/ui/container'
import { Text } from '@/components/ui/text'
import { socialMedias } from '@/utils/get-texts-by-slug'

export function Footer() {
	return (
		<footer className="border-border-primary border-t py-12 sm:mt-10">
			<Container>
				<div className="grid grid-cols-1 justify-between gap-12 text-center sm:grid-cols-2 sm:text-left md:grid-cols-3 lg:flex">
					<div className="order-3 flex flex-col items-center justify-between gap-12 sm:items-start md:order-1">
						<Link
							href="/"
							className="focus-themed block w-[167px] sm:w-[187px]"
						>
							<Image
								src={brandImage}
								width={187}
								height={157}
								alt="ProjectInBio"
								className="h-auto w-full"
							/>
						</Link>

						<Text variant="body-sm" className="text-gray-500">
							Copyright &copy; {new Date().getFullYear()}
							<br />
							Todos os direitos reservados
							<br />
							CNPJ: 00.000.000/0000-00
						</Text>
					</div>

					<nav className="order-1 md:order-2">
						<Text variant="heading-xs" className="mb-2">
							Recursos:
						</Text>

						{socialMedias.map((item) => (
							<Link
								href={`/recursos/link-na-bio-para-${item}`}
								key={item}
								className="focus-themed block py-1 text-white transition-colors hover:underline"
							>
								Link na bio para {item.charAt(0).toUpperCase() + item.slice(1)}
							</Link>
						))}
					</nav>

					<nav className="order-2 md:order-3">
						<Text variant="heading-xs" className="mb-2">
							Legal:
						</Text>

						<Link
							href="/"
							className="focus-themed block py-1 text-white transition-colors hover:underline"
						>
							Termos de uso
						</Link>

						<Link
							href="/"
							className="focus-themed block py-1 text-white transition-colors hover:underline"
						>
							Política de privacidade
						</Link>
					</nav>

					<div className="order-4 flex items-center justify-center sm:items-start sm:justify-start sm:self-start lg:justify-center">
						<a
							href="http://rcrdk.dev/"
							target="_blank"
							className="border-border-primary hover:border-border-secondary flex items-center gap-2 rounded-tl-3xl rounded-tr-md rounded-br-md rounded-bl-3xl border py-1 pr-3 pl-1 text-nowrap transition-colors"
						>
							<Image
								src="https://github.com/rcrdk.png"
								width={100}
								height={100}
								alt="ProjectInBio"
								className="size-6 rounded-full"
							/>
							<span className="block text-sm leading-none font-medium">
								Feito por rcrdk.dev
							</span>
						</a>
					</div>
				</div>
			</Container>
		</footer>
	)
}
