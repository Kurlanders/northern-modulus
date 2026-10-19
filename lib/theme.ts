// Every first visit opens in dark (next-themes defaultTheme="dark", system preference ignored).
// <meta name="theme-color"> can't read CSS variables, so this must match the dark --nm-bg in
// app/globals.css. ThemeColorSync replaces it at runtime when the light theme is active.
export const DEFAULT_THEME_COLOR = '#0C0D0F'
