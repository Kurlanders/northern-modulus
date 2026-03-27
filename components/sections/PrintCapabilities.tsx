import SectionLabel from '@/components/ui/SectionLabel'
import Button from '@/components/ui/Button'

const capabilities = [
  {
    index: '01',
    title: 'Premium FDM Printing',
    description:
      'High-resolution fused deposition modelling on industrial-grade hardware. Tighter tolerances, cleaner surfaces, and more consistent results than consumer-grade equipment.',
  },
  {
    index: '02',
    title: 'Engineering-Led Part Review',
    description:
      'We review every file before printing — checking wall thickness, geometry, print orientation, and potential failure points. You get a better part, not just a printed file.',
  },
  {
    index: '03',
    title: 'Material Guidance by Use Case',
    description:
      'PLA, PETG, ABS, ASA, TPU, PC, and more. We recommend the right material for your application — load conditions, temperature, environment, and finish requirements all factor in.',
  },
  {
    index: '04',
    title: 'Structural and Functional Parts',
    description:
      'Print settings, infill, and orientation are chosen for the application — not defaulted. Parts intended for load, assembly, or repeated use are treated differently from display models.',
  },
  {
    index: '05',
    title: 'Prototype and Pre-Production Builds',
    description:
      'From first-off validation builds to pre-production batches before tooling commitment. We support the full development cycle, not just final production.',
  },
  {
    index: '06',
    title: 'Small Batch from 1 to 500+',
    description:
      'Single parts, repeat orders, or short production runs. No minimum order requirements. Pricing scales sensibly with quantity — we quote clearly so you can make the right decision.',
  },
]

export default function PrintCapabilities() {
  return (
    <section className="section-py bg-nm-s1 border-y border-nm-border" aria-labelledby="capabilities-heading">
      <div className="site-container">
        <div className="mb-14 md:mb-18 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
          <div>
            <SectionLabel className="mb-5">Capabilities</SectionLabel>
            <h2
              id="capabilities-heading"
              className="text-disp-lg text-nm-text-p font-light tracking-tight max-w-[22ch]"
            >
              What you get<br />
              with every order.
            </h2>
          </div>
          <div className="flex flex-col gap-3 items-start lg:items-end">
            <p className="text-body-md text-nm-text-s max-w-[40ch] leading-relaxed lg:text-right">
              Consistent engineering input and premium print quality across every job —
              whether it is a single prototype or a repeat production run.
            </p>
            <Button href="/3d-printing" variant="ghost" size="sm" withArrow>
              Full Capabilities
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-nm-border">
          {capabilities.map((cap) => (
            <div
              key={cap.index}
              className="bg-nm-s1 p-7 hover:bg-nm-s2 transition-colors duration-300 group"
            >
              <div className="flex items-center gap-4 mb-5">
                <span className="font-mono text-label-sm text-nm-green-text tracking-[0.14em]">
                  {cap.index}
                </span>
                <div className="h-px flex-1 bg-nm-border group-hover:bg-nm-border-mid transition-colors duration-300" aria-hidden="true" />
              </div>
              <h3 className="text-h3 text-nm-text-p font-medium tracking-tight mb-3">
                {cap.title}
              </h3>
              <p className="text-body-sm text-nm-text-s leading-relaxed">
                {cap.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
