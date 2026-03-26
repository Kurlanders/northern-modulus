import type { Metadata } from 'next'
import SectionLabel from '@/components/ui/SectionLabel'
import Button from '@/components/ui/Button'
import CTASection from '@/components/sections/CTASection'

export const metadata: Metadata = {
  title: 'Our Process — How We Work',
  description:
    'How Northern Modulus approaches industrial engineering engagements — from initial application understanding through to delivery of implementation-ready solutions.',
}

const steps = [
  {
    index: '01',
    title: 'Understand the Application',
    duration: 'Day 1–2',
    description:
      'Every engagement begins with understanding the operating environment, constraints, and the real goal — not just the stated brief. We ask direct questions about how the part or system is used, what has failed or been inadequate before, what success actually looks like, and what the commercial and operational consequences of the problem are.',
    detail:
      'This stage typically involves a structured conversation, often a site visit or detailed drawings review. We are not trying to scope a quote — we are trying to understand whether we are looking at the right problem.',
    outputs: [
      'Application summary document',
      'Key constraints and requirements identified',
      'Clear statement of the engineering problem',
    ],
  },
  {
    index: '02',
    title: 'Define Technical Requirements',
    duration: 'Day 2–5',
    description:
      'Before any design begins, we formalise the mechanical, dimensional, material, and performance requirements. This prevents the classic failure mode of producing something technically competent that does not solve the actual problem.',
    detail:
      'Requirements definition includes dimensional constraints, load cases, environmental conditions, interface requirements, repeatability expectations, and operator needs. Where requirements are uncertain, we identify those uncertainty areas and design the next stage to resolve them.',
    outputs: [
      'Technical requirements document',
      'Dimensional and performance envelope',
      'Key risks and open questions documented',
    ],
  },
  {
    index: '03',
    title: 'Develop Concept & Design',
    duration: 'Week 1–3',
    description:
      'Structured concept development, design iteration, and engineering design. We use CAD modelling, calculations, and design review to progress from concept to detailed design with client review at appropriate points.',
    detail:
      'We typically present 1–3 concept directions, with rationale for the preferred approach. The selected concept is then developed through detail design, with emphasis on manufacturability, assembly logic, and service access. Design-for-manufacture is embedded in this stage — not added at the end.',
    outputs: [
      'Concept options with recommendation',
      'Detailed design and 3D CAD models',
      'Manufacturing drawings or production data',
    ],
  },
  {
    index: '04',
    title: 'Prototype, Validate & Refine',
    duration: 'Week 2–5 (where applicable)',
    description:
      'Where the design involves novel geometry, performance-critical components, or client sign-off requirements, we prototype before committing to final build. This reduces delivery risk and allows real-world performance to be assessed before production investment.',
    detail:
      '3D printing, machined prototypes, and sub-assembly builds are all used where appropriate. Prototype testing is structured — we define what needs to be validated and document the results. Refinements emerging from prototype testing are incorporated and re-validated before production.',
    outputs: [
      'Functional prototype or validation build',
      'Test results and performance data',
      'Updated design incorporating refinements',
    ],
  },
  {
    index: '05',
    title: 'Deliver an Implementation-Ready Solution',
    duration: 'Final delivery',
    description:
      'The final deliverable is a working solution in the client\'s operating environment — not a drawing package, not a component waiting to be integrated. We manage build and finishing, final testing, and on-site handover where required.',
    detail:
      'Delivery includes the physical solution, documentation appropriate to the application (drawings, operating instructions, maintenance notes), and a structured handover. For automation and control systems, commissioning and operator training are included. We remain available for post-delivery support within an agreed period.',
    outputs: [
      'Delivered, tested, working solution',
      'Documentation and drawings package',
      'Handover and commissioning support',
    ],
  },
]

