/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./resources/**/*.edge",
    "./resources/**/*.js",
    "./resources/**/*.ts",
    "./inertia/**/*.vue", // Ini bagian paling penting untuk desain kamu
  ],
  theme: {
    extend: {
      colors: {
        eotech: '#0D4433', // Warna hijau tua desain kamu
      }
    },
  },
  plugins: [],
}