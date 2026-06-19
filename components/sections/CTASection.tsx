import Link from 'next/link'

interface CTASectionProps {
  headline?: string
  subtext?: string
  primaryCTA?: string
  primaryHref?: string
  secondaryCTA?: string
  secondaryHref?: string
  variant?: 'dark' | 'green' | 'subtle'
}

export default function CTASection({
  headline = 'Ready to get a quote?',
  subtext = "Send your file or describe what you need. We'll review it and come back with a clear quote — material, lead time, and price. Most quotes within 24 hours.",
  primaryCTA = 'Get a Quote',
  primaryHref = '/contact',
  secondaryCTA,
  secondaryHref,
}: CTASectionProps) {
  return (
    <section className="py-[100px] bg-nm-s1 border-t border-nm-border" aria-label="Call to action">
      <div className="site-container">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-16 lg:gap-20 items-center">

          <div>
            <p className="text-[12px] font-medium text-nm-text-s tracking-[2.5px] uppercase mb-5">
              // Get Started
            </p>
            <h2 className="text-[clamp(28px,3.5vw,50px)] font-bold text-nm-text-p leading-[1.1] tracking-[-0.02em] mb-5">
              {headline}
            </h2>
            <p className="text-[14px] text-nm-text-s leading-[1.8] max-w-[480px]">
              {subtext}
            </p>
          </div>

          <div className="flex flex-col gap-3 min-w-[220px]">
            <Link
              href={primaryHref}
              className="bg-nm-green-text text-white px-10 py-4 text-[13px] font-semibold text-center block hover:opacity-85 transition-opacity whitespace-nowrap"
            >
              {primaryCTA} →
            </Link>
            {secondaryCTA && secondaryHref && (
              <Link
                href={secondaryHref}
                className="border border-nm-border text-nm-text-p px-10 py-4 text-[13px] font-medium text-center block hover:border-nm-green-text transition-colors whitespace-nowrap"
              >
                {secondaryCTA} →
              </Link>
            )}
          </div>

        </div>
      </div>
    </section>
  )
}
