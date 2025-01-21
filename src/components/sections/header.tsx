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
			<header className="flex items-center justify-between py-10">
				<Image src={brandImage} width={187} height={132} alt="ProjectInBio" />

				<div className="flex flex-1 flex-grow justify-end gap-4">
					{profile && (
						<Button as={Link} href={`/${profile.slug}`}>
							Minha página
						</Button>
					)}

					{!profile && session?.user && (
						<Button as={Link} href="create">
							Criar uma página
						</Button>
					)}

					<form action={authActions}>
						{session ? (
							<Button variant="ghost">Sair</Button>
						) : (
							<Button>Entrar</Button>
						)}
					</form>
				</div>
			</header>
		</Container>
	)
}
