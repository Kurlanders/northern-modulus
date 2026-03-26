import SectionLabel from '@/components/ui/SectionLabel'

const problems = [
  {
    index: '01',
    title: 'Production Process Variation',
    description:
      'Assembly inconsistency, operator-dependent outcomes, slow cycle times. When process performance varies, product quality follows. Engineered fixtures and production-support hardware solve this at the source.',
  },
  {
    index: '02',
    title: 'Complex Part Handling & Transit',
    description:
      'Non-standard geometry, high-value components, or sensitive assemblies that cannot be shipped, stored, or handled safely with off-the-shelf solutions. Purpose-built crates and handling systems protect what matters.',
  },
  {
    index: '03',
    title: 'Product Development Without Capacity',
    description:
      'A concept that needs mechanical engineering, a mechanism that needs testing, or a product that needs to be manufacturable before tooling investment. External engineering capacity without the overhead.',
  },
  {
    index: '04',
    title: 'Targeted Automation Opportunity',
    description:
      'A specific process step that creates delay, variation, or risk — where a well-scoped automation solution changes the economics. Not full-line automation. The right solution for the right problem.',
  },
]

export default function WhatWeSolve() {
  return (
    <section className="section-py bg-nm-bg" aria-labelledby="what-we-solve-heading">
      <div className="site-container">
        <div className="mb-14 md:mb-18 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
          <div>
            <SectionLabel className="mb-5">What We Solve</SectionLabel>
            <h2
              id="what-we-solve-heading"
              className="text-disp-lg text-nm-text-p font-light tracking-tight max-w-[22ch]"
            >
              Real operational problems<br />
              with engineered answers.
            </h2>
          </div>
          <p className="text-body-md text-nm-text-s max-w-[44ch] leading-relaxed lg:text-right">
            Manufacturers come to us when a physical workflow problem needs a practical, engineered
            resolution — not a consulting report, not a generic product off a shelf.
          </p>
        </div>

        {/* Problem cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-nm-border">
          {problems.map((problem) => (
            <article
              key={problem.index}
              className="bg-nm-bg p-8 md:p-10 group hover:bg-nm-s1 transition-colors duration-300"
            >
              <div className="flex items-start gap-5 mb-5">
                <span className="font-mono text-label-sm text-nm-green-text tracking-[0.14em] flex-shrink-0 mt-1">
                  {problem.index}
                </span>
                <div
                  className="h-px flex-1 bg-nm-border group-hover:bg-nm-border-mid transition-colors duration-300 mt-2.5"
                  aria-hidden="true"
                />
              </div>
              <h3 className="text-h2 text-nm-text-p mb-4 font-medium tracking-tight">
                {problem.title}
              </h3>
              <p className="text-body-md text-nm-text-s leading-relaxed">
                {problem.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
