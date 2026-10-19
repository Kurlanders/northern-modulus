'use client'

import { useEffect } from 'react'
import { ThemeProvider as NextThemesProvider, useTheme } from 'next-themes'

export const THEME_STORAGE_KEY = 'nm-theme'

// layout.tsx ships the dark theme-color (the default); once the theme is known on the
// client (e.g. a stored "light" choice, or after toggling), match the active --nm-bg.
function ThemeColorSync() {
  const { resolvedTheme } = useTheme()

  useEffect(() => {
    if (!resolvedTheme) return
    // Wait a frame: this child effect runs before next-themes swaps the class on <html>.
    const frame = requestAnimationFrame(() => {
      const channels = getComputedStyle(document.documentElement).getPropertyValue('--nm-bg').trim()
      if (!channels) return
      const color = `rgb(${channels.split(/\s+/).join(', ')})`
      document.querySelectorAll('meta[name="theme-color"]').forEach((meta) => meta.setAttribute('content', color))
    })
    return () => cancelAnimationFrame(frame)
  }, [resolvedTheme])

  return null
}

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem={false}
      storageKey={THEME_STORAGE_KEY}
      disableTransitionOnChange
    >
      <ThemeColorSync />
      {children}
    </NextThemesProvider>
  )
}
