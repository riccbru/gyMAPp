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
  			background: 'hsl(259.09, 95.65%, 9.02%)',   /* 0f012d */
  			foreground: 'hsl(240, 100%, 99.8%)',        /* fefeff */
            primary: 'hsl(228.57, 61.76%, 13.33%)',     /* 0d1537 */
            green: 'hsl(172.34, 83.93%, 56.08%)',       /* 31edd5 */
            white: 'hsl(240 100% 99.8%)',
            gray: 'hsl(234.9, 11.05%, 44.98%)',         /* 66687f */       
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
}

