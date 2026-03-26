import type { Metadata } from 'next'
import SectionLabel from '@/components/ui/SectionLabel'
import Button from '@/components/ui/Button'
import CTASection from '@/components/sections/CTASection'

export const metadata: Metadata = {
  title: 'About Northern Modulus — Engineering-Led Industrial Solutions',
  description:
    'Northern Modulus is an industrial engineering company focused on solving practical physical problems for manufacturers through custom design, prototyping, tooling, and automation.',
}

const principles = [
  {
    index: '01',
    title: 'Engineering is the answer to most manufacturing problems.',
    description:
      'Most production inefficiencies, transit damage incidents, and development delays have an engineering root cause. We apply engineering rigour — not procurement logic, not consultancy frameworks — to solve them.',
  },
  {
    index: '02',
    title: 'A solution that does not work in the operating environment is not a solution.',
    description:
      'We design for the real environment: the production floor, the logistics chain, the operator with gloves on. Theoretical correctness is not enough. We deliver hardware and systems that function where they are used.',
  },
  {
    index: '03',
    title: 'Scope precision prevents cost overrun.',
    description:
      'Vague scope is the most consistent driver of project failure. We invest time at the front end to define what is actually needed — which allows us to deliver it without surprise cost, rework, or misaligned output.',
  },
  {
    index: '04',
    title: 'Manufacturers need partners with industrial fluency.',
    description:
      'Working effectively with manufacturers requires understanding of production environments, material behaviour, operator practicality, and the commercial weight of production downtime. We bring that fluency to every project.',
  },
]

