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
            primary: 'hsl(172.34, 83.93%, 56.08%)',
            white: 'hsl(240 100% 99.8%)',
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
}

