import Link from 'next/link'

const steps = [
  {
    index: '01',
    title: 'Send your file,\nsketch, or idea',
    description:
      'Upload a CAD file, share a sketch, or describe what you need. STEP, STL, OBJ, DXF accepted.',
    isLast: false,
  },
  {
    index: '02',
    title: 'We review\nand quote',
    description:
      'We check geometry, recommend material, and send a clear quote. Most quotes within 24 hours.',
    isLast: false,
  },
  {
    index: '03',
    title: 'We print\nand finish',
    description:
      'Parts go into production. We print, remove supports, clean, and inspect before packing.',
    isLast: false,
  },
  {
    index: '04',
    title: 'You receive\nthe part',
    description:
      'Packed to protect surface finish, dispatched with tracking. Repeat orders use saved settings.',
    isLast: true,
  },
]

export default function HowItWorks() {
  return (
    <section className="py-[120px] bg-nm-s2 border-t border-nm-border" aria-labelledby="how-it-works-heading">
      <div className="site-container">

        {/* Header */}
        <div className="mb-18">
          <p className="text-[12px] font-medium text-nm-text-s tracking-[2.5px] uppercase mb-5">
            // Process
          </p>
          <h2
            id="how-it-works-heading"
            className="text-[clamp(28px,3vw,44px)] font-bold text-nm-text-p leading-[1.1] tracking-[-0.02em]"
          >
            Simple process.<br />
            <span className="text-nm-text-s font-medium">No surprises.</span>
          </h2>
        </div>

        {/* Steps grid */}
        <div className="grid grid-cols-1 md:grid-cols-4">
          {steps.map((step, i) => (
            <div
              key={step.index}
              className={`pb-10 md:pb-0 ${
                !step.isLast
                  ? 'md:pr-10 md:border-r md:mr-10 border-nm-border border-b md:border-b-0 mb-10 md:mb-0'
                  : ''
              }`}
            >
              <div
                className={`text-[48px] font-extrabold leading-none tracking-[-2px] mb-7 ${
                  step.isLast ? 'text-nm-green-text opacity-30' : 'text-nm-border'
                }`}
              >
                {step.index}
              </div>
              <h3 className="text-[15px] font-bold text-nm-text-p mb-3.5 leading-[1.4] whitespace-pre-line">
                {step.title}
              </h3>
              <p className="text-[13px] text-nm-text-s leading-[1.8]">{step.description}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-18 pt-14 border-t border-nm-border flex justify-center">
          <Link
            href="/contact"
            className="bg-nm-green-text text-white px-14 py-4 text-[13px] font-semibold hover:opacity-85 transition-opacity"
          >
            Get a Quote →
          </Link>
        </div>

      </div>
    </section>
  )
}
