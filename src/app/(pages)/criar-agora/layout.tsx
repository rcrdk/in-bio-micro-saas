import { redirect } from 'next/navigation'

import { getPageByUserId } from '@/http/get-page-by-user-id'
import { auth } from '@/lib/auth'

type Props = {
	children: React.ReactNode
}

export default async function RootLayout({ children }: Props) {
	const session = await auth()

	if (!session?.user?.id) {
		return redirect('/')
	}

	const page = await getPageByUserId(session.user.id)

	if (page) {
		return redirect(`/in/${page.slug}`)
	}

	return <>{children}</>
}
