import type { Metadata } from 'next'

export const SITE_NAME = 'Northern Modulus'

// Page-level openGraph replaces the root one entirely, so siteName/type are repeated here.
export function pageMetadata(title: string, description: string): Metadata {
  return {
    title,
    description,
    openGraph: {
      type: 'website',
      siteName: SITE_NAME,
      title: `${title} — ${SITE_NAME}`,
      description,
    },
  }
}
