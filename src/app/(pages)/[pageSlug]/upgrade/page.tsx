import { Header } from '@/components/sections/header'
import { Text } from '@/components/ui/text'
import { PlansButtons } from '@/components/upgrade/plans-buttons'

export default async function Upgrade() {
	return (
		<div className="flex min-h-screen flex-col items-center justify-center gap-4">
			<Header />

			<Text as="h1" variant="heading-md">
				Escolha o plano
			</Text>

			<div className="flex gap-4">
				<PlansButtons />
			</div>
		</div>
	)
}
