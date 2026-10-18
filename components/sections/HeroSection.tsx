'use client'

import dynamic from 'next/dynamic'
import Link from 'next/link'

const HeroModel = dynamic(() => import('./HeroModel'), {
  ssr: false,
  loading: () => null,
})

const stats = [
  { value: 'FDM',   label: 'Print Method',      accent: false },
  { value: '24h',   label: 'Quote Turnaround',  accent: false },
  { value: '1–100+', label: 'Parts per Order', accent: false },
  { value: 'Eng.',  label: 'Led Review',        accent: true  },
]

const offers = [
  {
    index: '01',
    title: 'Shop parts',
    description: 'Standard printed parts, ready to order.',
    href: '/shop',
    cta: 'Go to shop',
  },
  {
    index: '02',
    title: 'Custom print / quote',
    description: 'Prototypes, functional parts, small batches, jigs, fixtures and moulds — made to your file.',
    href: '/contact',
    cta: 'Get a quote',
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

          {/* Eyebrow */}
          <div className="flex items-center gap-3.5 mb-12">
            <div className="w-7 h-px bg-nm-green-text flex-shrink-0" aria-hidden="true" />
            <span className="text-[12px] font-medium text-nm-text-s tracking-[2.5px] uppercase">
              {'// Engineering-led 3D printing · Riga'}
            </span>
          </div>

          {/* H1 */}
          <h1 className="text-[clamp(44px,5vw,84px)] font-bold leading-[1.05] tracking-[-0.025em] text-nm-text-p mb-7">
            Printed parts,<br />
            <span className="text-nm-green-text">engineered to work.</span>
          </h1>

          {/* Subtext */}
          <p className="text-[15px] text-nm-text-s leading-[1.8] max-w-[480px] mb-12">
            Standard parts from the shop, or custom prints made to your file. Every part is
            reviewed before printing and made on one in-house Voron, tuned for precision.
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
          <div className="border-t border-nm-border pt-10 flex items-start flex-wrap gap-y-6">
            {stats.map((stat, i) => (
              <div
                key={stat.value}
                className={`flex flex-col gap-1.5 ${
                  i > 0 ? 'pl-10 border-l border-nm-border' : ''
                } ${i < stats.length - 1 ? 'pr-10' : ''}`}
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
