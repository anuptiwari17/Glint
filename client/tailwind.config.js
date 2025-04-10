/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./src/**/*.{js,jsx,ts,tsx}",
    ],
    darkMode: 'class',
    theme: {
      extend: {
        colors: {
          primary: {
            light: '#6366f1',
            dark: '#4f46e5',
          },
          background: {
            light: '#ffffff',
            dark: '#121212',
          },
          surface: {
            light: '#f3f4f6',
            dark: '#1e1e1e',
          },
          text: {
            light: '#111827',
            dark: '#f3f4f6',
          }
        },
      },
    },
    plugins: [],
  }