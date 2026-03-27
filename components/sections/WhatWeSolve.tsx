import SectionLabel from '@/components/ui/SectionLabel'
import Button from '@/components/ui/Button'

const printTypes = [
  {
    index: '01',
    title: 'Prototypes',
    description:
      'CAD to physical part in days. Test form, fit, and function before committing to tooling or production investment. Suitable for mechanical development, client review, and design validation.',
    detail: 'Send a file or a sketch — we handle the rest.',
  },
  {
    index: '02',
    title: 'Functional Parts',
    description:
      'Parts that do real work. We print in materials suited to the application — structural, heat-resistant, flexible, or chemical-resistant — and review geometry before printing to catch issues early.',
    detail: 'Engineering review included on every order.',
  },
  {
    index: '03',
    title: 'Small-Batch Production',
    description:
      'When you need 5 to 500 of a part, short-run 3D printing is often faster and cheaper than cutting tooling. Consistent quality, clean finish, and practical lead times across the batch.',
    detail: 'One-off or repeat — same standard either way.',
  },
]

export default function WhatWeSolve() {
  return (
    <section className="section-py bg-nm-bg" aria-labelledby="what-we-print-heading">
      <div className="site-container">
        <div className="mb-14 md:mb-18 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
          <div>
            <SectionLabel className="mb-5">What We Print</SectionLabel>
            <h2
              id="what-we-print-heading"
              className="text-disp-lg text-nm-text-p font-light tracking-tight max-w-[22ch]"
            >
              Three types of work.<br />
              One consistent standard.
            </h2>
          </div>
          <p className="text-body-md text-nm-text-s max-w-[44ch] leading-relaxed lg:text-right">
            Whether you need a single prototype or a short production run, the same engineering
            review and print quality applies to every order.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-nm-border">
          {printTypes.map((type) => (
            <article
              key={type.index}
              className="bg-nm-bg p-8 md:p-10 flex flex-col group hover:bg-nm-s1 transition-colors duration-300"
            >
              <div className="flex items-start gap-5 mb-6">
                <span className="font-mono text-label-sm text-nm-green-text tracking-[0.14em] flex-shrink-0 mt-1">
                  {type.index}
                </span>
                <div
                  className="h-px flex-1 bg-nm-border group-hover:bg-nm-border-mid transition-colors duration-300 mt-2.5"
                  aria-hidden="true"
                />
              </div>
              <h3 className="text-h1 text-nm-text-p mb-4 font-medium tracking-tight">
                {type.title}
              </h3>
              <p className="text-body-md text-nm-text-s leading-relaxed flex-1">
                {type.description}
              </p>
              <p className="mt-5 font-mono text-label-sm text-nm-green-text uppercase tracking-[0.12em]">
                {type.detail}
              </p>
            </article>
          ))}
        </div>

        <div className="mt-8 flex justify-center">
          <Button href="/contact" variant="outline" size="md" withArrow>
            Get a Quote
          </Button>
        </div>
      </div>
    </section>
  )
}
