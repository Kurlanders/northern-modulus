/** Join class names, filtering out falsy values */
export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ')
}

/** Format a number with leading zero (e.g. 1 → "01") */
export function padIndex(n: number, pad = 2): string {
  return String(n).padStart(pad, '0')
}
