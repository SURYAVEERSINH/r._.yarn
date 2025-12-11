/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#FFC1CC', // Pastel Pink
        secondary: '#E0F7FA', // Soft Blue/Cyan (Early Spring Sky)
        accent: '#BDE0FE', // Sky Blue
        fresh: '#C1E1C1', // Fresh Green (New Leaves)
        glass: 'rgba(255, 255, 255, 0.25)', // Glassmorphism base
      },
      fontFamily: {
        sans: ['Nunito', 'sans-serif'],
        cute: ['Quicksand', 'sans-serif'],
      },
      backgroundImage: {
        'spring-gradient': 'linear-gradient(135deg, #E0F7FA 0%, #F0F4F8 50%, #FFC1CC 100%)',
      }
    },
  },
  plugins: [],
}
