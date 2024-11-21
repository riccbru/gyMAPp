/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ["class"],
    content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
  	extend: {
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		colors: {
  			background: 'hsl(259.09, 95.65%, 9.02%)',
  			foreground: 'hsl(240, 100%, 99.8%)',
  			primary: 'hsl(228.57, 61.76%, 13.33%)',
  			green: 'hsl(172.34, 83.93%, 56.08%)',
  			white: 'hsl(240 100% 99.8%)',
  			gray: 'hsl(234.9, 11.05%, 44.98%)',
  			red: 'hsl(350 99.2% 50%)',
  			mahogany: 'hsl(0 100% 15.5%)',
  			panna: 'hsl(240 50% 89.8%)',
  			sred: 'hsl(358.9, 97.32%, 43.92%)',
  			lightRed: 'hsl(350 76% 45%)'
  		},
  		keyframes: {
  			'accordion-down': {
  				from: {
  					height: '0'
  				},
  				to: {
  					height: 'var(--radix-accordion-content-height)'
  				}
  			},
  			'accordion-up': {
  				from: {
  					height: 'var(--radix-accordion-content-height)'
  				},
  				to: {
  					height: '0'
  				}
  			}
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.3s ease-out',
  			'accordion-up': 'accordion-up 0.3s ease-out'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
}

