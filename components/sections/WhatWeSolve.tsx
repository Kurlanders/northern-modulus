import Button from '@/components/ui/Button'

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
    title: 'Moulds & Tooling',
    description:
      'Printed moulds, forms and tooling for composites, casting and forming. Designed with real composites manufacturing experience, so they work on the shop floor, not just on screen.',
    link: 'Moulds',
    href: '/3d-printing#moulds',
  },
]

export default function WhatWeSolve() {
  return (
    <section className="pt-[120px] bg-nm-s1 border-t border-nm-border" aria-labelledby="what-we-print-heading">
      <div className="site-container">

        {/* Section header */}
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-end pb-12 border-b border-nm-border gap-6">
          <div>
            <h2
              id="what-we-print-heading"
              className="text-[clamp(30px,3.5vw,50px)] font-bold text-nm-text-p leading-[1.1] tracking-[-0.02em]"
            >
              Three types of work.<br />
              <span className="text-nm-text-s font-medium">One consistent standard.</span>
            </h2>
          </div>
          <Button href="/contact" size="lg" withArrow className="self-start lg:self-auto">
            Get a Quote
          </Button>
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
              <p className="text-[15px] text-nm-text-s leading-[1.8] mb-9">
                {service.description}
              </p>
              <Button href={service.href} variant="text" size="sm" withArrow>
                {service.link}
              </Button>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
