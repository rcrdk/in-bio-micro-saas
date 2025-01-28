import { redirect } from 'next/navigation'

import { checkUserProfile } from '@/http/check-user-profile'
import { auth } from '@/lib/auth'

type Props = {
	children: React.ReactNode
}

export default async function RootLayout({ children }: Props) {
	const session = await auth()

	if (!session?.user?.id) {
		return redirect('/')
	}

	const profile = await checkUserProfile(session.user.id)

	if (profile) {
		return redirect(`/${profile.slug}`)
	}

	return <>{children}</>
}
