import Link from 'next/link'
import { redirect } from 'next/navigation'
import type { Metadata } from 'next'
import ReserveForm from '@/components/shop/ReserveForm'
import ProductVisual, { primaryImage } from '@/components/shop/ProductVisual'
import {
  SHOP_COPY,
  formatPrice,
  getPublishedProduct,
  leadTimeLabel,
  reservationLabel,
  reservationSummary,
  resolveConfig,
} from '@/lib/data/products'

export const metadata: Metadata = {
  title: 'Reserve',
  description: 'Reserve an NM Mast System product. No payment now: we confirm availability and delivery by email.',
  robots: { index: false, follow: true },
}

type Params = Record<string, string | string[] | undefined>

export default function ReservePage({ searchParams }: { searchParams: Params }) {
  const single = (key: string) => (typeof searchParams[key] === 'string' ? (searchParams[key] as string) : undefined)
  const product = getPublishedProduct(single('product') ?? '')
  if (!product) redirect('/shop')
  if (product.availability === 'quote') redirect(`/shop/${product.slug}`)

  // The price comes from products.ts, never from the URL.
  const values = Object.fromEntries((product.options ?? []).map((option) => [option.id, single(option.id)]))
  const config = resolveConfig(product, values, Number(single('qty')) || 1)
  const preorder = product.availability === 'preorder'

  return (
    <div className="pt-[100px] md:pt-[116px] pb-16 md:pb-24 bg-nm-bg">
      <div className="site-container">
        <nav aria-label="Breadcrumb" className="mb-6 text-[13px] text-nm-text-t">
          <Link href="/shop" className="hover:text-nm-text-p transition-colors underline-offset-2 hover:underline">Shop</Link>
          <span className="mx-2" aria-hidden="true">/</span>
          <Link href={`/shop/${product.slug}`} className="hover:text-nm-text-p transition-colors underline-offset-2 hover:underline">{product.name}</Link>
          <span className="mx-2" aria-hidden="true">/</span>
          <span className="text-nm-text-s">Reserve</span>
        </nav>

        <h1 className="text-[clamp(32px,4vw,52px)] font-bold text-nm-text-p leading-[1.08] tracking-[-0.025em] mb-3">
          Reserve your {preorder ? 'pre-order' : 'order'}.
        </h1>
        <p className="text-[15px] leading-[1.7] text-nm-text-s max-w-[60ch] mb-10">{SHOP_COPY.reserveNote}</p>

        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_420px] gap-10 xl:gap-16 items-start">
          <div className="min-w-0 order-2 lg:order-1">
            <ReserveForm
              slug={product.slug}
              productName={product.name}
              quantity={config.quantity}
              total={config.total}
              summary={reservationSummary(product, config)}
              reservationLabel={reservationLabel(product)}
              shipping={leadTimeLabel(product)}
            />
          </div>

          <aside className="order-1 lg:order-2 border border-nm-border bg-nm-s1" aria-label="Your reservation">
            <div className="relative aspect-[16/9] border-b border-nm-border overflow-hidden">
              <div className="absolute inset-0 line-grid opacity-40 pointer-events-none" aria-hidden="true" />
              <ProductVisual src={primaryImage(product.images)} alt={product.name} bare />
            </div>
            <div className="p-6">
              <p className="font-mono text-[12px] uppercase tracking-[1.5px] text-nm-green-text mb-2">{reservationLabel(product)}</p>
              <h2 className="text-[20px] font-bold text-nm-text-p mb-4">{product.name}</h2>
              <dl className="text-[15px] border-t border-nm-border">
                {config.selections.map(({ option, choice }) => (
                  <div key={option.id} className="flex justify-between gap-4 py-2.5 border-b border-nm-border">
                    <dt className="text-nm-text-s">{option.label}</dt>
                    <dd className="text-right text-nm-text-p">
                      {choice.label}
                      {choice.priceDeltaEur > 0 && ` (+${formatPrice(choice.priceDeltaEur)})`}
                    </dd>
                  </div>
                ))}
                <div className="flex justify-between gap-4 py-2.5 border-b border-nm-border">
                  <dt className="text-nm-text-s">Quantity</dt>
                  <dd className="text-nm-text-p">{config.quantity}</dd>
                </div>
                <div className="flex justify-between gap-4 py-2.5 border-b border-nm-border">
                  <dt className="text-nm-text-s">Lead time</dt>
                  <dd className="text-right text-nm-text-p">{leadTimeLabel(product)}</dd>
                </div>
                <div className="flex items-baseline justify-between gap-4 pt-4">
                  <dt className="font-mono text-[12px] uppercase tracking-[1.5px] text-nm-text-s">Total</dt>
                  <dd className="text-[26px] font-bold text-nm-text-p leading-none">{formatPrice(config.total)}</dd>
                </div>
              </dl>
              <p className="mt-3 text-[13px] text-nm-text-t">{SHOP_COPY.vatNote}. Delivery, if any, is quoted separately.</p>
              <Link href={`/shop/${product.slug}`} className="inline-block mt-4 text-[15px] font-semibold text-nm-green-text underline-offset-4 hover:underline hover:text-nm-green-bright">
                Change configuration
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}
