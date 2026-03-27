import Link from 'next/link'
import SectionLabel from '@/components/ui/SectionLabel'

const services = [
  {
    index: '01',
    title: 'Tooling & Fixtures',
    href: '/solutions/tooling-fixtures',
    description: 'Custom jigs, fixtures, and production-support hardware for manufacturers.',
  },
  {
    index: '02',
    title: 'Engineered Transport & Packaging',
    href: '/solutions/transport-handling',
    description: 'Purpose-built crates and handling systems for complex or high-value parts.',
  },
  {
    index: '03',
    title: 'Product Development',
    href: '/solutions/product-development',
    description: 'Mechanical design, prototyping, and design-for-manufacture support.',
  },
  {
    index: '04',
    title: 'Automation & Control',
    href: '/solutions/automation-control',
    description: 'Targeted automation systems and machine control integration.',
  },
]

export default function AdditionalServices() {
  return (
    <section className="section-py bg-nm-bg" aria-labelledby="additional-services-heading">
      <div className="site-container">
        <div className="mb-12 md:mb-14">
          <SectionLabel className="mb-5">Additional Engineering Services</SectionLabel>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <h2
              id="additional-services-heading"
              className="text-disp-md text-nm-text-p font-light tracking-tight max-w-[28ch]"
            >
              Beyond 3D printing — broader engineering capability.
            </h2>
            <p className="text-body-md text-nm-text-s max-w-[44ch] leading-relaxed">
              For clients who need more than printed parts, we offer a full range of industrial
              engineering solutions across design, fabrication, and systems integration.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-nm-border">
          {services.map((service) => (
            <Link
              key={service.index}
              href={service.href}
              className="group bg-nm-bg hover:bg-nm-s1 transition-colors duration-300 p-7 flex flex-col"
            >
              <span className="font-mono text-label-sm text-nm-green-text tracking-[0.14em] block mb-4">
                {service.index}
              </span>
              <h3 className="text-h3 text-nm-text-p font-medium tracking-tight mb-3 group-hover:text-nm-text-p">
                {service.title}
              </h3>
              <p className="text-body-sm text-nm-text-s leading-relaxed flex-1">
                {service.description}
              </p>
              <span className="mt-5 inline-flex items-center gap-1.5 font-mono text-label-sm text-nm-text-t group-hover:text-nm-green-text transition-colors duration-300 uppercase tracking-[0.1em]">
                Learn more
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
