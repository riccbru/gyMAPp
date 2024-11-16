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
  			background: 'hsl(259.09, 95.65%, 9.02%)',       /* 0f012d */
  			foreground: 'hsl(240, 100%, 99.8%)',            /* fefeff */
            primary: 'hsl(228.57, 61.76%, 13.33%)',     /* 0d1537 */
            green: 'hsl(172.34, 83.93%, 56.08%)',       /* 31edd5 */
            white: 'hsl(240 100% 99.8%)',
            gray: 'hsl(234.9, 11.05%, 44.98%)',         /* 66687f */
            red: 'hsl(350 99.2% 50%)',                  /* fe012d */
            mahogany: 'hsl(0 100% 15.5%)',              /* 4f0000 */
            panna: 'hsl(240 50% 89.8%)',
            sred: 'hsl(358.9, 97.32%, 43.92%)',         /* dd0307 */
            lightRed: 'hsl(350 76% 45%)',               /* ca1c39 */
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
}

