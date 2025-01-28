import { CreateNow } from '@/app/(pages)/create/create-now'
import { Header } from '@/components/sections/header'
import { Container } from '@/components/ui/container'
import { Text } from '@/components/ui/text'

export default function Home() {
	return (
		<>
			<Header hidePageButton />

			<Container className="flex min-h-svh items-center py-24">
				<div className="flex flex-col gap-6">
					<Text variant="heading-md" className="text-center">
						Escolha um link
					</Text>

					<CreateNow />
				</div>
			</Container>
		</>
	)
}
