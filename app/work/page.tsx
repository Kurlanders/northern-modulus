import Image from 'next/image'
import CTASection from '@/components/sections/CTASection'
import { visibleWork } from '@/lib/data/work'
import { pageMetadata } from '@/lib/metadata'
import Button from '@/components/ui/Button'

export const metadata = pageMetadata(
  'Work',
  'Parts designed and printed by Northern Modulus — the problem, the material, the quantity and the result.'
)

export default function WorkPage() {
  return (
    <>
      <section className="relative pt-[140px] pb-[80px] bg-nm-bg border-b border-nm-border overflow-hidden">
        <div className="absolute inset-0 line-grid opacity-20 pointer-events-none" aria-hidden="true" />
        <div className="site-container relative">
          <p className="text-[12px] font-medium text-nm-text-s tracking-[2.5px] uppercase mb-6">
            {'// Work'}
          </p>
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-10 items-end">
            <h1 className="text-[clamp(32px,4.5vw,64px)] font-bold text-nm-text-p leading-[1.1] tracking-[-0.025em]">
              Real parts.<br />
              <span className="text-nm-text-s font-medium">Real problems solved.</span>
            </h1>
            <p className="text-[15px] text-nm-text-s leading-[1.8] max-w-[400px] lg:pb-2">
              Each entry shows the problem, the material and quantity, and what the part achieved.
            </p>
          </div>
        </div>
      </section>

      {visibleWork.length === 0 ? (
        <section className="py-[100px] bg-nm-bg">
          <div className="site-container">
            <div className="max-w-[560px] border border-nm-border bg-nm-s1 p-10">
              <p className="text-[18px] font-bold text-nm-text-p tracking-[-0.01em] mb-3">
                Recent work coming soon.
              </p>
              <p className="text-[15px] text-nm-text-s leading-[1.8] mb-6">
                In the meantime, see recent prints on Instagram.
              </p>
              <Button href="https://instagram.com/northernmodulus" external variant="text" size="md" withArrow>
                @northernmodulus on Instagram
              </Button>
            </div>
          </div>
        </section>
      ) : (
        <section className="bg-nm-bg">
          {visibleWork.map((entry, idx) => (
            <article
              key={entry.slug}
              id={entry.slug}
              className={`scroll-mt-[68px] ${idx > 0 ? 'border-t border-nm-border' : ''}`}
            >
              {entry.images.length > 0 && (
                <div
                  className={`grid ${entry.images.length > 1 ? 'grid-cols-2' : 'grid-cols-1'} h-[320px] md:h-[580px] bg-nm-s2 border-b border-nm-border overflow-hidden`}
                >
                  {entry.images.slice(0, 2).map((src, i) => {
                    // Placeholder SVGs are shown whole; photos fill the banner.
                    const isSvg = src.endsWith('.svg')
                    return (
                      <div key={src} className={`relative overflow-hidden ${i === 0 && entry.images.length > 1 ? 'border-r border-nm-border' : ''}`}>
                        <Image
                          src={src}
                          alt={`${entry.title} — image ${i + 1}`}
                          fill
                          sizes="50vw"
                          className={isSvg ? 'object-contain p-8' : 'object-cover'}
                          style={isSvg ? undefined : { objectPosition: 'center 8%' }}
                          priority={idx === 0 && i === 0}
                        />
                      </div>
                    )
                  })}
                </div>
              )}

              <div className="site-container py-16 lg:py-20">
                <h2 className="text-[clamp(24px,3vw,44px)] font-bold text-nm-text-p tracking-[-0.02em] leading-[1.15] mb-8">
                  {entry.title}
                </h2>

                <dl className="flex flex-wrap gap-x-12 gap-y-4 mb-12">
                  <div>
                    <dt className="text-[12px] font-medium text-nm-text-t tracking-[2px] uppercase mb-1.5">Material</dt>
                    <dd className="text-[15px] text-nm-text-p">{entry.material}</dd>
                  </div>
                  <div>
                    <dt className="text-[12px] font-medium text-nm-text-t tracking-[2px] uppercase mb-1.5">Quantity</dt>
                    <dd className="text-[15px] text-nm-text-p">{entry.quantity}</dd>
                  </div>
                </dl>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-px bg-nm-border border border-nm-border">
                  <div className="bg-nm-bg p-8 lg:p-10">
                    <p className="text-[12px] font-medium text-nm-text-t tracking-[2px] uppercase mb-5">
                      {'// The Problem'}
                    </p>
                    <p className="text-[15px] text-nm-text-s leading-[1.85]">{entry.problem}</p>
                  </div>
                  <div className="bg-nm-s1 p-8 lg:p-10">
                    <p className="text-[12px] font-medium text-nm-text-t tracking-[2px] uppercase mb-5">
                      {'// The Result'}
                    </p>
                    <p className="text-[15px] text-nm-text-s leading-[1.85]">{entry.result}</p>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </section>
      )}

      <CTASection
        headline="Working on something similar?"
        subtext="Send a file, a sketch or a description of the problem. I'll review it and come back with a clear quote."
        primaryCTA="Get a Quote"
        primaryHref="/contact"
        secondaryCTA="Custom Printing"
        secondaryHref="/3d-printing"
      />
    </>
  )
}
