'use client'

import { useEffect } from 'react'
import { track } from '@vercel/analytics'

// Sends one page-level event per visit to the page. Vercel Analytics is cookieless, like the rest of the site.
export default function ShopTrack({ event, product }: { event: 'shop_view' | 'product_view'; product?: string }) {
  useEffect(() => {
    track(event, product ? { product } : {})
  }, [event, product])
  return null
}
