import type { Metadata } from 'next'
import SectionLabel from '@/components/ui/SectionLabel'
import Button from '@/components/ui/Button'
import CTASection from '@/components/sections/CTASection'

export const metadata: Metadata = {
  title: 'Custom 3D Printing — Prototypes, Functional Parts & Small-Batch Production',
  description:
    'Premium custom 3D printing with engineering-led file review. Prototypes, functional parts, and small-batch production in a wide range of materials. Fast quoting, clear pricing.',
}

const materials = [
  {
    name: 'PLA',
    uses: 'Prototypes, display models, low-load parts',
    properties: 'Good surface finish, easy to post-process, not heat or moisture resistant',
  },
  {
    name: 'PETG',
    uses: 'Functional parts, moderate load, light chemical exposure',
    properties: 'Tougher than PLA, better temperature resistance, slightly glossy finish',
  },
  {
    name: 'ABS',
    uses: 'Functional enclosures, moderate heat, impact resistance',
    properties: 'Good mechanical properties, machineable, requires controlled print environment',
  },
  {
    name: 'ASA',
    uses: 'Outdoor parts, UV-exposed applications',
    properties: 'UV and weather resistant, similar strength to ABS, good dimensional stability',
  },
  {
    name: 'TPU',
    uses: 'Flexible parts, gaskets, grips, wear-resistant components',
    properties: 'Flexible, impact-absorbing, chemical resistant, multiple shore hardnesses',
  },
  {
    name: 'PC',
    uses: 'High-temperature, high-strength structural parts',
    properties: 'Excellent mechanical and thermal properties, transparent or opaque options',
  },
]

const useCases = [
  {
    id: 'prototypes',
    index: '01',
    title: 'Prototypes',
    headline: 'From CAD to physical part in days.',
    description:
      'Test form, fit, and function before committing to tooling or production. Whether you are validating a mechanism, presenting a concept to a client, or checking dimensional fit in an assembly — a physical part answers questions that renders cannot.',
    detail:
      'We review the file before printing and advise on material and print settings for the validation goal. Prototype orders are treated with the same care as production parts.',
    points: [
      'Single parts and small sets',
      'Fast lead times — typically 2–5 business days',
      'Material matched to the validation requirement',
      'Engineering review included',
    ],
  },
  {
    id: 'functional',
    index: '02',
    title: 'Functional Parts',
    headline: 'Parts that go into assemblies and do real work.',
    description:
      'Not every 3D printed part is a prototype. We print brackets, housings, fixtures, jigs, inserts, and components that will be assembled, loaded, or used in service. The print settings, material, and orientation are chosen for the application — not defaulted.',
    detail:
      'We review wall thickness, structural geometry, and assembly interfaces before printing. Parts arrive clean, dimensionally accurate, and ready for their application.',
    points: [
      'Material selected for load, temperature, and environment',
      'Geometry review before printing',
      'Insert, thread, and interface considerations noted',
      'Finish options available',
    ],
  },
  {
    id: 'batch',
    index: '03',
    title: 'Small-Batch Production',
    headline: 'Short runs where tooling does not make sense.',
    description:
      'When you need 10 to 500 of a part and the volume does not justify tooling investment, 3D printing is often the most practical and cost-effective option. We provide consistent quality across the batch, with repeat orders matched to saved settings.',
    detail:
      'Batch pricing scales with quantity. We quote clearly so you can make the right decision for your volume. Repeat orders are processed efficiently once settings are established.',
    points: [
      'Quantities from 1 to 500+',
      'Consistent quality across the batch',
      'Repeat orders matched to saved settings',
      'Sensible batch pricing — quoted per job',
    ],
  },
]

