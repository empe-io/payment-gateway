import type { Config } from 'tailwindcss';

export default {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        main: {
          100: '#00afff',
          200: '#007eff',
          300: '#e200ed',
          400: '#242529',
          500: '#000000',
          600: '#ffffff',
          700: '#1B1B1B',
          800: '#A5A6A8',
          900: '#2D2E32',
          1000: '#0F152B',
          1100: '#595959',
          1200: '#191E33',
          1300: '#282A30'
        },
        opacity: {
          100: '#282A3066'
        },
        status: {
          init: '#007eff',
          pending: '#FEF603',
          failed: '#FF4608',
          active: '#49FF2D',
          deleted: '#A5A6A8'
        }
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif']
      },
      width: {
        'box-100': '500px'
      },
      height: {
        'box-100': '450px'
      },
      padding: {
        'box-50': '20px',
        'box-100': '40px'
      }
    }
  },
  safelist: [
    'bg-status-init',
    'bg-status-pending',
    'bg-status-failed',
    'bg-status-active',
    'bg-status-deleted'
  ],
  plugins: []
} satisfies Config;
