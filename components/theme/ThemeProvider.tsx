'use client'

import { useEffect } from 'react'
import { ThemeProvider as NextThemesProvider, useTheme } from 'next-themes'

export const THEME_STORAGE_KEY = 'nm-theme'

// The <meta name="theme-color"> tags from layout.tsx follow the system setting; when a
// visitor picks a theme manually, point them at the active --nm-bg instead.
function ThemeColorSync() {
  const { resolvedTheme } = useTheme()

  useEffect(() => {
    if (!resolvedTheme) return
    const channels = getComputedStyle(document.documentElement).getPropertyValue('--nm-bg').trim()
    if (!channels) return
    const color = `rgb(${channels.split(/\s+/).join(', ')})`
    document.querySelectorAll('meta[name="theme-color"]').forEach((meta) => meta.setAttribute('content', color))
  }, [resolvedTheme])

  return null
}

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      storageKey={THEME_STORAGE_KEY}
      disableTransitionOnChange
    >
      <ThemeColorSync />
      {children}
    </NextThemesProvider>
  )
}
