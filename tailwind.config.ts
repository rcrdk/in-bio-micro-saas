import type { Config } from 'tailwindcss'

export default {
	content: [
		'./src/pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/components/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		extend: {
			colors: {
				'background-primary': '#050505',
				'background-secondary': '#0F0F10',
				'background-tertiary': '#19191A',
				'background-card': '#121212',
				'background-card-divider': '#1E1E1E',
				'background-card-button': '#1E1E1E',
				'background-card-button-hover': '#2E2E2E',
				'content-body': '#CDCBCC',
				'content-placeholder': '#827D7F',
				'content-headline': '#B2B2B2',
				'border-primary': '#19191A',
				'border-secondary': '#323234',
				'border-tertiary': '#97979B',
				'accent-purple': '#4B2DBB',
				'accent-purple-darken': '#4328a8',
				'accent-green': '#87BB2D',
				'accent-pink': '#B5446B',
			},
		},
	},
	plugins: [],
} satisfies Config
