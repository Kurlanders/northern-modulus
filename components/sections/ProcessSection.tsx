import Link from 'next/link'
import SectionLabel from '@/components/ui/SectionLabel'

const steps = [
  {
    index: '01',
    title: 'Understand the Application',
    description:
      'We start by understanding the operating environment, constraints, and objectives — not just the surface-level brief. Most good solutions begin with a better question.',
  },
  {
    index: '02',
    title: 'Define Technical Requirements',
    description:
      'We formalise the mechanical, dimensional, and performance requirements before any design work begins. This prevents rework and aligns investment with outcome from the start.',
  },
  {
    index: '03',
    title: 'Develop Concept & Design',
    description:
      'Structured engineering development from concept through detailed design. We assess options, validate geometry, and deliver a design that is buildable and fit for purpose.',
  },
  {
    index: '04',
    title: 'Prototype, Validate & Refine',
    description:
      'Where appropriate, we prototype to validate before committing to final build. Testing surfaces real-world performance early and eliminates surprises at delivery.',
  },
  {
    index: '05',
    title: 'Deliver an Implementation-Ready Solution',
    description:
      'The final output is a solution that works in the client\'s operating environment — not a drawing or a report. We deliver hardware, documentation, and handover support.',
  },
]

export default function ProcessSection() {
  return (
    <section className="section-py bg-nm-s1 border-y border-nm-border" aria-labelledby="process-heading">
      <div className="site-container">
        <div className="mb-14 md:mb-18 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
          <div>
            <SectionLabel className="mb-5">How We Work</SectionLabel>
            <h2
              id="process-heading"
              className="text-disp-lg text-nm-text-p font-light tracking-tight max-w-[20ch]"
            >
              A structured process<br />
              from brief to delivery.
            </h2>
          </div>
          <Link
            href="/process"
            className="inline-flex items-center gap-2 text-label-md font-mono uppercase tracking-[0.12em] text-nm-text-t hover:text-nm-green-text transition-colors duration-200 self-start lg:self-end"
          >
            Full Process Detail
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
              <path d="M2 6H10M6.5 2.5L10 6L6.5 9.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>

        {/* Steps */}
        <div className="space-y-px bg-nm-border">
          {steps.map((step, i) => (
            <div
              key={step.index}
              className="bg-nm-s1 hover:bg-nm-s2 transition-colors duration-300 group"
            >
              <div className="px-0 py-8 grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 items-start">
                {/* Index */}
                <div className="md:col-span-1 flex items-center gap-4 md:gap-0 md:flex-col">
                  <span className="font-mono text-label-sm text-nm-green-text tracking-[0.14em]">
                    {step.index}
                  </span>
                  {i < steps.length - 1 && (
                    <div className="hidden md:block w-px flex-1 bg-nm-border mt-3 min-h-[20px]" aria-hidden="true" />
                  )}
                </div>

                {/* Content */}
                <div className="md:col-span-4">
                  <h3 className="text-h2 text-nm-text-p font-medium tracking-tight">
                    {step.title}
                  </h3>
                </div>

                <div className="md:col-span-7">
                  <p className="text-body-md text-nm-text-s leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
              {i < steps.length - 1 && (
                <div className="h-px bg-nm-border" aria-hidden="true" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
