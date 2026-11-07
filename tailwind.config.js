/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#080C14',
        surface: '#0D1422',
        'surface-subtle': '#11192B',
        'primary-text': '#F8FAFC',
        'secondary-text': '#CBD5E1',
        'muted-text': '#94A3B8',
        'accent-blue': '#2563EB',
        'accent-blue-deep': '#0038A8',
        'accent-green': '#10B981',
        'accent-green-bright': '#22C55E',
        'subtle-border': 'rgba(255, 255, 255, 0.10)',
        'subtle-border-hover': 'rgba(255, 255, 255, 0.22)',
      },
      backgroundImage: {
        'brand-gradient': 'linear-gradient(135deg, #10B981 0%, #2563EB 50%, #0038A8 100%)',
        'brand-gradient-h': 'linear-gradient(90deg, #10B981 0%, #2563EB 100%)',
        'brand-gradient-subtle': 'linear-gradient(135deg, rgba(16, 185, 129, 0.08) 0%, rgba(37, 99, 235, 0.08) 100%)',
        'card-gradient': 'linear-gradient(180deg, rgba(255, 255, 255, 0.03) 0%, rgba(255, 255, 255, 0.01) 100%)',
      },
      fontFamily: {
        sans: [
          'Inter',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'Helvetica Neue',
          'Arial',
          'sans-serif',
        ],
        mono: [
          'JetBrains Mono',
          'ui-monospace',
          'SFMono-Regular',
          'Menlo',
          'monospace',
        ],
      },
      maxWidth: {
        content: '1200px',
      },
      screens: {
        xs: '375px',
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1200px',
        '2xl': '1440px',
      },
    },
  },
  plugins: [],
}
