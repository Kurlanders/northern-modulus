import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        nm: {
          // Backgrounds
          bg: '#0C0D0F',
          's1': '#131517',
          's2': '#1A1D20',
          's3': '#222528',
          // Borders
          border: '#242729',
          'border-mid': '#2E3236',
          'border-light': '#383C40',
          // Green system — aligned with Northern Modulus logo (deep forest green)
          'green-deep': '#0E1F18',
          'green-mid': '#162B1F',
          'green-accent': '#245040',
          'green-bright': '#2D6349',
          'green-text': '#4D8F6A',
          'green-dim': '#3A6B53',
          // Text hierarchy
          'text-p': '#E8E5DF',
          'text-s': '#8C8A85',
          'text-t': '#565450',
          // Steel
          steel: '#4A5058',
          'steel-l': '#686E76',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'monospace'],
      },
      fontSize: {
        // Display scale — low weight, tight tracking
        'disp-2xl': ['clamp(3rem,6vw,5.5rem)', { lineHeight: '1.03', letterSpacing: '-0.035em', fontWeight: '300' }],
        'disp-xl':  ['clamp(2.5rem,5vw,4.5rem)',  { lineHeight: '1.05', letterSpacing: '-0.03em',  fontWeight: '300' }],
        'disp-lg':  ['clamp(2rem,4vw,3.5rem)',    { lineHeight: '1.08', letterSpacing: '-0.025em', fontWeight: '300' }],
        'disp-md':  ['clamp(1.75rem,3vw,2.75rem)',{ lineHeight: '1.1',  letterSpacing: '-0.02em',  fontWeight: '300' }],
        'disp-sm':  ['clamp(1.5rem,2.5vw,2rem)',  { lineHeight: '1.15', letterSpacing: '-0.015em', fontWeight: '400' }],
        // Heading scale
        'h1': ['1.625rem', { lineHeight: '1.2',  letterSpacing: '-0.012em', fontWeight: '500' }],
        'h2': ['1.375rem', { lineHeight: '1.25', letterSpacing: '-0.01em',  fontWeight: '500' }],
        'h3': ['1.125rem', { lineHeight: '1.3',  letterSpacing: '-0.006em', fontWeight: '500' }],
        'h4': ['1rem',     { lineHeight: '1.35', letterSpacing: '-0.003em', fontWeight: '500' }],
        // Body scale
        'body-lg': ['1.0625rem', { lineHeight: '1.65', letterSpacing: '0.005em' }],
        'body-md': ['0.9375rem', { lineHeight: '1.7',  letterSpacing: '0.005em' }],
        'body-sm': ['0.875rem',  { lineHeight: '1.65', letterSpacing: '0.005em' }],
        // Label / tag scale — mono or tracked uppercase
        'label-lg': ['0.8125rem', { lineHeight: '1', letterSpacing: '0.14em', fontWeight: '500' }],
        'label-md': ['0.75rem',   { lineHeight: '1', letterSpacing: '0.12em', fontWeight: '500' }],
        'label-sm': ['0.6875rem', { lineHeight: '1', letterSpacing: '0.1em',  fontWeight: '600' }],
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '26': '6.5rem',
        '30': '7.5rem',
        '34': '8.5rem',
        '38': '9.5rem',
        '42': '10.5rem',
        '46': '11.5rem',
        '50': '12.5rem',
        '54': '13.5rem',
        '58': '14.5rem',
        '62': '15.5rem',
        '66': '16.5rem',
        '70': '17.5rem',
      },
      maxWidth: {
        'site': '1320px',
        'wide': '1100px',
        'content': '900px',
        'narrow': '680px',
        'xs2': '480px',
      },
      borderRadius: {
        'sm2': '3px',
      },
      animation: {
        'fade-up': 'fadeUp 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'line-grow': 'lineGrow 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
      },
      keyframes: {
        fadeUp: {
          '0%':   { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
        lineGrow: {
          '0%':   { transform: 'scaleX(0)' },
          '100%': { transform: 'scaleX(1)' },
        },
      },
      transitionTimingFunction: {
        'out-expo': 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [],
}

export default config
