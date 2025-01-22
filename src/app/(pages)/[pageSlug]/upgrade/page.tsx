import { Header } from '@/components/sections/header'
import { Button } from '@/components/ui/button'
import { Text } from '@/components/ui/text'

type ParamsProps = {
	pageSlug: string
}

type Props = {
	params: Promise<ParamsProps>
}

export default async function Upgrade({ params }: Props) {
	const { pageSlug } = await params

	return (
		<div className="flex min-h-screen flex-col items-center justify-center gap-4">
			<Header />

			<Text as="h1" variant="heading-md">
				Escolha o plano ({pageSlug})
			</Text>

			<div className="flex gap-4">
				<Button>R$ 9,90 /mês</Button>

				<Button>R$ 99,90 /ano</Button>
			</div>
		</div>
	)
}
