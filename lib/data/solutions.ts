export interface Solution {
  id: string
  index: string
  title: string
  shortTitle: string
  slug: string
  tagline: string
  description: string
  detail: string
  capabilities: string[]
  outcomes: string[]
  applications: string[]
  cta: string
  ctaHref: string
}

export const solutions: Solution[] = [
  {
    id: 'product-development',
    index: '01',
    title: 'Product Development & Prototyping',
    shortTitle: 'Product Development',
    slug: 'product-development',
    tagline: 'From concept to tested, usable hardware.',
    description:
      'We take mechanical concepts and development problems through structured engineering — from initial brief to validated prototype and manufacturable design.',
    detail:
      'Whether you are developing a new industrial product, refining a mechanism, or need a design-for-manufacture review before committing to tooling, we provide the mechanical engineering depth to move quickly without skipping steps. 3D printing, prototype build support, and close-tolerance design are part of the same process — not separate services.',
    capabilities: [
      'Concept development and mechanical scoping',
      'Mechanical design and CAD modelling',
      'Prototype design and build support',
      '3D printing for development, fit, and functional validation',
      'Design-for-manufacture review and optimisation',
      'Iteration support and design refinement',
    ],
    outcomes: [
      'Faster path from problem brief to testable hardware',
      'Prototype validation before production investment',
      'Manufacturable geometry from the outset',
      'Reduced risk on tooling and production tooling spend',
    ],
    applications: [
      'New industrial product development',
      'Mechanism design and refinement',
      'Component redesign for manufacturability',
      'Pre-tooling prototype builds',
      'Small-batch custom product development',
    ],
    cta: 'Discuss Your Development Brief',
    ctaHref: '/contact',
  },
  {
    id: 'tooling-fixtures',
    index: '02',
    title: 'Tooling, Fixtures & Production Support',
    shortTitle: 'Tooling & Fixtures',
    slug: 'tooling-fixtures',
    tagline: 'Engineered solutions that improve what happens at the workface.',
    description:
      'Custom fixtures, jigs, and production-support hardware that reduce manual variation, support repeatable process, and improve conditions for operators and inspectors.',
    detail:
      'Many production problems — slow cycle times, inconsistent quality, operator strain, error-prone assembly — have engineered solutions that require no complex automation. A well-designed fixture, a proper workholding device, or a purpose-built assembly support changes the performance of a process immediately and durably. We design and deliver this hardware for manufacturers who need a practical result quickly.',
    capabilities: [
      'Custom fixtures and jigs for assembly, welding, and machining',
      'Workholding and clamping solutions',
      'Operator-assist and ergonomic support devices',
      'Inspection aids and gauging fixtures',
      'Assembly supports and sub-assembly jigs',
      'Process-improvement hardware and workcell equipment',
    ],
    outcomes: [
      'Reduced cycle time and process variation',
      'Improved first-pass quality and repeatability',
      'Lower operator fatigue and handling errors',
      'Scalable production capability without full automation',
    ],
    applications: [
      'Sheet metal and fabrication assembly',
      'Machined component inspection and gauging',
      'Weld positioning and part location',
      'Composite layup and bonding fixtures',
      'Custom product final assembly',
      'Workcell and production line improvement',
    ],
    cta: 'Request a Tooling Review',
    ctaHref: '/contact',
  },
  {
    id: 'transport-handling',
    index: '03',
    title: 'Engineered Transport, Packaging & Handling',
    shortTitle: 'Transport & Handling',
    slug: 'transport-handling',
    tagline: 'Purpose-built systems for parts that cannot afford to arrive wrong.',
    description:
      'Engineered crates, transport systems, reusable packaging, and handling solutions for high-value, irregular, or sensitive industrial parts and assemblies.',
    detail:
      'Standard packaging fails complex parts. When you are moving precision components, large assemblies, fragile tooling, or anything that cannot be replaced without significant cost or delay, the transport and handling system needs to be designed — not assembled from off-the-shelf foam and pallets. We build engineered solutions that protect parts, reduce handling risk, and hold up across repeated use and transit cycles.',
    capabilities: [
      'Custom engineered crates for industrial components and assemblies',
      'Reusable transport systems with part-specific internal support',
      'Protective packaging for precision and high-value parts',
      'Storage and racking systems for non-standard geometry',
      'Shipping supports for oversized or irregular products',
      'Handling aids and lift-assist solutions for heavy components',
    ],
    outcomes: [
      'Elimination of transit damage on valuable parts',
      'Reusable systems that reduce per-shipment cost over time',
      'Consistent part orientation and protection across logistics chain',
      'Reduced handling time and manual risk at point of receipt',
    ],
    applications: [
      'Precision machined component transport',
      'Aerospace and defence sub-assembly shipping',
      'Large fabricated structure handling and storage',
      'Tooling and fixture storage systems',
      'High-value prototype and development part transit',
      'Custom product export crating',
    ],
    cta: 'Review a Transport Requirement',
    ctaHref: '/contact',
  },
  {
    id: 'automation-control',
    index: '04',
    title: 'Targeted Automation & Control Integration',
    shortTitle: 'Automation & Control',
    slug: 'automation-control',
    tagline: 'Automation where it returns real value. Not automation for its own sake.',
    description:
      'Small automation systems, test rigs, semi-automated workstations, and machine control upgrades for manufacturers where targeted automation changes process performance.',
    detail:
      'Full-line automation is often the wrong answer to the right question. Many manufacturing improvements are better served by targeted, well-scoped automation — a semi-automated test station, a machine control upgrade, a small integrated system that handles the part of the process that creates most of the delay or variation. We design, build, and integrate these systems with industrial rigour, including Beckhoff-based control where the application suits it.',
    capabilities: [
      'Small automation systems and integrated workcells',
      'Functional test rigs and end-of-line test stations',
      'Semi-automated assembly workstations',
      'Machine control upgrades and PLC integration',
      'Beckhoff TwinCAT-based industrial control integration',
      'Sensor integration, vision, and process monitoring',
    ],
    outcomes: [
      'Measurable cycle time reduction at process bottlenecks',
      'Improved repeatability and reduced operator dependency',
      'Clear ROI scope — automation where the numbers work',
      'Industrial-grade integration with existing equipment',
    ],
    applications: [
      'End-of-line functional testing',
      'Semi-automated assembly and process stations',
      'Machine retrofit and control upgrade',
      'Small-batch automated workcells',
      'Process monitoring and data capture integration',
      'Custom test equipment for production validation',
    ],
    cta: 'Discuss an Automation Opportunity',
    ctaHref: '/contact',
  },
]

export function getSolutionBySlug(slug: string): Solution | undefined {
  return solutions.find((s) => s.slug === slug)
}