export default function ThreeDPrintingPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 md:pt-40 pb-20 md:pb-28 overflow-hidden">
        <div className="absolute inset-0 line-grid opacity-30" aria-hidden="true" />
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse 70% 60% at 50% 30%, rgb(46 102 66 / 0.05) 0%, transparent 60%)',
          }}
          aria-hidden="true"
        />
        <div className="site-container relative">
          <SectionLabel className="mb-6">Custom 3D Printing</SectionLabel>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end">
            <div className="lg:col-span-8">
              <h1 className="text-disp-xl text-nm-text-p font-light tracking-tight mb-6">
                Premium 3D printing for<br />
                parts that need to work.
              </h1>
              <p className="text-body-lg text-nm-text-s leading-relaxed max-w-[54ch]">
                Prototypes, functional parts, and small-batch production — with engineering-led
                file review, practical material guidance, and premium print quality on every order.
              </p>
            </div>
            <div className="lg:col-span-4 lg:text-right flex flex-col items-start lg:items-end gap-3">
              <Button href="/contact" variant="primary" size="lg" withArrow>
                Get a Quote
              </Button>
              <a
                href="mailto:northernmodulus@gmail.com"
                className="font-mono text-label-sm text-nm-text-t hover:text-nm-green-text transition-colors duration-200 uppercase tracking-[0.1em]"
              >
                northernmodulus@gmail.com
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Use cases */}
      <section className="pb-20 md:pb-28 bg-nm-bg" id="how-it-works">
        <div className="site-container">
          <div className="space-y-px bg-nm-border">
            {useCases.map((uc) => (
              <div key={uc.id} id={uc.id} className="bg-nm-bg hover:bg-nm-s1 transition-colors duration-300">
                <div className="py-12 md:py-16 grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10">
                  <div className="md:col-span-2">
                    <span className="font-mono text-label-sm text-nm-green-text tracking-[0.14em] block mb-2">
                      {uc.index}
                    </span>
                    <span className="text-h3 text-nm-text-p font-medium block">
                      {uc.title}
                    </span>
                  </div>
                  <div className="md:col-span-5">
                    <h2 className="text-h1 text-nm-text-p font-medium tracking-tight mb-4">
                      {uc.headline}
                    </h2>
                    <p className="text-body-md text-nm-text-s leading-relaxed mb-3">
                      {uc.description}
                    </p>
                    <p className="text-body-md text-nm-text-t leading-relaxed">
                      {uc.detail}
                    </p>
                  </div>
                  <div className="md:col-span-5">
                    <div className="p-6 bg-nm-s1 border border-nm-border rounded-sm2">
                      <p className="font-mono text-label-sm text-nm-text-t uppercase tracking-[0.14em] mb-4">
                        What this includes
                      </p>
                      <ul className="space-y-3">
                        {uc.points.map((point) => (
                          <li key={point} className="flex items-start gap-3">
                            <span className="mt-2 w-1.5 h-1.5 rounded-full bg-nm-green-accent flex-shrink-0" aria-hidden="true" />
                            <span className="text-body-sm text-nm-text-p leading-relaxed">{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Materials */}
      <section className="section-py bg-nm-s1 border-y border-nm-border" id="capabilities">
        <div className="site-container">
          <div className="mb-14 md:mb-18">
            <SectionLabel className="mb-6">Materials</SectionLabel>
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
              <h2 className="text-disp-md text-nm-text-p font-light tracking-tight max-w-[24ch]">
                Material chosen for the application, not the default.
              </h2>
              <p className="text-body-md text-nm-text-s max-w-[44ch] leading-relaxed">
                We advise on material as part of every quote. If you are unsure what to use,
                describe the application — load, temperature, environment — and we will recommend.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-nm-border">
            {materials.map((mat) => (
              <div key={mat.name} className="bg-nm-s1 p-6 hover:bg-nm-s2 transition-colors duration-200">
                <p className="font-mono text-label-lg text-nm-text-p tracking-tight mb-3">
                  {mat.name}
                </p>
                <p className="text-body-sm text-nm-green-text mb-3 font-light">
                  {mat.uses}
                </p>
                <p className="text-body-sm text-nm-text-t leading-relaxed">
                  {mat.properties}
                </p>
              </div>
            ))}
          </div>
          <p className="mt-5 font-mono text-label-sm text-nm-text-t tracking-[0.1em]">
            Additional materials available on request. Ask when you get a quote.
          </p>
        </div>
      </section>

      {/* How it works */}
      <section className="section-py bg-nm-bg">
        <div className="site-container">
          <SectionLabel className="mb-8">How It Works</SectionLabel>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-px bg-nm-border">
            {[
              { index: '01', title: 'Send your file', detail: 'Upload a STEP, STL, or OBJ — or describe what you need and we will advise on the geometry.' },
              { index: '02', title: 'We review and quote', detail: 'Engineering review, material recommendation, and a clear quote — price, lead time, and any notes. Within 24 hours.' },
              { index: '03', title: 'We print and finish', detail: 'Parts go into production, are cleaned and inspected, then packed to protect finish in transit.' },
              { index: '04', title: 'You receive the part', detail: 'Dispatched with tracking. Repeat orders use saved settings for consistent results every batch.' },
            ].map((step) => (
              <div key={step.index} className="bg-nm-bg hover:bg-nm-s1 transition-colors duration-300 p-7 group">
                <div className="flex items-center gap-3 mb-5">
                  <span className="font-mono text-label-sm text-nm-green-text tracking-[0.14em]">{step.index}</span>
                  <div className="h-px flex-1 bg-nm-border group-hover:bg-nm-green-mid transition-colors duration-500" aria-hidden="true" />
                </div>
                <h3 className="text-h3 text-nm-text-p font-medium tracking-tight mb-3">{step.title}</h3>
                <p className="text-body-sm text-nm-text-s leading-relaxed">{step.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        headline="Ready to get a quote?"
        subtext="Send your file or describe what you need. We'll review it and come back with a clear quote — material, lead time, and price. Most quotes within 24 hours."
        primaryCTA="Get a Quote"
        primaryHref="/contact"
        secondaryCTA="Email Us Directly"
        secondaryHref="mailto:northernmodulus@gmail.com"
        variant="green"
      />
    </>
  )
}
