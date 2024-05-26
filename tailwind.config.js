/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      backgroundImage: {
        auth: 'linear-gradient(315deg, #fff 0%, #fad4e4 100%)',
      },
      boxShadow: {
        task: 'box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.08)',
      },
    },
  },
  plugins: [],
}
