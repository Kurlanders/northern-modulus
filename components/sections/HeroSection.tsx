'use client'

import dynamic from 'next/dynamic'
import Link from 'next/link'
import { publishedProducts } from '@/lib/data/products'

const HeroModel = dynamic(() => import('./HeroModel'), {
  ssr: false,
  loading: () => null,
})

const stats = [
  { value: 'FDM',    label: 'Print Method',     accent: false },
  { value: '1 day',  label: 'Quote Turnaround', accent: false },
  { value: '1–100+', label: 'Parts per Order',  accent: false },
  { value: 'Engineering', label: 'Led Review',  accent: true  },
]

const offers = [
  {
    index: '01',
    title: 'Custom print / quote',
    description: 'Prototypes, functional parts, small batches, jigs, fixtures and moulds — made to your file.',
    href: '/contact',
    cta: 'Get a quote',
  },
  {
    index: '02',
    title: 'Shop parts',
    description: 'Standard printed parts, ready to order.',
    href: '/shop',
    cta: publishedProducts.length > 0 ? 'Go to shop' : 'Coming soon',
  },
]

export default function HeroSection() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-nm-bg" aria-label="Hero">

      {/* Grid background */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          backgroundImage:
            'linear-gradient(#252729 1px, transparent 1px), linear-gradient(90deg, #252729 1px, transparent 1px)',
          backgroundSize: '72px 72px',
          opacity: 0.22,
        }}
      />

      {/* Scan line */}
      <div className="scan-line" aria-hidden="true" />

      {/* 3D canvas — absolute right */}
      <div
        className="absolute right-0 top-0 w-[45%] h-screen hidden lg:block z-[2] pointer-events-none"
        aria-hidden="true"
      >
        <HeroModel />
      </div>

      {/* Text — aligned with site-container */}
      <div className="relative z-[3] min-h-screen flex items-center w-full">
        <div className="max-w-[1440px] mx-auto w-full px-6 md:px-12 pt-[120px] pb-20">
        <div className="max-w-[640px] w-full lg:max-w-[52%]">

          {/* H1 */}
          <h1 className="text-[clamp(44px,5vw,84px)] font-bold leading-[1.05] tracking-[-0.025em] text-nm-text-p mb-7">
            Printed parts,<br />
            <span className="text-nm-green-text">engineered to work.</span>
          </h1>

          {/* Subtext */}
          <p className="text-[15px] text-nm-text-s leading-[1.8] max-w-[480px] mb-12">
            Standard parts from the shop, or custom prints made to your file. Every part is
            reviewed before printing and made in-house.
          </p>

          {/* Two equal offers */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-nm-border border border-nm-border mb-16">
            {offers.map((offer) => (
              <Link
                key={offer.href}
                href={offer.href}
                className="group bg-nm-s1 hover:bg-nm-s2 transition-colors duration-200 p-7 flex flex-col"
              >
                <span className="text-[11px] font-semibold text-nm-green-text tracking-[2px] mb-5">
                  {offer.index}
                </span>
                <span className="text-[20px] font-bold text-nm-text-p tracking-[-0.01em] mb-2.5">
                  {offer.title}
                </span>
                <span className="text-[13px] text-nm-text-s leading-[1.7] mb-6 flex-1">
                  {offer.description}
                </span>
                <span className="text-[13px] font-semibold text-nm-green-text group-hover:translate-x-1 transition-transform duration-200">
                  {offer.cta} →
                </span>
              </Link>
            ))}
          </div>

          {/* Stats strip */}
          {/* Below 1440px: 2x2 grid with a centre vertical and horizontal divider. 1440px+: single row (it needs ~680px). */}
          <div className="border-t border-nm-border grid grid-cols-2 min-[1440px]:flex min-[1440px]:items-start min-[1440px]:pt-10">
            {stats.map((stat, i) => (
              <div
                key={stat.value}
                className={[
                  'flex flex-col gap-1.5 py-6 min-[1440px]:py-0',
                  i % 2 === 1 ? 'border-l border-nm-border pl-6' : 'pr-6',
                  i >= 2 ? 'border-t border-nm-border min-[1440px]:border-t-0' : '',
                  i > 0 ? 'min-[1440px]:border-l min-[1440px]:pl-7' : 'min-[1440px]:pl-0',
                  i < stats.length - 1 ? 'min-[1440px]:pr-7' : 'min-[1440px]:pr-0',
                ].join(' ')}
              >
                <span className={`text-[30px] font-bold leading-none tracking-[-1px] ${stat.accent ? 'text-nm-green-text' : 'text-nm-text-p'}`}>
                  {stat.value}
                </span>
                <span className="text-[11px] font-medium text-nm-text-s tracking-[1.5px] uppercase whitespace-nowrap">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>

        </div>
        </div>
      </div>

    </section>
  )
}
