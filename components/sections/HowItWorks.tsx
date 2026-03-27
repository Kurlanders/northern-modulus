import SectionLabel from '@/components/ui/SectionLabel'
import Button from '@/components/ui/Button'

const steps = [
  {
    index: '01',
    title: 'Send your file, sketch, or idea',
    description:
      'Upload a CAD file, share a sketch, or describe what you need. We accept STEP, STL, OBJ, DXF, and most common 3D formats. No file yet? Tell us what you are trying to make.',
  },
  {
    index: '02',
    title: 'We review and quote',
    description:
      'We check the geometry, recommend a material, and send a clear quote with price, lead time, and any notes on the design. Most quotes returned within 24 hours.',
  },
  {
    index: '03',
    title: 'We print and finish',
    description:
      'Once approved, your parts go into production. We print, remove supports, clean, and inspect before packing. No surprises at delivery.',
  },
  {
    index: '04',
    title: 'You receive the part',
    description:
      'Parts are packed to protect surface finish in transit and dispatched with tracking. For repeat orders, the same settings are saved so every batch matches the last.',
  },
]

export default function HowItWorks() {
  return (
    <section className="section-py bg-nm-bg" aria-labelledby="how-it-works-heading">
      <div className="site-container">
        <div className="mb-14 md:mb-18 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
          <div>
            <SectionLabel className="mb-5">How It Works</SectionLabel>
            <h2
              id="how-it-works-heading"
              className="text-disp-lg text-nm-text-p font-light tracking-tight max-w-[20ch]"
            >
              Simple process.<br />
              No surprises.
            </h2>
          </div>
          <Button href="/contact" variant="primary" size="md" withArrow>
            Get a Quote
          </Button>
        </div>

        {/* Steps — horizontal on desktop, stacked on mobile */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-px bg-nm-border">
          {steps.map((step) => (
            <div
              key={step.index}
              className="bg-nm-bg hover:bg-nm-s1 transition-colors duration-300 p-7 md:p-8 flex flex-col group"
            >
              {/* Index + connector */}
              <div className="flex items-center gap-3 mb-6">
                <span className="font-mono text-label-sm text-nm-green-text tracking-[0.14em]">
                  {step.index}
                </span>
                <div className="h-px flex-1 bg-nm-border group-hover:bg-nm-green-mid transition-colors duration-500" aria-hidden="true" />
              </div>

              <h3 className="text-h3 text-nm-text-p font-medium tracking-tight mb-4">
                {step.title}
              </h3>
              <p className="text-body-sm text-nm-text-s leading-relaxed flex-1">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
