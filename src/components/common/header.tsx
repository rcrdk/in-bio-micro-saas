import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { Menu } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

import { authAction } from '@/app/actions/auth'
import brandImage from '@/assets/brand.svg'
import { Button } from '@/components/ui/button'
import { Container } from '@/components/ui/container'
import { getProfileByUserId } from '@/http/get-profile-by-user-id'
import { auth } from '@/lib/auth'

type Props = {
	hidePageButton?: boolean
}

export async function Header({ hidePageButton = false }: Props) {
	const session = await auth()

	// eslint-disable-next-line prettier/prettier
	const profile = session?.user?.id && (await getProfileByUserId(session.user.id))

	return (
		<Container className="absolute top-0 right-0 left-0 z-50">
			<header className="flex items-center justify-between py-6 sm:py-8 xl:py-10">
				<Link
					href="/"
					className="focus-themed block w-[167px] select-none sm:w-[187px]"
				>
					<Image
						src={brandImage}
						width={187}
						height={157}
						alt="ProjectInBio"
						className="h-auto w-full"
					/>
				</Link>

				<div className="hidden flex-1 grow justify-end gap-4 sm:flex">
					{profile && session?.user && !hidePageButton && (
						<Button as={Link} size="sm" href={`/in/${profile.slug}`}>
							Minha página
						</Button>
					)}

					{!profile && session?.user && !hidePageButton && (
						<Button as={Link} size="sm" href="/criar-agora">
							Criar uma página
						</Button>
					)}

					<form action={authAction}>
						<Button size="sm" variant={session ? 'ghost' : 'primary'}>
							{session ? 'Sair' : 'Entrar'}
						</Button>
					</form>
				</div>

				<div className="sm:hidden">
					<DropdownMenu.Root>
						<DropdownMenu.Trigger asChild>
							<Button
								variant="ghost"
								icon
								aria-label="Menu"
								className="bg-background-primary"
							>
								<Menu />
							</Button>
						</DropdownMenu.Trigger>

						<DropdownMenu.Content
							align="end"
							className="border-button-ghost bg-background-primary flex flex-col gap-3 rounded-xl border p-4 shadow-2xl"
							sideOffset={8}
						>
							{profile && session?.user && !hidePageButton && (
								<DropdownMenu.Item asChild>
									<Button
										as={Link}
										size="sm"
										href={`/in/${profile.slug}`}
										className="w-full"
									>
										Minha página
									</Button>
								</DropdownMenu.Item>
							)}

							{!profile && session?.user && !hidePageButton && (
								<Button
									as={Link}
									size="sm"
									href="/criar-agora"
									className="w-full"
								>
									Criar uma página
								</Button>
							)}

							<form action={authAction}>
								<DropdownMenu.Item asChild>
									<Button
										size="sm"
										variant={session ? 'ghost' : 'primary'}
										className="w-full"
									>
										{session ? 'Sair' : 'Entrar'}
									</Button>
								</DropdownMenu.Item>
							</form>
						</DropdownMenu.Content>
					</DropdownMenu.Root>
				</div>
			</header>
		</Container>
	)
}
