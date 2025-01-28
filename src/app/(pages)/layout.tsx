import '@/styles/globals.css'

import { GoogleAnalytics } from '@next/third-parties/google'
import { Red_Hat_Display as RedHatDisplay } from 'next/font/google'

import { env } from '@/lib/env'

const redHatDisplay = RedHatDisplay({
	subsets: ['latin'],
	weight: ['400', '500', '700'],
})

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang="pt-br" className="bg-background-primary">
			<body
				className={`bg-background-primary text-content-body antialiased ${redHatDisplay.className}`}
			>
				{children}
			</body>

			{env.NEXT_PUBLIC_GOOGLE_ANALYTICS && (
				<GoogleAnalytics gaId={env.NEXT_PUBLIC_GOOGLE_ANALYTICS} />
			)}
		</html>
	)
}
