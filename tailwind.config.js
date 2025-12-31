/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        financio: {
          glass: '#0f172a',    // Base color for glass panels
          primary: '#3B82F6',  // Bright Blue (Active states)
          text: '#f8fafc',     // Slate 50 (Main text)
          muted: '#94a3b8',    // Slate 400 (Secondary text)
          success: '#10b981',  // Emerald Green
          danger: '#ef4444',   // Red
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      backdropBlur: {
        'xs': '2px',
      }
    },
  },
  plugins: [],
}