export default function ProcessPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 md:pt-40 pb-20 md:pb-28 overflow-hidden">
        <div className="absolute inset-0 line-grid opacity-30" aria-hidden="true" />
        <div className="site-container relative">
          <SectionLabel className="mb-6">Our Process</SectionLabel>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end">
            <div className="lg:col-span-8">
              <h1 className="text-disp-xl text-nm-text-p font-light tracking-tight mb-6">
                From brief to delivered<br />
                solution. No shortcuts.
              </h1>
              <p className="text-body-lg text-nm-text-s leading-relaxed max-w-[54ch]">
                We follow a structured five-stage process that takes an operational problem through
                to an engineered, tested, and delivered solution. The same discipline applies
                whether we are designing a fixture, building a crate system, or integrating an
                automation workstation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Process steps */}
      <section className="pb-20 md:pb-32">
        <div className="site-container">
          <div className="space-y-px bg-nm-border">
            {steps.map((step, i) => (
              <div key={step.index} className="bg-nm-bg hover:bg-nm-s1 transition-colors duration-300">
                <div className="py-12 md:py-16 grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10">
                  {/* Index + duration */}
                  <div className="md:col-span-2">
                    <span className="font-mono text-label-sm text-nm-green-text tracking-[0.14em] block mb-2">
                      {step.index}
                    </span>
                    <span className="font-mono text-label-sm text-nm-text-t tracking-[0.1em] block">
                      {step.duration}
                    </span>
                  </div>

                  {/* Main content */}
                  <div className="md:col-span-5">
                    <h2 className="text-h1 text-nm-text-p font-medium tracking-tight mb-5">
                      {step.title}
                    </h2>
                    <p className="text-body-md text-nm-text-s leading-relaxed mb-4">
                      {step.description}
                    </p>
                    <p className="text-body-md text-nm-text-t leading-relaxed">
                      {step.detail}
                    </p>
                  </div>

                  {/* Outputs */}
                  <div className="md:col-span-5">
                    <div className="p-6 bg-nm-s1 border border-nm-border rounded-sm2">
                      <p className="font-mono text-label-sm text-nm-text-t uppercase tracking-[0.14em] mb-4">
                        Stage Outputs
                      </p>
                      <ul className="space-y-3">
                        {step.outputs.map((output) => (
                          <li key={output} className="flex items-start gap-3">
                            <span
                              className="mt-2 w-1.5 h-1.5 rounded-full bg-nm-green-accent flex-shrink-0"
                              aria-hidden="true"
                            />
                            <span className="text-body-sm text-nm-text-p leading-relaxed">
                              {output}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Connector line */}
                    {i < steps.length - 1 && (
                      <div className="mt-5 flex items-center gap-3" aria-hidden="true">
                        <div className="w-4 h-px bg-nm-green-mid" />
                        <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                          <path d="M1.5 5H8.5M5.5 2L8.5 5L5.5 8" stroke="#2E6642" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <span className="font-mono text-label-sm text-nm-text-t uppercase tracking-[0.1em]">
                          Next stage
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy note */}
      <section className="section-py bg-nm-s1 border-y border-nm-border">
        <div className="site-container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            <div className="lg:col-span-4">
              <SectionLabel className="mb-6">Process Philosophy</SectionLabel>
              <h2 className="text-disp-md text-nm-text-p font-light tracking-tight">
                The process<br />is the product.
              </h2>
            </div>
            <div className="lg:col-span-7 lg:col-start-6 space-y-5">
              <p className="text-body-lg text-nm-text-s leading-relaxed">
                Most engineering problems that reach us have already been attempted informally —
                a workaround, a manual process, a makeshift fixture. The reason they are still
                problems is not usually a lack of effort. It is a lack of structured engineering
                applied at the right point.
              </p>
              <p className="text-body-lg text-nm-text-s leading-relaxed">
                Our process is not bureaucratic overhead. Each stage exists because skipping it
                produces a worse result — a solution that fits the symptom but not the root cause,
                or hardware that works in isolation but fails in the operating environment.
              </p>
              <p className="text-body-lg text-nm-text-s leading-relaxed">
                We adapt the depth of each stage to the nature and scale of the project. A
                straightforward production fixture does not require the same process depth as a
                novel automation system. But the logic — understand, define, design, validate,
                deliver — applies to both.
              </p>
            </div>
          </div>
        </div>
      </section>

      <CTASection
        headline="Ready to start a project?"
        subtext="Send us a brief on what you need. We will come back with a clear view on how to approach it and what the process looks like for your application."
        primaryCTA="Start a Project"
        primaryHref="/contact"
        secondaryCTA="View Solutions"
        secondaryHref="/solutions"
        variant="green"
      />
    </>
  )
}
