import Image from 'next/image'

import { authActions } from '@/app/actions/auth'
import brandImage from '@/assets/brand.svg'
import { Button } from '@/components/ui/button'
import { Container } from '@/components/ui/container'
import { auth } from '@/lib/auth'

export async function Header() {
	const session = await auth()

	return (
		<Container className="absolute left-0 right-0 top-0 z-50">
			<header className="flex items-center justify-between py-10">
				<Image src={brandImage} width={187} height={132} alt="ProjectInBio" />

				<div className="flex flex-1 flex-grow justify-end gap-4">
					{session && <Button>Minha página</Button>}

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
