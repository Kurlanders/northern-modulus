import Link from 'next/link'

const services = [
  {
    index: '01',
    title: 'Prototypes',
    description:
      'CAD to physical part in days. Test form, fit, and function before committing to tooling or production investment.',
    link: 'Prototyping',
    href: '/3d-printing#prototypes',
  },
  {
    index: '02',
    title: 'Functional Parts',
    description:
      'Parts that do real work. Printed in materials suited to the application — structural, heat-resistant, flexible, or chemical-resistant.',
    link: 'Functional Parts',
    href: '/3d-printing#functional',
  },
  {
    index: '03',
    title: 'Small-Batch Production',
    description:
      '1 to 500+ parts. Short-run FDM is often faster and cheaper than cutting tooling. Consistent quality across the batch.',
    link: 'Small-Batch',
    href: '/3d-printing#batch',
  },
]

export default function WhatWeSolve() {
  return (
    <section className="pt-[120px] bg-nm-s1 border-t border-nm-border" aria-labelledby="what-we-print-heading">
      <div className="site-container">

        {/* Section header */}
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-end pb-12 border-b border-nm-border gap-6">
          <div>
            <p className="text-[12px] font-medium text-nm-text-s tracking-[2.5px] uppercase mb-5">
              // What We Print
            </p>
            <h2
              id="what-we-print-heading"
              className="text-[clamp(30px,3.5vw,50px)] font-bold text-nm-text-p leading-[1.1] tracking-[-0.02em]"
            >
              Three types of work.<br />
              <span className="text-nm-text-s font-medium">One consistent standard.</span>
            </h2>
          </div>
          <Link
            href="/contact"
            className="text-[13px] font-semibold text-nm-green-text hover:opacity-80 transition-opacity whitespace-nowrap self-start lg:self-auto"
          >
            Get a Quote →
          </Link>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-nm-border">
          {services.map((service) => (
            <div
              key={service.index}
              className="bg-nm-s1 px-10 py-12 hover:bg-nm-s3 transition-colors duration-300"
            >
              <p className="text-[12px] font-semibold text-nm-green-text tracking-[2px] mb-9">
                {service.index}
              </p>
              <h3 className="text-[20px] font-bold text-nm-text-p tracking-[-0.01em] mb-[18px]">
                {service.title}
              </h3>
              <p className="text-[13px] text-nm-text-s leading-[1.8] mb-9">
                {service.description}
              </p>
              <Link
                href={service.href}
                className="text-[13px] font-semibold text-nm-green-text hover:opacity-80 transition-opacity"
              >
                {service.link} →
              </Link>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
