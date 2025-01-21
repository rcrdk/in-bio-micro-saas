import { Rocket } from 'lucide-react'

import { CreateLinkForm } from '@/components/create/create-link-form'
import { Header } from '@/components/sections/header'
import { Text } from '@/components/ui/text'

export default function Create() {
	return (
		<>
			<Header />

			<div className="mx-auto flex min-h-svh max-w-xl flex-col items-center justify-center gap-10">
				<div className="flex items-center gap-4">
					<Text as="h1" variant="heading-md">
						Escolha o seu link
					</Text>
					<Rocket className="size-10" />
				</div>

				<CreateLinkForm />
			</div>
		</>
	)
}
