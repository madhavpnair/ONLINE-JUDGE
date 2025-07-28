// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', // Enable dark mode support toggling but not working
  content: [
    "./index.html", 
    "./src/**/*.{js,ts,jsx,tsx}", // Scans all JS, TS, JSX, TSX files in the src folder
  ],
   theme: {
    extend: {
      animation: {
        glitter: 'glitter 2s infinite linear',
      },
      keyframes: {
        glitter: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(200%)' },
        },
      },
    },
  },
  plugins: [],
}