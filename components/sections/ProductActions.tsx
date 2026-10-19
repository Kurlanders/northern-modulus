'use client'

import { track } from '@vercel/analytics'
import Button from '@/components/ui/Button'

export default function ProductActions({ slug, stripePaymentLink }: { slug: string; stripePaymentLink?: string }) {
  // Stripe opens in the same tab, so it's not marked external.
  if (stripePaymentLink) {
    return (
      <Button href={stripePaymentLink} size="lg" withArrow onClick={() => track('buy_clicked', { product: slug })} className="w-full sm:w-auto">
        Buy now
      </Button>
    )
  }

  return (
    <Button
      href={`/contact?product=${encodeURIComponent(slug)}`}
      size="lg"
      withArrow
      onClick={() => track('enquiry_clicked', { product: slug })}
      className="w-full sm:w-auto"
    >
      Order via enquiry
    </Button>
  )
}