const capabilities = [
  'Mechanical design and CAD (SolidWorks)',
  'Structural and component calculation',
  'Design for manufacture review',
  'Prototype build and validation',
  '3D printing (FDM, SLA, SLS)',
  'Fixture and jig design',
  'Fabrication design (welded, bonded, bolted)',
  'Composite structure and sandwich panel design',
  'Engineered packaging and transport system design',
  'PLC and HMI programming',
  'Beckhoff TwinCAT 3 control systems',
  'Pneumatic and servo system integration',
  'Machine safety design (BS EN ISO 13849)',
  'Small automation system design and build',
  'Test rig design and integration',
]

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 md:pt-40 pb-20 md:pb-28 overflow-hidden">
        <div className="absolute inset-0 line-grid opacity-30" aria-hidden="true" />
        <div className="site-container relative">
          <SectionLabel className="mb-6">About</SectionLabel>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end">
            <div className="lg:col-span-8">
              <h1 className="text-disp-xl text-nm-text-p font-light tracking-tight mb-6">
                Industrial engineering<br />
                with practical intent.
              </h1>
              <p className="text-body-lg text-nm-text-s leading-relaxed max-w-[54ch]">
                We are a focused industrial engineering company. Our purpose is straightforward:
                to identify physical engineering problems inside manufacturing businesses and
                deliver solutions that work in the operating environment.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Company story */}
      <section className="section-py bg-nm-s1 border-y border-nm-border">
        <div className="site-container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
            <div className="lg:col-span-5">
              <SectionLabel className="mb-6">The Company</SectionLabel>
              <h2 className="text-disp-md text-nm-text-p font-light tracking-tight">
                Engineering capacity<br />
                where it is needed.
              </h2>
            </div>
            <div className="lg:col-span-7 space-y-6">
              <p className="text-body-lg text-nm-text-s leading-relaxed">
                Northern Modulus was established to serve a specific gap in the industrial
                engineering market: the space between what a manufacturer can solve internally
                and what a large contractor will price and deliver practically.
              </p>
              <p className="text-body-lg text-nm-text-s leading-relaxed">
                Most manufacturing businesses have engineering problems that are high-value but
                not large-scale. A fixture that needs re-engineering. A crate system that keeps
                failing in transit. A prototype that nobody internally has capacity to properly
                develop. A specific production step that would benefit from automation if someone
                could scope and deliver it properly.
              </p>
              <p className="text-body-lg text-nm-text-s leading-relaxed">
                Large contractors move slowly and price these jobs poorly. Internal engineering
                teams are busy with live production priorities. The result is that the problem
                persists — often for years — at real operational cost.
              </p>
              <p className="text-body-lg text-nm-text-s leading-relaxed">
                We occupy this space deliberately. Our scale allows us to price and scope these
                projects accurately, move at the pace manufacturers expect, and deliver results
                without the overhead structure of a large organisation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Principles */}
      <section className="section-py bg-nm-bg">
        <div className="site-container">
          <div className="mb-14 md:mb-18">
            <SectionLabel className="mb-6">How We Think</SectionLabel>
            <h2 className="text-disp-md text-nm-text-p font-light tracking-tight max-w-[24ch]">
              The principles that define how we work.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
            {principles.map((principle) => (
              <div key={principle.index}>
                <div className="flex items-center gap-4 mb-5">
                  <span className="font-mono text-label-sm text-nm-green-text tracking-[0.14em]">
                    {principle.index}
                  </span>
                  <div className="h-px flex-1 bg-nm-border" aria-hidden="true" />
                </div>
                <h3 className="text-h1 text-nm-text-p font-medium tracking-tight mb-4">
                  {principle.title}
                </h3>
                <p className="text-body-md text-nm-text-s leading-relaxed">
                  {principle.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="section-py bg-nm-s1 border-y border-nm-border">
        <div className="site-container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            <div className="lg:col-span-4">
              <SectionLabel className="mb-6">Capabilities</SectionLabel>
              <h2 className="text-disp-md text-nm-text-p font-light tracking-tight mb-5">
                Technical depth<br />
                behind the solutions.
              </h2>
              <p className="text-body-md text-nm-text-s leading-relaxed">
                Our capability spans mechanical design, fabrication engineering, composite
                structures, control systems, and automation integration. This breadth exists
                because industrial problems rarely stay neatly within one discipline.
              </p>
            </div>
            <div className="lg:col-span-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-nm-border">
                {capabilities.map((cap) => (
                  <div
                    key={cap}
                    className="bg-nm-s1 px-6 py-4 flex items-center gap-3 hover:bg-nm-s2 transition-colors duration-200"
                  >
                    <span
                      className="w-1 h-1 rounded-full bg-nm-green-accent flex-shrink-0"
                      aria-hidden="true"
                    />
                    <span className="text-body-sm text-nm-text-s">{cap}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Who we work with */}
      <section className="section-py bg-nm-bg">
        <div className="site-container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            <div className="lg:col-span-5">
              <SectionLabel className="mb-6">Who We Work With</SectionLabel>
              <h2 className="text-disp-md text-nm-text-p font-light tracking-tight mb-5">
                Manufacturers with<br />
                real engineering needs.
              </h2>
              <p className="text-body-md text-nm-text-s leading-relaxed">
                Our clients are typically small to mid-sized manufacturers and product-based
                businesses with recurring physical workflow problems — particularly those that
                handle non-standard parts, build custom or semi-custom products, or lack the
                internal engineering capacity to solve their own problems.
              </p>
              <div className="mt-8">
                <Button href="/contact" variant="outline" size="md" withArrow>
                  Start a Conversation
                </Button>
              </div>
            </div>
            <div className="lg:col-span-7">
              <div className="space-y-4">
                {[
                  {
                    type: 'Contract manufacturers',
                    detail: 'Businesses that produce custom or semi-custom products for other companies and need production support hardware to handle product variation efficiently.',
                  },
                  {
                    type: 'Industrial product companies',
                    detail: 'Manufacturers developing new products who need mechanical engineering depth at the prototype and pre-production stage without building internal teams.',
                  },
                  {
                    type: 'Precision engineering businesses',
                    detail: 'Machining, fabrication, and specialist manufacturing companies with complex part handling, transport, or fixture requirements.',
                  },
                  {
                    type: 'Machine builders and system integrators',
                    detail: 'Engineering businesses building industrial machinery or systems who need additional mechanical design, structural work, or control integration support.',
                  },
                ].map((item) => (
                  <div
                    key={item.type}
                    className="p-6 bg-nm-s1 border border-nm-border rounded-sm2 hover:border-nm-border-mid transition-colors duration-200"
                  >
                    <p className="text-h3 text-nm-text-p font-medium mb-2">{item.type}</p>
                    <p className="text-body-sm text-nm-text-s leading-relaxed">{item.detail}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <CTASection
        headline="Ready to discuss a project?"
        subtext="We work best with clients who have a clear operational problem and a practical commercial goal. If that sounds like your situation, we should talk."
        primaryCTA="Start a Project"
        primaryHref="/contact"
        secondaryCTA="View Our Process"
        secondaryHref="/process"
        variant="green"
      />
    </>
  )
}
