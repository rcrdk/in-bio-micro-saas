'use client'

import '@/styles/globals.css'

import { Red_Hat_Display as RedHatDisplay } from 'next/font/google'
import { GoogleAnalytics, GoogleTagManager } from '@next/third-parties/google'
import { CircleAlert, CircleCheck, Info } from 'lucide-react'
import { Toaster } from 'sonner'

import Cookies from '@/components/ui/cookies'
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
		<html lang="pt-br" translate="no" className="bg-background-primary">
			<body className={`bg-background-primary text-content-body antialiased ${redHatDisplay.className}`}>
				{children}

				<Toaster
					position="top-center"
					duration={5000}
					toastOptions={{
						unstyled: true,
						classNames: {
							toast:
								'text-center justify-center flex items-center py-3 px-6 gap-6 text-white shadow-toast text-balance h-[var(--initial-height)] rounded-xl select-none',
							title: 'text-sm font-medium',
							icon: '!size-6 !m-0',
							description: 'text-sm',
							error: 'bg-red-500 border-red-500',
							success: 'bg-accent-green border-accent-green',
							info: 'bg-accent-purple border-accent-purple',
						},
					}}
					icons={{
						info: <Info />,
						error: <CircleAlert size={24} />,
						success: <CircleCheck size={24} />,
					}}
				/>

				<Cookies />
			</body>

			{process.env.NODE_ENV === 'production' && (
				<>
					{env.NEXT_PUBLIC_GOOGLE_ANALYTICS && <GoogleAnalytics gaId={env.NEXT_PUBLIC_GOOGLE_ANALYTICS} />}

					{env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER && <GoogleTagManager gtmId={env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER} />}
				</>
			)}
		</html>
	)
}
