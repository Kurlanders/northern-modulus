'use client'

import { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'

type Variant = 'pill' | 'icon' | 'menu'

const base =
  'inline-flex items-center justify-center gap-2 border border-nm-border-light text-nm-text-p bg-transparent hover:bg-nm-s2 hover:border-nm-field transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-nm-green-text'

const variantClasses: Record<Variant, string> = {
  // Same 40px height as the header "Get a Quote" button; min width so "Light mode"/"Dark mode" don't shift layout.
  pill: 'h-10 min-w-[128px] px-4 rounded-full text-[13px] font-medium',
  icon: 'h-10 w-10 min-w-10 rounded-full',
  menu: 'h-12 w-full px-4 text-[15px] font-medium',
}

function SunIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
    </svg>
  )
}

function MoonIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  )
}

export default function ThemeToggle({ variant = 'pill', className = '' }: { variant?: Variant; className?: string }) {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  const classes = `${base} ${variantClasses[variant]} ${className}`
  const isDark = !mounted || resolvedTheme !== 'light'
  const content = (
    <>
      {isDark ? <SunIcon /> : <MoonIcon />}
      {variant !== 'icon' && <span>{isDark ? 'Light mode' : 'Dark mode'}</span>}
    </>
  )

  // Same-size placeholder until mounted (the theme isn't known during SSR), to avoid a hydration mismatch.
  if (!mounted || !resolvedTheme) {
    return (
      <span className={classes} aria-hidden="true">
        <span className="invisible inline-flex items-center gap-2">{content}</span>
      </span>
    )
  }

  const label = isDark ? 'Switch to light mode' : 'Switch to dark mode'

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      aria-label={label}
      title={label}
      className={classes}
    >
      {content}
    </button>
  )
}
