'use client'

import '@/styles/globals.css'

import { GoogleAnalytics } from '@next/third-parties/google'
import { CircleAlert, CircleCheck } from 'lucide-react'
import { Red_Hat_Display as RedHatDisplay } from 'next/font/google'
import { Toaster } from 'sonner'

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

				<Toaster
					position="bottom-center"
					duration={10000}
					toastOptions={{
						classNames: {
							toast: 'px-6 gap-6',
							title: 'text-sm font-medium',
							description: 'text-sm',
							error: 'bg-red-500 border-red-500 text-white shadow-toast',
							success:
								'bg-accent-green border-accent-green text-white shadow-toast',
						},
					}}
					icons={{
						error: <CircleAlert size={20} />,
						success: <CircleCheck size={20} />,
					}}
				/>
			</body>

			{env.NEXT_PUBLIC_GOOGLE_ANALYTICS && (
				<GoogleAnalytics gaId={env.NEXT_PUBLIC_GOOGLE_ANALYTICS} />
			)}
		</html>
	)
}
