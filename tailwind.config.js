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
			fontFamily: {
        inter: ['var(--font-inter)'],
				lora: ['var(--font-lora)'],
        vibes: ['var(--font-great-vibes)']
      },
  		colors: {
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
  			}
  		}
  	}
  },
  plugins: [
		require("tailwindcss-animate"),
		require("@tailwindcss/typography")
	]
}
