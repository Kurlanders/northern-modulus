import Link from 'next/link'
import SectionLabel from '@/components/ui/SectionLabel'
import { solutions } from '@/lib/data/solutions'

export default function SolutionsOverview() {
  return (
    <section className="section-py bg-nm-s1 border-y border-nm-border" aria-labelledby="solutions-heading">
      <div className="site-container">
        <div className="mb-14 md:mb-18">
          <SectionLabel className="mb-5">Solution Areas</SectionLabel>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <h2
              id="solutions-heading"
              className="text-disp-lg text-nm-text-p font-light tracking-tight max-w-[20ch]"
            >
              Four structured areas.<br />
              One engineering capability.
            </h2>
            <p className="text-body-md text-nm-text-s max-w-[44ch] leading-relaxed">
              Our solutions are grouped by the problem they solve — not by the technology involved.
              Each area represents a type of operational challenge we address regularly for
              manufacturers and industrial businesses.
            </p>
          </div>
        </div>

        {/* Solution cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-nm-border">
          {solutions.map((solution) => (
            <Link
              key={solution.id}
              href={`/solutions/${solution.slug}`}
              className="group relative bg-nm-s1 p-8 md:p-10 flex flex-col hover:bg-nm-s2 transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-nm-green-accent"
            >
              {/* Index + line */}
              <div className="flex items-center gap-4 mb-8">
                <span className="font-mono text-label-sm text-nm-green-text tracking-[0.14em]">
                  {solution.index}
                </span>
                <div className="h-px flex-1 bg-nm-border group-hover:bg-nm-green-mid transition-colors duration-500" aria-hidden="true" />
              </div>

              {/* Title */}
              <h3 className="text-h1 text-nm-text-p font-medium tracking-tight mb-4 group-hover:text-nm-text-p">
                {solution.title}
              </h3>

              {/* Tagline */}
              <p className="text-body-sm text-nm-green-text font-light mb-5">
                {solution.tagline}
              </p>

              {/* Description */}
              <p className="text-body-md text-nm-text-s leading-relaxed flex-1">
                {solution.description}
              </p>

              {/* CTA link */}
              <div className="mt-8 flex items-center gap-2 text-label-md font-mono uppercase tracking-[0.12em] text-nm-text-t group-hover:text-nm-green-text transition-colors duration-300">
                <span>Explore Solution</span>
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                  aria-hidden="true"
                  className="transition-transform duration-300 group-hover:translate-x-1"
                >
                  <path
                    d="M2 6H10M6.5 2.5L10 6L6.5 9.5"
                    stroke="currentColor"
                    strokeWidth="1.3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </Link>
          ))}
        </div>

        {/* Solutions overview link */}
        <div className="mt-8 text-center">
          <Link
            href="/solutions"
            className="inline-flex items-center gap-2 text-label-md font-mono uppercase tracking-[0.12em] text-nm-text-t hover:text-nm-text-s transition-colors duration-200"
          >
            View full solutions overview
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
              <path d="M2 6H10M6.5 2.5L10 6L6.5 9.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  )
}
