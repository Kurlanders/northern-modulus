import Link from 'next/link'
import SectionLabel from '@/components/ui/SectionLabel'

const upcomingAreas = [
  {
    index: '01',
    title: 'Tooling, Fixtures & Production Support',
    href: '/solutions/tooling-fixtures',
    description:
      'Practical jigs, fixtures, assembly aids, and support hardware designed to improve repeatability, workflow, and day-to-day production efficiency.',
  },
  {
    index: '02',
    title: 'Automation & Machine Systems',
    href: '/solutions/automation-control',
    description:
      'Selected machine, motion, and control-system concepts being developed around smarter workflows, targeted automation, and scalable technical solutions.',
  },
  {
    index: '03',
    title: 'Custom Transport & Storage Solutions',
    href: '/solutions/transport-handling',
    description:
      'Engineered transport, handling, and storage concepts for products, assemblies, and equipment where protection, structure, and usability matter.',
  },
]

export default function AdditionalServices() {
  return (
    <section className="section-py bg-nm-s1 border-t border-nm-border" aria-labelledby="building-next-heading">
      <div className="site-container">
        <div className="mb-12 md:mb-14">
          <SectionLabel className="mb-5">What We&rsquo;re Building Next</SectionLabel>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <h2
              id="building-next-heading"
              className="text-disp-sm text-nm-text-s font-light tracking-tight max-w-[32ch]"
            >
              Broader engineering capabilities taking shape in parallel.
            </h2>
            <p className="text-body-sm text-nm-text-t max-w-[48ch] leading-relaxed">
              While Northern Modulus is currently focused on premium FDM 3D printing, broader
              engineering capabilities are continuing to take shape in parallel. These areas
              reflect the longer-term technical direction behind the company and may be available
              selectively for the right project.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-nm-border">
          {upcomingAreas.map((area) => (
            <Link
              key={area.index}
              href={area.href}
              className="group bg-nm-s1 hover:bg-nm-s2 transition-colors duration-300 p-7 flex flex-col"
            >
              <span className="font-mono text-label-sm text-nm-text-t tracking-[0.14em] block mb-4">
                {area.index}
              </span>
              <h3 className="text-h4 text-nm-text-s font-medium tracking-tight mb-3 group-hover:text-nm-text-p transition-colors duration-300">
                {area.title}
              </h3>
              <p className="text-body-sm text-nm-text-t leading-relaxed flex-1">
                {area.description}
              </p>
              <span className="mt-5 inline-flex items-center gap-1.5 font-mono text-label-sm text-nm-text-t group-hover:text-nm-steel-l transition-colors duration-300 uppercase tracking-[0.1em]">
                Learn More
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-0.5">
                  <path d="M1.5 5H8.5M5.5 2L8.5 5L5.5 8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
