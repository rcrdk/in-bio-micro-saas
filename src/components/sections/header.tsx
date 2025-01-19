import Image from 'next/image'

import brandImage from '@/assets/brand.svg'
import { Button } from '@/components/ui/button'
import { Container } from '@/components/ui/container'

export function Header() {
	return (
		<Container className="absolute left-0 right-0 top-0 z-50">
			<header className="flex items-center justify-between py-10">
				<Image src={brandImage} width={187} height={132} alt="ProjectInBio" />

				<div className="flex flex-1 flex-grow justify-end gap-4">
					<Button>Minha página</Button>
					<Button variant="ghost">Sair</Button>
				</div>
			</header>
		</Container>
	)
}
