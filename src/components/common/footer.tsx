import Image from 'next/image'
import Link from 'next/link'

import brandImage from '@/assets/brand.svg'
import { Container } from '@/components/ui/container'
import { Text } from '@/components/ui/text'
import { socialMedias } from '@/utils/get-texts-by-slug'

export function Footer() {
	return (
		<footer className="mt-10 border-t border-border-primary py-12">
			<Container>
				<div className="flex justify-between gap-12">
					<Link
						href="/"
						className="focus-themed block w-[167px] self-start sm:w-[187px]"
					>
						<Image
							src={brandImage}
							width={187}
							height={157}
							alt="ProjectInBio"
							className="h-auto w-full"
						/>
					</Link>

					<nav>
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

					<nav>
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

						<span className="block py-1 text-white">
							CNPJ: 00.000.000/0000-00
						</span>
					</nav>

					<div className="flex flex-col items-end justify-end gap-4">
						<a
							href="http://rcrdk.dev/"
							target="_blank"
							className="flex items-center gap-2 text-nowrap rounded-bl-3xl rounded-br-md rounded-tl-3xl rounded-tr-md border border-border-primary py-1 pl-1 pr-3 transition-colors hover:border-border-secondary"
						>
							<Image
								src="https://github.com/rcrdk.png"
								width={100}
								height={100}
								alt="ProjectInBio"
								className="size-6 rounded-full"
							/>
							<span className="block text-sm font-medium leading-none">
								Feito por rcrdk.dev
							</span>
						</a>

						<Text
							variant="body-sm"
							className="self-end text-right text-gray-500"
						>
							Copyright &copy; {new Date().getFullYear()}
							<br />
							Todos os direitos reservados
						</Text>
					</div>
				</div>
			</Container>
		</footer>
	)
}
