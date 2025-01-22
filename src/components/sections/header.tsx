import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { Menu } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

import { authActions } from '@/app/actions/auth'
import brandImage from '@/assets/brand.svg'
import { Button } from '@/components/ui/button'
import { Container } from '@/components/ui/container'
import { checkUserProfile } from '@/http/check-user-profile'
import { auth } from '@/lib/auth'

export async function Header() {
	const session = await auth()

	const profile =
		session?.user?.id && (await checkUserProfile(session.user?.id))

	return (
		<Container className="absolute left-0 right-0 top-0 z-50">
			<header className="flex items-center justify-between py-6 sm:py-8 xl:py-10">
				<Link href="/" className="focus-themed block w-[167px] sm:w-[187px]">
					<Image
						src={brandImage}
						width={187}
						height={157}
						alt="ProjectInBio"
						className="h-auto w-full"
					/>
				</Link>

				<div className="hidden flex-1 flex-grow justify-end gap-4 sm:flex">
					{profile && session?.user && (
						<Button as={Link} size="sm" href={`/${profile.slug}`}>
							Minha página
						</Button>
					)}

					{!profile && session?.user && (
						<Button as={Link} size="sm" href="create">
							Criar uma página
						</Button>
					)}

					<form action={authActions}>
						{session ? (
							<Button size="sm" variant="ghost">
								Sair
							</Button>
						) : (
							<Button size="sm">Entrar</Button>
						)}
					</form>
				</div>

				<div className="sm:hidden">
					<DropdownMenu.Root>
						<DropdownMenu.Trigger asChild>
							<Button variant="ghost" icon>
								<Menu />
							</Button>
						</DropdownMenu.Trigger>

						<DropdownMenu.Content
							align="end"
							className="flex flex-col gap-3 rounded-xl bg-background-primary p-4"
						>
							{profile && session?.user && (
								<Button as={Link} size="sm" href={`/${profile.slug}`}>
									Minha página
								</Button>
							)}

							{!profile && session?.user && (
								<Button as={Link} size="sm" href="create">
									Criar uma página
								</Button>
							)}

							<form action={authActions}>
								{session ? (
									<Button size="sm" variant="ghost">
										Sair
									</Button>
								) : (
									<Button size="sm">Entrar</Button>
								)}
							</form>
						</DropdownMenu.Content>
					</DropdownMenu.Root>
				</div>
			</header>
		</Container>
	)
}
