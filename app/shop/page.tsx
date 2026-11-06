import Link from 'next/link'
import Button from '@/components/ui/Button'
import ShopVisual from '@/components/sections/ShopVisual'
import Image from 'next/image'
import ProductGrid from '@/components/shop/ProductGrid'
import ShopTrack from '@/components/shop/ShopTrack'
import { pageMetadata } from '@/lib/metadata'
import { HERO_RENDER, SHOP_COPY, SHOP_HERO, TRUST_POINTS, USE_CASES, catalogue, imageAlt, publishedProducts } from '@/lib/data/products'

export const metadata = pageMetadata(
  publishedProducts.length > 0 ? 'Shop: NM Mast System' : 'Shop',
  publishedProducts.length > 0
    ? "Telescoping glass-fibre masts and printed parts, engineered and made in Riga. For festoon lighting, flags, shade sails, camera rigs and metal-free antenna masts. Pre-orders open."
    : 'Standard 3D printed parts from Northern Modulus, ready to order. First products launching soon.',
  publishedProducts.length > 0 ? '/pictures/shop/og/shop.jpg' : undefined
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
      <section className="dark relative bg-nm-bg overflow-hidden md:min-h-[640px] lg:min-h-[760px] md:flex md:items-center">
        <div className="relative mt-[68px] aspect-[4/5] md:mt-0 md:aspect-auto md:absolute md:inset-0">
          <Image
            src={HERO_RENDER}
            alt={imageAlt(HERO_RENDER, 'NM Event Mast')}
            fill
            priority
            sizes="(max-width: 767px) 222vw, 100vw"
            className="object-cover object-[50%_50%] md:object-[22%_40%]"
          />
          <div
            className="hidden md:block absolute inset-0 pointer-events-none"
            aria-hidden="true"
            style={{ background: 'linear-gradient(90deg, rgb(var(--nm-bg)) 0%, rgb(var(--nm-bg) / 0.92) 30%, rgb(var(--nm-bg) / 0.72) 40%, transparent 50%)' }}
          />
        </div>
        <div className="site-container relative w-full pt-8 pb-10 md:pt-[100px] md:pb-16">
          <div className="md:max-w-[400px] xl:max-w-[560px]">
            <p className="text-[12px] font-medium text-nm-text-s tracking-[2.5px] uppercase mb-6">
              {`// ${SHOP_HERO.eyebrow}`}
            </p>
            <h1 className="text-[clamp(36px,5vw,72px)] font-bold text-nm-text-p leading-[1.05] tracking-[-0.03em] mb-6">
              {SHOP_HERO.headlineTop}
              <br />
              <span className="text-nm-green-text">{SHOP_HERO.headlineBottom}</span>
            </h1>
            <p className="text-[17px] text-nm-text-s leading-[1.7] mb-9">{SHOP_HERO.subline}</p>
            <div className="flex flex-col sm:flex-row md:flex-col xl:flex-row gap-3">
              <Button href="/shop/nm-mast-event" size="lg" withArrow>
                Reserve the Event Mast
              </Button>
              <Button href="#parts" variant="secondary" size="lg">
                See all parts
              </Button>
            </div>
            <p className="mt-5 text-[13px] text-nm-text-t">{SHOP_COPY.renderNote}</p>
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {USE_CASES.map((useCase) => (
              <Link
                key={useCase.id}
                href={useCase.href}
                className="group border border-nm-border bg-nm-s1 hover:border-nm-green-text transition-colors duration-200 flex flex-col focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-nm-green-text"
              >
                <div className="relative aspect-[4/3] overflow-hidden border-b border-nm-border bg-nm-s3">
                  <Image
                    src={useCase.image}
                    alt={imageAlt(useCase.image, useCase.title)}
                    fill
                    sizes="(min-width: 1024px) 20vw, (min-width: 640px) 50vw, 100vw"
                    style={{ objectPosition: useCase.imageFocus?.[useCase.image] ?? 'center' }}
                    className="object-cover motion-safe:transition-transform motion-safe:duration-200 motion-safe:group-hover:scale-[1.03]"
                  />
                </div>
                <div className="p-5 flex-1">
                  <h3 className="text-[17px] font-bold text-nm-text-p tracking-[-0.01em] mb-2">{useCase.title}</h3>
                  <p className="text-[15px] text-nm-text-s leading-[1.6]">{useCase.text}</p>
                </div>
              </Link>
            ))}
          </div>
          <p className="mt-4 text-[13px] text-nm-text-t">{SHOP_COPY.renderNote}</p>
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
          <p className="mt-4 text-[13px] text-nm-text-t">{SHOP_COPY.renderNote}</p>
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
                and we reply within 2 business days.
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
