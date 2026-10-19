'use client'

import Link from 'next/link'
import { track } from '@vercel/analytics'

const buttonClass =
  'block w-full sm:w-auto sm:inline-block text-center bg-nm-green-text text-nm-on-green px-10 py-4 text-[14px] font-semibold hover:bg-nm-green-bright transition-colors'

export default function ProductActions({ slug, stripePaymentLink }: { slug: string; stripePaymentLink?: string }) {
  if (stripePaymentLink) {
    return (
      <a href={stripePaymentLink} onClick={() => track('buy_clicked', { product: slug })} className={buttonClass}>
        Buy now →
      </a>
    )
  }

  return (
    <Link
      href={`/contact?product=${encodeURIComponent(slug)}`}
      onClick={() => track('enquiry_clicked', { product: slug })}
      className={buttonClass}
    >
      Order via enquiry →
    </Link>
  )
}
