import type { Config } from 'tailwindcss'

export default {
	content: [
		'./src/pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/components/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		extend: {
			screens: {
				xs: '410px',
			},

			boxShadow: {
				toast:
					'0 -10px 15px -3px rgb(0 0 0 / 0.1), 0 -4px 6px -4px rgb(0 0 0 / 0.1)',
			},

			animation: {
				accordionOpen: 'accordionSlideDown 300ms ease-out',
				accordionClose: 'accordionSlideUp 300ms ease-out',
				collapsibleOpen: 'collapsibleSlideDown 300ms ease-out',
				collapsibleClose: 'collapsibleSlideUp 300ms ease-out',
			},

			keyframes: {
				accordionSlideDown: {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' },
				},

				accordionSlideUp: {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' },
				},

				collapsibleSlideDown: {
					from: { height: '0' },
					to: { height: 'var(--radix-collapsible-content-height)' },
				},

				collapsibleSlideUp: {
					from: { height: 'var(--radix-collapsible-content-height)' },
					to: { height: '0' },
				},
			},

			colors: {
				'accent-purple': '#4B2DBB',
				'accent-purple-hover': '#482BB2',
				'accent-green': '#87BB2D',
				'accent-green-hover': '#80B22B',
				'accent-pink': '#B5446B',
				'accent-pink-hover': '#AD4267',

				'button-secondary': '#19191A',
				'button-secondary-hover': '#20202A',
				'button-secondary-focus': '#30303A',
				'button-ghost': '#19191A',
				'button-ghost-hover': '#30303A',
				'button-ghost-focus': '#50505A',

				'input-border-hover': '#323234',
				'input-border-focus': '#424244',
				'input-placeholder': '#827D7F',

				'card-background': '#101010',
				'card-border': '#2B2B2B',

				'sticky-background': '#0F0F0F',
				'sticky-border': '#21212A',

				'background-primary': '#050505',
				'background-secondary': '#0F0F10',
				'background-tertiary': '#19191A',

				'image-background': '#1E1E1E',

				// old
				'background-modal': '#191919',
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
			},
		},
	},
	plugins: [],
} satisfies Config
