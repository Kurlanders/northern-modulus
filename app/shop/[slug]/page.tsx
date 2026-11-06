import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { ReactNode } from 'react'
import Button from '@/components/ui/Button'
import Illustration from '@/components/shop/Illustrations'
import ShopGallery from '@/components/shop/ShopGallery'
import ProductBuyBox from '@/components/shop/ProductBuyBox'
import QuoteBox from '@/components/shop/QuoteBox'
import ShopTrack from '@/components/shop/ShopTrack'
import { ProductCard } from '@/components/shop/ProductGrid'
import { pageMetadata } from '@/lib/metadata'
import { company } from '@/lib/company'
import {
  MAST_PAGE,
  PREORDER_SHIP_DATE,
  SHOP_COPY,
  USE_CASES,
  getPublishedProduct,
  leadTimeLabel,
  priceLabel,
  publishedProducts,
  stockLabel,
  type Product,
} from '@/lib/data/products'

export const dynamicParams = false

const FLAGSHIP_SLUG = 'nm-mast-event'
const SITE_URL = `https://${company.domain}`

export function generateStaticParams() {
  return publishedProducts.map((p) => ({ slug: p.slug }))
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const product = getPublishedProduct(params.slug)
  if (!product) return {}
  return pageMetadata(product.name, `${product.shortDescription} ${priceLabel(product)}. ${stockLabel(product)}, made in Riga.`, `/pictures/shop/og/${product.slug}.png`)
}

const AVAILABILITY_SCHEMA = {
  preorder: 'https://schema.org/PreOrder',
  'made-to-order': 'https://schema.org/MadeToOrder',
  quote: 'https://schema.org/MadeToOrder',
}

function productJsonLd(product: Product) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.shortDescription,
    sku: product.slug,
    material: product.material,
    url: `${SITE_URL}/shop/${product.slug}`,
    image: `${SITE_URL}/pictures/shop/og/${product.slug}.png`,
    brand: { '@type': 'Brand', name: 'Northern Modulus' },
    offers: {
      '@type': 'Offer',
      url: `${SITE_URL}/shop/${product.slug}`,
      priceCurrency: 'EUR',
      price: product.priceEur,
      availability: AVAILABILITY_SCHEMA[product.availability ?? 'made-to-order'],
      ...(product.availability === 'preorder' ? { availabilityStarts: product.shipsFrom ?? PREORDER_SHIP_DATE } : {}),
      seller: { '@type': 'Organization', name: 'Northern Modulus' },
    },
  }
}

function Section({ label, title, children }: { label: string; title: string; children: ReactNode }) {
  return (
    <section className="pt-12 mt-12 border-t border-nm-border">
      <p className="text-[12px] font-medium text-nm-text-s tracking-[2.5px] uppercase mb-4">{`// ${label}`}</p>
      <h2 className="text-[clamp(24px,2.6vw,34px)] font-bold text-nm-text-p leading-[1.15] tracking-[-0.02em] mb-7">{title}</h2>
      {children}
    </section>
  )
}

function RatedLoads() {
  return (
    <p className="border border-dashed border-nm-field px-4 py-3 font-mono text-[13px] leading-[1.55] text-nm-text-p bg-nm-s2">
      {SHOP_COPY.ratedLoads}
    </p>
  )
}

function SpecTable({ rows, ratedLoads }: { rows: { label: string; value: string }[]; ratedLoads: boolean }) {
  return (
    <>
      <table className="w-full border-t border-nm-border text-[15px]">
        <caption className="sr-only">Specifications</caption>
        <tbody>
          {rows.map((row) => (
            <tr key={row.label} className="border-b border-nm-border">
              <th scope="row" className="py-3.5 pr-6 text-left align-top font-mono font-normal text-nm-text-s uppercase tracking-[1px] text-[12px] w-[40%] leading-[1.7]">
                {row.label}
              </th>
              <td className="py-3.5 text-nm-text-p">{row.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {ratedLoads && <div className="mt-4"><RatedLoads /></div>}
    </>
  )
}

function CheckList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-3">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-3 text-[15px] leading-[1.65] text-nm-text-s">
          <span className="mt-[9px] w-1.5 h-1.5 bg-nm-green-text flex-shrink-0" aria-hidden="true" />
          {item}
        </li>
      ))}
    </ul>
  )
}

