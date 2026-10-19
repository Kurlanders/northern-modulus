// <meta name="theme-color"> can't read CSS variables, so these must match --nm-bg in
// app/globals.css. ThemeColorSync replaces them at runtime after a manual theme switch.
export const THEME_COLOR_META = {
  light: '#F7F6F2',
  dark: '#0C0D0F',
} as const
