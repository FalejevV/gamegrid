/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}',
  './pages/**/*.{js,ts,jsx,tsx,mdx}',
  './components/**/*.{js,ts,jsx,tsx,mdx}',
  './layout/**/*.{js,ts,jsx,tsx,mdx}'],
  
  theme: {
    extend: {
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        btn: {
          background: 'hsl(var(--btn-background))',
          'background-hover': 'hsl(var(--btn-background-hover))',
        },
      },
      screens: {
        'md': '880px',
        'max800': {
          'max' : '799px'
        },
        'min800': {
          'min' : '800px'
        },
        'summary-lg': '1070px',
        "k": "1000px",
        "f": "512px"
        // => @media (min-width: 992px) { ... }
      },
    },
  },
  plugins: [],
}
