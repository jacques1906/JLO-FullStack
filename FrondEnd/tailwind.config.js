/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background-color)',
        text: 'var(--text-color)',
        accent: 'var(--accent-color)',
        secondary: 'var(--secondary-background)',
        tertiary: 'var(--tertiary-background)',
      },
      keyframes: {
        slideIn: {
          'from': { transform: 'translateX(100%)', opacity: '0' },
          'to': { transform: 'translateX(0)', opacity: '1' },
        },
        progress: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0)' }
        }
      },
      animation: {
        slideIn: 'slideIn 0.3s ease-out',
        progress: 'progress 3s linear',
      },
    },
  },
  plugins: [],
  variants: {
    extend: {
      animation: ['hover', 'group-hover'],
    },
  },
}

