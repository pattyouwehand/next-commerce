/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ["class"],
    content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
  		colors: {
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			red: {
					DEFAULT: '#f52c2c',
  				dark: '#8B1A27'
  			},
  			purple: {
  				DEFAULT: '#D8CFE5',
  			},
  			pink: {
  				DEFAULT: '#E8BFC8',
					light: '#F4D3D6'
  			},
  			white: {
  				DEFAULT: '#ffffff',
  				pearl: '#F8F7F2'
  			},
  			beige: {
  				DEFAULT: '#F7E7CE',
  				nude: '#F5E2C8'
  			},
  			gray: {
  				DEFAULT: '#b8b6b6',
  				dark: '#4A4A4A',
					light: '#edebeb'
  			},
  			blue: {
  				dark: '#2C3E50',
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
			fontFamily: {
        sans: ['var(--font-inter)'],
        mono: ['var(--font-roboto-mono)'],
      },
  	}
  },
  plugins: [
		require("tailwindcss-animate"),
		require('@tailwindcss/typography')
	],
};
