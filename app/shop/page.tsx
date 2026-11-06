import Link from 'next/link'
import Button from '@/components/ui/Button'
import ShopVisual from '@/components/sections/ShopVisual'
import Illustration from '@/components/shop/Illustrations'
import ProductGrid from '@/components/shop/ProductGrid'
import ShopTrack from '@/components/shop/ShopTrack'
import { pageMetadata } from '@/lib/metadata'
import { SHOP_COPY, SHOP_HERO, TRUST_POINTS, USE_CASES, catalogue, publishedProducts } from '@/lib/data/products'

export const metadata = pageMetadata(
  publishedProducts.length > 0 ? 'Shop: NM Mast System' : 'Shop',
  publishedProducts.length > 0
    ? "Telescoping glass-fibre masts and printed parts, engineered and made in Riga. For festoon lighting, flags, shade sails, camera rigs and metal-free antenna masts. Pre-orders open."
    : 'Standard 3D printed parts from Northern Modulus, ready to order. First products launching soon.',
  publishedProducts.length > 0 ? '/pictures/shop/og/shop.png' : undefined
)

function ComingSoon() {
  return (
    <section className="relative min-h-[80vh] pt-[140px] pb-[100px] bg-nm-bg overflow-hidden flex items-center">
      <div className="absolute inset-0 line-grid opacity-20 pointer-events-none" aria-hidden="true" />
      <div className="site-container relative w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        <div>
          <p className="text-[12px] font-medium text-nm-text-s tracking-[2.5px] uppercase mb-6">
            {'// Shop'}
          </p>
          <h1 className="text-[clamp(32px,4.5vw,64px)] font-bold text-nm-text-p leading-[1.1] tracking-[-0.025em] mb-6">
            First products<br />
            <span className="text-nm-text-s font-medium">launching soon.</span>
          </h1>
          <p className="text-[15px] text-nm-text-s leading-[1.8] max-w-[480px] mb-10">
            Standard printed parts, ready to order, are on the way. Need a part now? Custom prints
            are available today — send a file or describe what you need.
          </p>
          <Button href="/contact" size="lg" withArrow>
            Get a Quote
          </Button>
        </div>
        <ShopVisual />
      </div>
    </section>
  )
}

export default function ShopPage() {
  if (publishedProducts.length === 0) return <ComingSoon />

  return (
    <>
      <ShopTrack event="shop_view" />

      {/* Hero: always dark, because it is a dusk scene. The 'dark' class re-scopes the tokens in light mode too. */}
      <section className="dark relative bg-nm-bg overflow-hidden flex flex-col lg:block lg:min-h-[760px]">
        <div className="order-2 relative aspect-[4/3] sm:aspect-[16/9] lg:aspect-auto lg:absolute lg:inset-0">
          <Illustration name="scene-hero" slice />
          <div
            className="hidden lg:block absolute inset-0 pointer-events-none"
            aria-hidden="true"
            style={{ background: 'linear-gradient(90deg, rgb(var(--nm-bg)) 18%, rgb(var(--nm-bg) / 0.82) 40%, transparent 62%)' }}
          />
        </div>
        <div className="order-1 site-container relative w-full pt-[116px] pb-10 lg:pt-[180px] lg:pb-[100px]">
          <div className="max-w-[620px]">
            <p className="text-[12px] font-medium text-nm-text-s tracking-[2.5px] uppercase mb-6">
              {`// ${SHOP_HERO.eyebrow}`}
            </p>
            <h1 className="text-[clamp(36px,5vw,72px)] font-bold text-nm-text-p leading-[1.05] tracking-[-0.03em] mb-6">
              {SHOP_HERO.headlineTop}
              <br />
              <span className="text-nm-green-text">{SHOP_HERO.headlineBottom}</span>
            </h1>
            <p className="text-[17px] text-nm-text-s leading-[1.7] max-w-[520px] mb-9">{SHOP_HERO.subline}</p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button href="/shop/nm-mast-event" size="lg" withArrow>
                Reserve the Event Mast
              </Button>
              <Button href="#parts" variant="secondary" size="lg">
                See all parts
              </Button>
            </div>
            <p className="mt-5 text-[13px] text-nm-text-t">{SHOP_COPY.illustrationNote}</p>
          </div>
        </div>
      </section>

      {/* One mast. Many jobs. */}
      <section className="py-16 md:py-20 bg-nm-bg border-b border-nm-border">
        <div className="site-container">
          <p className="text-[12px] font-medium text-nm-text-s tracking-[2.5px] uppercase mb-5">{'// Use cases'}</p>
          <h2 className="text-[clamp(28px,3.4vw,44px)] font-bold text-nm-text-p leading-[1.1] tracking-[-0.025em] mb-10">
            One mast. Many jobs.
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-px bg-nm-border border border-nm-border">
            {USE_CASES.map((useCase) => (
              <Link
                key={useCase.id}
                href={useCase.href}
                className="group bg-nm-s1 hover:bg-nm-s2 transition-colors duration-200 flex flex-col focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-nm-green-text"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <Illustration
                    name={useCase.illustration}
                    slice
                    decorative
                    className="motion-safe:transition-transform motion-safe:duration-500 motion-safe:group-hover:scale-[1.03]"
                  />
                </div>
                <div className="p-5 flex-1">
                  <h3 className="text-[17px] font-bold text-nm-text-p tracking-[-0.01em] mb-2">{useCase.title}</h3>
                  <p className="text-[15px] text-nm-text-s leading-[1.6]">{useCase.text}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Catalogue */}
      <section id="parts" className="py-16 md:py-20 bg-nm-bg border-b border-nm-border scroll-mt-[68px]">
        <div className="site-container">
          <p className="text-[12px] font-medium text-nm-text-s tracking-[2.5px] uppercase mb-5">{'// Catalogue'}</p>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 mb-8">
            <h2 className="text-[clamp(28px,3.4vw,44px)] font-bold text-nm-text-p leading-[1.1] tracking-[-0.025em]">
              Kits and parts.
            </h2>
            <p className="text-[15px] text-nm-text-s max-w-[460px]">
              Prices are final. {SHOP_COPY.vatNote}. {SHOP_COPY.deliveryNote}
            </p>
          </div>
          <ProductGrid products={catalogue} />
          <p className="mt-4 text-[13px] text-nm-text-t">{SHOP_COPY.illustrationNote}</p>
        </div>
      </section>

      {/* Trust strip */}
      <section className="bg-nm-s1 border-b border-nm-border" aria-label="Why buy from us">
        <div className="site-container py-7">
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-x-6 gap-y-3">
            {TRUST_POINTS.map((point) => (
              <li key={point} className="flex items-start gap-2.5 text-[15px] text-nm-text-p">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="mt-1 flex-shrink-0 text-nm-green-text" aria-hidden="true">
                  <path d="M3 8.5L6.5 12L13 4.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {point}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Custom work */}
      <section className="py-16 md:py-20 bg-nm-bg">
        <div className="site-container">
          <div className="border border-nm-border bg-nm-s1 p-8 md:p-12 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
            <div>
              <h2 className="text-[clamp(24px,2.6vw,34px)] font-bold text-nm-text-p leading-[1.15] tracking-[-0.02em] mb-3">
                Need something custom?
              </h2>
              <p className="text-[15px] text-nm-text-s leading-[1.7] max-w-[560px]">
                Custom parts, tooling, moulds, and collars for other tube sizes. Send a file or describe what you need,
                and we reply within one business day.
              </p>
            </div>
            <Button href="/contact" size="lg" withArrow className="self-start lg:self-auto flex-shrink-0">
              Get a Quote
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}
