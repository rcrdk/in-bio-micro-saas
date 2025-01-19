import { Rocket } from 'lucide-react'

import { Header } from '@/components/sections/header'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
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

				<form action="" className="flex items-center gap-2">
					<Text variant="body-lg" as="span" className="leading-none text-white">
						projectinbio.com/
					</Text>

					<Input placeholder="Seu link" />

					<Button className="w-36">Criar</Button>
				</form>

				<div>
					<Text className="text-red-500">Erro de exemplo</Text>
				</div>
			</div>
		</>
	)
}