function Disclosure({ summary, children, open = false }: { summary: string; children: ReactNode; open?: boolean }) {
  return (
    <details open={open} className="group border-b border-nm-border">
      <summary className="flex items-center justify-between gap-4 min-h-[52px] py-3 cursor-pointer list-none [&::-webkit-details-marker]:hidden text-[15px] font-semibold text-nm-text-p hover:text-nm-green-text transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-nm-green-text">
        {summary}
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true" className="flex-shrink-0 motion-safe:transition-transform duration-200 group-open:rotate-45">
          <path d="M7 1.5V12.5M1.5 7H12.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </summary>
      <div className="pb-5 text-[15px] leading-[1.7] text-nm-text-s">{children}</div>
    </details>
  )
}

function FlagshipSections() {
  return (
    <>
      <Section label="How it works" title="Base, tube, collar, tube, top, guy line.">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          <figure className="relative border border-nm-border bg-nm-s1">
            <div className="absolute inset-0 line-grid opacity-40 pointer-events-none" aria-hidden="true" />
            <div className="relative aspect-[7/10] p-4">
              <Illustration name="exploded" />
            </div>
          </figure>
          <div>
            <ol className="space-y-2.5 mb-8">
              {MAST_PAGE.howItWorks.callouts.map((callout, index) => (
                <li key={callout} className="flex items-baseline gap-3 text-[15px] text-nm-text-p">
                  <span className="font-mono text-[13px] text-nm-green-text">{index + 1}</span>
                  {callout}
                </li>
              ))}
            </ol>
            <h3 className="font-mono text-[12px] uppercase tracking-[1.5px] text-nm-text-s mb-4">Setup in 4 steps</h3>
            <ol className="space-y-4">
              {MAST_PAGE.howItWorks.steps.map((step, index) => (
                <li key={step.title}>
                  <p className="text-[15px] font-semibold text-nm-text-p">{index + 1}. {step.title}</p>
                  <p className="text-[15px] leading-[1.65] text-nm-text-s">{step.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </Section>

      <Section label="Use cases" title="One mast. Many jobs.">
        <div className="grid grid-cols-1 sm:grid-cols-2 border-l border-t border-nm-border">
          {USE_CASES.map((useCase) => (
            <Link
              key={useCase.id}
              href={useCase.href}
              className="border-r border-b border-nm-border bg-nm-s1 hover:bg-nm-s2 transition-colors duration-200 flex flex-col focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-nm-green-text"
            >
              <div className="aspect-[16/9] overflow-hidden">
                <Illustration name={useCase.illustration} slice decorative />
              </div>
              <div className="p-5">
                <h3 className="text-[17px] font-bold text-nm-text-p mb-1.5">{useCase.title}</h3>
                <p className="text-[15px] leading-[1.6] text-nm-text-s">{useCase.text}</p>
              </div>
            </Link>
          ))}
        </div>
      </Section>

      <Section label="Why GFRP" title="Why glass fibre, not steel or aluminium.">
        <p className="text-[15px] leading-[1.7] text-nm-text-s mb-6 max-w-[62ch]">
          {SHOP_COPY.tube}. A qualitative comparison, so you can decide whether it suits your job.
        </p>
        <div className="overflow-x-auto" tabIndex={0} role="region" aria-label="Comparison of GFRP, steel and aluminium">
          <table className="w-full min-w-[560px] text-[15px] border-t border-nm-border">
            <thead>
              <tr className="border-b border-nm-border text-left">
                <th scope="col" className="py-3 pr-4 font-mono font-normal text-[12px] uppercase tracking-[1px] text-nm-text-s">Property</th>
                <th scope="col" className="py-3 pr-4 font-semibold text-nm-green-text">GFRP</th>
                <th scope="col" className="py-3 pr-4 font-semibold text-nm-text-p">Steel</th>
                <th scope="col" className="py-3 font-semibold text-nm-text-p">Aluminium</th>
              </tr>
            </thead>
            <tbody>
              {MAST_PAGE.comparisonRows.map((row) => (
                <tr key={row.label} className="border-b border-nm-border align-top">
                  <th scope="row" className="py-3 pr-4 text-left font-mono font-normal text-[12px] uppercase tracking-[1px] text-nm-text-s leading-[1.7]">{row.label}</th>
                  <td className="py-3 pr-4 text-nm-text-p">{row.gfrp}</td>
                  <td className="py-3 pr-4 text-nm-text-s">{row.steel}</td>
                  <td className="py-3 text-nm-text-s">{row.aluminium}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <section className="mt-12 border-t border-nm-border">
        <Disclosure summary="Engineering notes (calculated, not tested)">
          <ul className="space-y-3 mb-5">
            {MAST_PAGE.engineeringNotes.map((note) => (
              <li key={note} className="font-mono text-[13px] leading-[1.7]">{note}</li>
            ))}
          </ul>
          <RatedLoads />
        </Disclosure>
      </section>
    </>
  )
}

export default function ProductPage({ params }: { params: { slug: string } }) {
  const product = getPublishedProduct(params.slug)
  if (!product) notFound()

  const flagship = product.slug === FLAGSHIP_SLUG
  const quote = product.availability === 'quote'
  const showsRatedLoads = ['kit', 'bundle', 'accessory', 'engineering'].includes(product.category ?? '')
  const specs = [
    ...(product.specs ?? [
      { label: 'Material', value: product.material },
      { label: 'Fits', value: product.dimensions },
    ]),
    { label: 'Lead time', value: leadTimeLabel(product) },
  ]
  const related = (product.relatedSlugs ?? []).map(getPublishedProduct).filter((p): p is Product => !!p)

  return (
    <>
      <ShopTrack event="product_view" product={product.slug} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd(product)).replace(/</g, '\\u003c') }}
      />

      <div className="pt-[100px] md:pt-[116px] pb-16 md:pb-24 bg-nm-bg">
        <div className="site-container">
          <nav aria-label="Breadcrumb" className="mb-6 text-[13px] text-nm-text-t">
            <Link href="/shop" className="hover:text-nm-text-p transition-colors underline-offset-2 hover:underline">Shop</Link>
            <span className="mx-2" aria-hidden="true">/</span>
            <span className="text-nm-text-s">{product.name}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_420px] gap-x-12 xl:gap-x-16 gap-y-8 lg:grid-rows-[auto_1fr]">
            <div className="lg:col-start-1 lg:row-start-1 min-w-0">
              <ShopGallery images={product.images} name={product.name} />
            </div>

            <div className="lg:col-start-2 lg:row-start-1 lg:row-span-2">
              <div className="lg:sticky lg:top-[88px] lg:max-h-[calc(100vh-104px)] lg:overflow-y-auto">
                {quote ? <QuoteBox product={product} /> : <ProductBuyBox product={product} />}
              </div>
            </div>

            <div className="lg:col-start-1 lg:row-start-2 min-w-0">
              <p className="text-[17px] leading-[1.7] text-nm-text-s max-w-[64ch]">{product.description}</p>

              {flagship && (
                <ul className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-px bg-nm-border border border-nm-border">
                  {MAST_PAGE.whyPoints.map((point) => (
                    <li key={point.title} className="bg-nm-s1 p-5">
                      <p className="text-[15px] font-semibold text-nm-text-p mb-1">{point.title}</p>
                      <p className="text-[15px] leading-[1.6] text-nm-text-s">{point.text}</p>
                    </li>
                  ))}
                </ul>
              )}

              <Section label="Specifications" title={flagship ? 'Key specs.' : 'Specs.'}>
                <SpecTable rows={specs} ratedLoads={showsRatedLoads} />
                {!quote && (
                  <p className="mt-5 text-[15px] leading-[1.7] text-nm-text-s">
                    {SHOP_COPY.deliveryNote}
                  </p>
                )}
              </Section>

              {flagship && <FlagshipSections />}

              <Section label="Safety" title="Safety and use.">
                <CheckList items={quote ? MAST_PAGE.safety.filter((item) => !item.includes('extension')) : MAST_PAGE.safety} />
              </Section>

              {product.inTheBox && (
                <Section label="In the box" title="What's in the box.">
                  <CheckList items={product.inTheBox} />
                </Section>
              )}

              {product.faq && (
                <Section label="FAQ" title="Questions.">
                  <div className="border-t border-nm-border">
                    {product.faq.map((item) => (
                      <Disclosure key={item.q} summary={item.q}>{item.a}</Disclosure>
                    ))}
                  </div>
                  <p className="mt-6 text-[15px] text-nm-text-s">
                    Standard shop products can be returned within 14 days.{' '}
                    <Link href="/returns" className="underline hover:text-nm-text-p">Returns policy</Link>
                  </p>
                  <p className="mt-3 text-[15px] text-nm-text-s">
                    Need a different size?{' '}
                    <Button href="/contact" variant="text" size="md" withArrow>Get a custom quote</Button>
                  </p>
                </Section>
              )}
            </div>
          </div>

          {related.length > 0 && (
            <section className="pt-12 mt-12 border-t border-nm-border">
              <p className="text-[12px] font-medium text-nm-text-s tracking-[2.5px] uppercase mb-4">{'// Related'}</p>
              <h2 className="text-[clamp(24px,2.6vw,34px)] font-bold text-nm-text-p leading-[1.15] tracking-[-0.02em] mb-7">Works with this.</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-l border-t border-nm-border">
                {related.map((item) => (
                  <ProductCard key={item.slug} product={item} />
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </>
  )
}
