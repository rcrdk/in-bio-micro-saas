import { redirect } from 'next/navigation'

import { getProfileByUserId } from '@/http/get-profile-by-user-id'
import { auth } from '@/lib/auth'

type Props = {
	children: React.ReactNode
}

export default async function RootLayout({ children }: Props) {
	const session = await auth()

	if (!session?.user?.id) {
		return redirect('/')
	}

	const profile = await getProfileByUserId(session.user.id)

	if (profile) {
		return redirect(`/in/${profile.slug}`)
	}

	return <>{children}</>
}
