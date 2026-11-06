'use client'

import { track } from '@vercel/analytics'
import Button from '@/components/ui/Button'
import { useStickyBarPadding } from '@/components/shop/ProductBuyBox'
import { SHOP_COPY, priceLabel, stockLabel, type Product } from '@/lib/data/products'

// Products priced by quote: no configurator, the CTA opens the quote form pre-filled.
export default function QuoteBox({ product }: { product: Product }) {
  useStickyBarPadding()
  const href = `/contact?product=${product.slug}`
  const onCta = () => track('reserve_click', { product: product.slug })
  return (
    <>
      <div className="border border-nm-border bg-nm-s1 p-6 md:p-7">
        <p className="font-mono text-[12px] uppercase tracking-[1.5px] text-nm-green-text mb-3">{stockLabel(product)}</p>
        <h1 className="text-[clamp(26px,2.4vw,34px)] font-bold text-nm-text-p leading-[1.12] tracking-[-0.025em] mb-4">
          {product.name}
        </h1>
        <p className="text-[28px] font-bold text-nm-text-p tracking-[-0.02em] leading-none">{priceLabel(product)}</p>
        <p className="mt-2 mb-7 text-[13px] text-nm-text-t">{SHOP_COPY.vatNote}</p>
        <Button href={href} onClick={onCta} size="lg" withArrow className="w-full">
          Request configuration
        </Button>
        <p className="mt-4 text-[13px] leading-[1.6] text-nm-text-s">
          Tell us the height, the payload and the use. We reply with a configuration and a price within 2 business days.
        </p>
      </div>
      <div className="lg:hidden fixed left-0 right-0 bottom-0 z-40 border-t border-nm-border-mid bg-nm-bg px-4 py-3 flex items-center justify-between gap-4">
        <p className="text-[20px] font-bold text-nm-text-p leading-none">{priceLabel(product)}</p>
        <Button href={href} onClick={onCta} size="md" withArrow>
          Request configuration
        </Button>
      </div>
    </>
  )
}
