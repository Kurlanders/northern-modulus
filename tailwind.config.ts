import type { Config } from 'tailwindcss'

// Values live in app/globals.css as RGB channels (light on :root, dark on .dark).
const NM_TOKENS = [
  'bg', 's1', 's2', 's3',
  'border', 'border-mid', 'border-light', 'field',
  'green-deep', 'green-mid', 'green-accent', 'green-bright', 'green-text', 'green-dim', 'on-green',
  'text-p', 'text-s', 'text-t',
  'steel', 'steel-l',
  'error', 'error-bg', 'error-border',
] as const

const nmColors = Object.fromEntries(
  NM_TOKENS.map((token) => [token, `rgb(var(--nm-${token}) / <alpha-value>)`])
)

const config: Config = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        nm: nmColors,
      },
      fontFamily: {
        sans: ['var(--font-outfit)', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'monospace'],
      },
      fontSize: {
        'disp-2xl': ['clamp(3rem,6vw,5.5rem)',   { lineHeight: '1.03', letterSpacing: '-0.035em' }],
        'disp-xl':  ['clamp(2.5rem,5vw,4.5rem)', { lineHeight: '1.05', letterSpacing: '-0.03em'  }],
        'disp-lg':  ['clamp(2rem,4vw,3.5rem)',   { lineHeight: '1.08', letterSpacing: '-0.025em' }],
        'disp-md':  ['clamp(1.75rem,3vw,2.75rem)',{ lineHeight: '1.1', letterSpacing: '-0.02em'  }],
        'disp-sm':  ['clamp(1.5rem,2.5vw,2rem)', { lineHeight: '1.15', letterSpacing: '-0.015em' }],
        'h1': ['1.625rem', { lineHeight: '1.2',  letterSpacing: '-0.012em' }],
        'h2': ['1.375rem', { lineHeight: '1.25', letterSpacing: '-0.01em'  }],
        'h3': ['1.125rem', { lineHeight: '1.3',  letterSpacing: '-0.006em' }],
        'h4': ['1rem',     { lineHeight: '1.35', letterSpacing: '-0.003em' }],
        'body-lg': ['1.0625rem', { lineHeight: '1.65', letterSpacing: '0.005em' }],
        'body-md': ['0.9375rem', { lineHeight: '1.7',  letterSpacing: '0.005em' }],
        // Minimums: paragraph text 15px, labels/eyebrows 12px.
        'body-sm': ['0.9375rem', { lineHeight: '1.65', letterSpacing: '0.005em' }],
        'label-lg': ['0.8125rem', { lineHeight: '1', letterSpacing: '0.14em' }],
        'label-md': ['0.75rem',   { lineHeight: '1', letterSpacing: '0.12em' }],
        'label-sm': ['0.75rem',   { lineHeight: '1', letterSpacing: '0.1em'  }],
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
        'site':    '1440px',
        'wide':    '1100px',
        'content': '900px',
        'narrow':  '680px',
        'xs2':     '480px',
      },
      borderRadius: {
        'sm2': '3px',
      },
      animation: {
        'fade-up':  'fadeUp 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'fade-in':  'fadeIn 0.5s ease-out forwards',
        'line-grow':'lineGrow 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
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
