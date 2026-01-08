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
          muted: '#cbd5e1',    // Slate 300 (Secondary text)
          subtle: '#e2e8f0', // Slate-200 for secondary headings
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
