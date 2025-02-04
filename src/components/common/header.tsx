import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { CirclePlus, CircleUserRound, LogOut, Menu } from 'lucide-react'
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

				<div className="flex flex-1 grow justify-end gap-4">
					{session?.user && !hidePageButton && (
						<Button
							as={Link}
							size="sm"
							href={profile ? `/in/${profile.slug}` : '/criar-agora'}
							className="hidden sm:flex"
						>
							{profile ? <CircleUserRound /> : <CirclePlus />}
							{profile ? 'Minha página' : 'Criar uma página'}
						</Button>
					)}

					<form
						action={authAction}
						className={session ? 'hidden sm:block' : undefined}
					>
						<Button size="sm" variant="tranluscent">
							{session ? (
								<LogOut strokeWidth={1.5} />
							) : (
								<CircleUserRound strokeWidth={1.5} />
							)}

							{session ? 'Sair' : 'Entrar'}
						</Button>
					</form>
				</div>

				{session?.user && (
					<DropdownMenu.Root>
						<DropdownMenu.Trigger asChild>
							<Button
								variant="tranluscent"
								icon
								aria-label="Menu"
								className="flex sm:hidden"
							>
								<Menu />
							</Button>
						</DropdownMenu.Trigger>

						<DropdownMenu.Content
							align="end"
							className="bg-sticky-background border-sticky-border pointer-events-auto flex flex-col gap-1 rounded-xl border p-2 shadow-lg select-none"
							sideOffset={8}
						>
							{profile && !hidePageButton && (
								<DropdownMenu.Item
									className="focus-themed hover:bg-button-ghost flex w-full cursor-pointer items-center justify-start gap-3 py-2 pr-6 pl-4 text-left font-medium transition-colors"
									asChild
								>
									<Link href={`/in/${profile.slug}`}>
										<CircleUserRound size={20} />
										Minha página
									</Link>
								</DropdownMenu.Item>
							)}

							{!profile && !hidePageButton && (
								<DropdownMenu.Item
									className="focus-themed hover:bg-button-ghost flex w-full cursor-pointer items-center justify-start gap-3 py-2 pr-6 pl-4 text-left font-medium transition-colors"
									asChild
								>
									<Link href="/criar-agora">
										<CirclePlus size={20} />
										Criar uma página
									</Link>
								</DropdownMenu.Item>
							)}

							<form action={authAction}>
								<button
									type="submit"
									className="focus-themed hover:bg-button-ghost flex w-full cursor-pointer items-center justify-start gap-3 py-2 pr-6 pl-4 text-left font-medium transition-colors"
								>
									<LogOut size={20} />
									Finalizar sessão
								</button>
							</form>
						</DropdownMenu.Content>
					</DropdownMenu.Root>
				)}
			</header>
		</Container>
	)
}
