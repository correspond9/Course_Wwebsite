/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ["class"],
    content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
  	extend: {
      fontFamily: {
        sans: ['Inter', 'Plus Jakarta Sans', 'system-ui', '-apple-system', 'sans-serif'],
      },
  		borderRadius: {
  			lg: '12px',
  			md: '10px',
  			sm: '8px',
        xl: '16px',
        '2xl': '20px',
  		},
  		colors: {
  			background: '#FFFFFF',
  			foreground: '#0f172a',
        slate: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
        },
        navy: {
          DEFAULT: '#1e3a5f',
          dark: '#152a45',
        },
        accent: {
          red: '#B91C1C',
          'red-dark': '#991b1b',
        },
  			card: {
  				DEFAULT: '#FFFFFF',
  				foreground: '#0f172a'
  			},
  			popover: {
  				DEFAULT: '#FFFFFF',
  				foreground: '#0f172a'
  			},
  			primary: {
  				DEFAULT: '#1e3a5f',
  				foreground: '#FFFFFF'
  			},
  			secondary: {
  				DEFAULT: '#f1f5f9',
  				foreground: '#0f172a'
  			},
  			muted: {
  				DEFAULT: '#f1f5f9',
  				foreground: '#64748b'
  			},
  			accent: {
  				DEFAULT: '#f1f5f9',
  				foreground: '#0f172a'
  			},
  			destructive: {
  				DEFAULT: '#B91C1C',
  				foreground: '#FFFFFF'
  			},
  			border: '#e2e8f0',
  			input: '#e2e8f0',
  			ring: '#1e3a5f',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
      boxShadow: {
        'soft': '0 2px 8px rgba(0, 0, 0, 0.04)',
        'soft-lg': '0 4px 16px rgba(0, 0, 0, 0.06)',
        'soft-xl': '0 8px 24px rgba(0, 0, 0, 0.08)',
      },
  		keyframes: {
  			'accordion-down': {
  				from: {
  					height: '0'
  				},
  				to: {
  					height: 'var(--radix-accordion-content-height)'
  				}
  			},
  			'accordion-up': {
  				from: {
  					height: 'var(--radix-accordion-content-height)'
  				},
  				to: {
  					height: '0'
  				}
  			}
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
};