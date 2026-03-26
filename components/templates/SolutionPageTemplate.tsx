import type { Solution } from '@/lib/data/solutions'
import SectionLabel from '@/components/ui/SectionLabel'
import Button from '@/components/ui/Button'
import CTASection from '@/components/sections/CTASection'
import { solutions } from '@/lib/data/solutions'
import Link from 'next/link'

interface SolutionPageTemplateProps {
  solution: Solution
}

export default function SolutionPageTemplate({ solution }: SolutionPageTemplateProps) {
  const otherSolutions = solutions.filter((s) => s.id !== solution.id)

  return (
    <>
      {/* Page hero */}
      <section className="relative pt-32 md:pt-40 pb-20 md:pb-28 overflow-hidden">
        <div className="absolute inset-0 line-grid opacity-30" aria-hidden="true" />
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse 60% 80% at 0% 50%, rgb(46 102 66 / 0.05) 0%, transparent 60%)',
          }}
          aria-hidden="true"
        />

        <div className="site-container relative">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 mb-10" aria-label="Breadcrumb">
            <Link
              href="/solutions"
              className="font-mono text-label-sm text-nm-text-t uppercase tracking-[0.12em] hover:text-nm-text-s transition-colors duration-200"
            >
              Solutions
            </Link>
            <span className="text-nm-text-t" aria-hidden="true">/</span>
            <span className="font-mono text-label-sm text-nm-text-s uppercase tracking-[0.12em]">
              {solution.shortTitle}
            </span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
            <div className="lg:col-span-7">
              <SectionLabel index={solution.index} className="mb-6">
                Solution Area
              </SectionLabel>
              <h1 className="text-disp-xl text-nm-text-p font-light tracking-tight mb-6">
                {solution.title}
              </h1>
              <p className="text-body-lg text-nm-green-text font-light leading-relaxed mb-8">
                {solution.tagline}
              </p>
              <p className="text-body-lg text-nm-text-s leading-relaxed mb-10">
                {solution.description}
              </p>
              <Button href="/contact" variant="primary" size="lg" withArrow>
                {solution.cta}
              </Button>
            </div>

            <div className="lg:col-span-5 lg:pt-16">
              <div className="relative h-64 lg:h-full min-h-[240px] bg-nm-s1 border border-nm-border rounded-sm2 overflow-hidden">
                <div className="absolute inset-0 dot-grid opacity-40" aria-hidden="true" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg width="80" height="80" viewBox="0 0 80 80" fill="none" aria-hidden="true">
                    <rect x="8" y="8" width="28" height="28" stroke="#2E6642" strokeWidth="1.5" />
                    <rect x="22" y="22" width="50" height="50" stroke="#5FA575" strokeWidth="1.5" fill="none" />
                    <rect x="24" y="24" width="18" height="18" fill="#172D21" stroke="#2E6642" strokeWidth="1.2" />
                    <circle cx="40" cy="40" r="3" fill="#3D8055" />
                  </svg>
                </div>
                <div className="absolute bottom-4 left-4 right-4">
                  <p className="font-mono text-label-sm text-nm-text-t uppercase tracking-[0.12em] text-center">
                    {solution.shortTitle}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Detail section */}
      <section className="section-py bg-nm-s1 border-y border-nm-border">
        <div className="site-container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            <div className="lg:col-span-6">
              <SectionLabel className="mb-6">The Work</SectionLabel>
              <p className="text-body-lg text-nm-text-s leading-relaxed">
                {solution.detail}
              </p>
            </div>
            <div className="lg:col-span-6 space-y-10">
              {/* Capabilities */}
              <div>
                <p className="font-mono text-label-sm text-nm-text-t uppercase tracking-[0.14em] mb-5">
                  Capabilities
                </p>
                <ul className="space-y-3">
                  {solution.capabilities.map((cap) => (
                    <li key={cap} className="flex items-start gap-3">
                      <span className="mt-2 w-1 h-1 rounded-full bg-nm-green-accent flex-shrink-0" aria-hidden="true" />
                      <span className="text-body-md text-nm-text-s leading-relaxed">{cap}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Outcomes + Applications */}
      <section className="section-py bg-nm-bg">
        <div className="site-container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
            {/* Outcomes */}
            <div>
              <SectionLabel className="mb-6">Outcomes</SectionLabel>
              <p className="text-body-md text-nm-text-s mb-7 leading-relaxed">
                What clients typically see after implementation:
              </p>
              <ul className="space-y-4">
                {solution.outcomes.map((outcome, i) => (
                  <li key={outcome} className="flex items-start gap-4">
                    <span className="font-mono text-label-sm text-nm-green-text tracking-[0.12em] flex-shrink-0 mt-0.5">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="text-body-md text-nm-text-p leading-relaxed">{outcome}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Applications */}
            <div>
              <SectionLabel className="mb-6">Applications</SectionLabel>
              <p className="text-body-md text-nm-text-s mb-7 leading-relaxed">
                Common applications in this area:
              </p>
              <ul className="space-y-3">
                {solution.applications.map((app) => (
                  <li key={app} className="flex items-start gap-3">
                    <div
                      className="mt-2 w-4 h-px bg-nm-green-mid flex-shrink-0"
                      aria-hidden="true"
                    />
                    <span className="text-body-md text-nm-text-s leading-relaxed">{app}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Other solutions */}
      <section className="section-py-sm bg-nm-s1 border-t border-nm-border">
        <div className="site-container">
          <p className="font-mono text-label-sm text-nm-text-t uppercase tracking-[0.14em] mb-8">
            Other Solution Areas
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-nm-border">
            {otherSolutions.map((s) => (
              <Link
                key={s.id}
                href={`/solutions/${s.slug}`}
                className="group bg-nm-s1 hover:bg-nm-s2 p-6 transition-colors duration-300"
              >
                <span className="font-mono text-label-sm text-nm-green-text tracking-[0.12em] block mb-3">
                  {s.index}
                </span>
                <span className="text-h3 text-nm-text-p font-medium tracking-tight block mb-2">
                  {s.shortTitle}
                </span>
                <span className="text-body-sm text-nm-text-t group-hover:text-nm-text-s transition-colors duration-300 flex items-center gap-1.5">
                  Explore
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-0.5">
                    <path d="M1.5 5H8.5M5.5 2L8.5 5L5.5 8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <CTASection
        headline={`Ready to discuss a ${solution.shortTitle.toLowerCase()} requirement?`}
        subtext={`Send us a brief on what you need. We work quickly to understand the application and come back with a clear view on how to approach it.`}
        primaryCTA={solution.cta}
        primaryHref="/contact"
        variant="green"
      />
    </>
  )
}
