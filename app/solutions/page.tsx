import type { Metadata } from 'next'
import Link from 'next/link'
import SectionLabel from '@/components/ui/SectionLabel'
import Button from '@/components/ui/Button'
import CTASection from '@/components/sections/CTASection'
import { solutions } from '@/lib/data/solutions'

export const metadata: Metadata = {
  title: 'Solutions — Industrial Engineering for Manufacturers',
  description:
    'Four structured solution areas covering product development, tooling and fixtures, engineered transport systems, and targeted automation for manufacturers.',
}

export default function SolutionsPage() {
  return (
    <>
      {/* Page hero */}
      <section className="relative pt-32 md:pt-40 pb-20 md:pb-28 overflow-hidden">
        <div className="absolute inset-0 line-grid opacity-30" aria-hidden="true" />
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse 70% 60% at 50% 30%, rgb(46 102 66 / 0.05) 0%, transparent 60%)',
          }}
          aria-hidden="true"
        />
        <div className="site-container relative">
          <SectionLabel className="mb-6">Solutions</SectionLabel>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end">
            <div className="lg:col-span-7">
              <h1 className="text-disp-xl text-nm-text-p font-light tracking-tight mb-6">
                Engineering solutions<br />
                structured around problems.
              </h1>
              <p className="text-body-lg text-nm-text-s leading-relaxed max-w-[52ch]">
                Our four solution areas reflect the categories of practical engineering problems
                manufacturers and industrial businesses face most often. Each area is supported by
                the same engineering capability — applied to the specific challenge.
              </p>
            </div>
            <div className="lg:col-span-5 lg:text-right">
              <Button href="/contact" variant="primary" size="lg" withArrow>
                Start a Project
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Solutions */}
      <section className="pb-20 md:pb-32">
        <div className="site-container">
          <div className="space-y-px bg-nm-border">
            {solutions.map((solution) => (
              <div
                key={solution.id}
                className="bg-nm-bg hover:bg-nm-s1 transition-colors duration-300 group"
              >
                <div className="py-10 md:py-12 grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10 items-start">
                  {/* Index */}
                  <div className="md:col-span-1">
                    <span className="font-mono text-label-sm text-nm-green-text tracking-[0.14em]">
                      {solution.index}
                    </span>
                  </div>

                  {/* Title + tagline */}
                  <div className="md:col-span-4">
                    <h2 className="text-h1 text-nm-text-p font-medium tracking-tight mb-3">
                      {solution.title}
                    </h2>
                    <p className="text-body-sm text-nm-green-text font-light">
                      {solution.tagline}
                    </p>
                  </div>

                  {/* Description */}
                  <div className="md:col-span-5">
                    <p className="text-body-md text-nm-text-s leading-relaxed">
                      {solution.description}
                    </p>

                    {/* Capabilities preview */}
                    <div className="mt-6 flex flex-wrap gap-2">
                      {solution.capabilities.slice(0, 3).map((cap) => (
                        <span
                          key={cap}
                          className="font-mono text-label-sm text-nm-text-t border border-nm-border px-2.5 py-1 rounded-sm2 uppercase tracking-[0.08em]"
                        >
                          {cap.split(' ').slice(0, 3).join(' ')}
                        </span>
                      ))}
                      {solution.capabilities.length > 3 && (
                        <span className="font-mono text-label-sm text-nm-text-t px-2.5 py-1">
                          +{solution.capabilities.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>

                  {/* CTA */}
                  <div className="md:col-span-2 md:text-right flex md:flex-col md:items-end gap-3">
                    <Link
                      href={`/solutions/${solution.slug}`}
                      className="inline-flex items-center gap-2 text-label-md font-mono uppercase tracking-[0.12em] text-nm-text-t group-hover:text-nm-green-text transition-colors duration-300"
                    >
                      <span>View</span>
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 12 12"
                        fill="none"
                        aria-hidden="true"
                        className="transition-transform duration-300 group-hover:translate-x-0.5"
                      >
                        <path d="M2 6H10M6.5 2.5L10 6L6.5 9.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Positioning section */}
      <section className="section-py bg-nm-s1 border-y border-nm-border">
        <div className="site-container">
          <div className="max-w-content mx-auto text-center">
            <SectionLabel className="mb-6 justify-center">Our Engineering Approach</SectionLabel>
            <h2 className="text-disp-md text-nm-text-p font-light tracking-tight mb-8">
              The capability is the same.<br />
              The application changes.
            </h2>
            <p className="text-body-lg text-nm-text-s leading-relaxed max-w-[60ch] mx-auto">
              We do not specialise in a single technology. We specialise in taking a physical
              engineering problem and delivering a solution that works — whether that means a
              precision fixture, a protective transport crate, a validated prototype, or a focused
              automation system. The engineering foundation is consistent across all four areas.
            </p>
          </div>
        </div>
      </section>

      <CTASection
        headline="Not sure which area applies?"
        subtext="Describe the problem you are trying to solve. We will help you understand the right approach and whether we are the right fit for the work."
        primaryCTA="Discuss Your Application"
        primaryHref="/contact"
        secondaryCTA="View Projects"
        secondaryHref="/projects"
        variant="green"
      />
    </>
  )
}
