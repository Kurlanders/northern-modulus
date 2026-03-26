export interface Project {
  id: string
  index: string
  title: string
  category: string
  categorySlug: string
  summary: string
  challenge: string
  solution: string
  outcomes: string[]
  tags: string[]
  status: 'published' | 'draft'
}

export const projects: Project[] = [
  {
    id: 'assembly-fixture-system',
    index: '01',
    title: 'Precision Assembly Fixture System',
    category: 'Tooling & Fixtures',
    categorySlug: 'tooling-fixtures',
    summary:
      'A multi-station fixture system for a contract manufacturer producing custom sub-assemblies across variable product configurations.',
    challenge:
      'The client was experiencing significant cycle time variation and rework rates across a family of similar but dimensionally different sub-assemblies. Manual location was inconsistent and operator-dependent, leading to downstream inspection failures and costly correction.',
    solution:
      'We designed a modular fixture base with interchangeable location pins and clamping inserts, enabling rapid changeover between part variants without full fixture replacement. The system was engineered for single-operator use and manufactured in structural aluminium with hardened contact points.',
    outcomes: [
      'Assembly cycle time reduced by 34% across primary product variants',
      'First-pass inspection rate improved from 81% to 96%',
      'Fixture changeover time under 4 minutes across 6 part configurations',
      'Zero rework attributed to fixture location in post-implementation period',
    ],
    tags: ['Fixtures', 'Modular Design', 'Assembly', 'Process Improvement'],
    status: 'published',
  },
  {
    id: 'transport-crate-precision-components',
    index: '02',
    title: 'Reusable Transport Crate System',
    category: 'Transport & Handling',
    categorySlug: 'transport-handling',
    summary:
      'Engineered reusable shipping crates for a precision engineering company transporting high-value machined components to an international customer.',
    challenge:
      'The client was experiencing transit damage on complex machined parts with tight tolerance features. Single-use foam and cardboard packaging provided inconsistent protection and was generating significant waste cost. The parts were high-value and any surface or feature damage triggered expensive rework or rejection.',
    solution:
      'We designed a purpose-built reusable crate in hardwood-framed marine plywood with CNC-machined foam inserts profiled to each component variant. The crate system included a stacking and nesting design for return logistics, with a visual inspection window and part-count label system built in.',
    outcomes: [
      'Transit damage incidents reduced to zero over a 12-month post-delivery period',
      'Packaging cost per shipment reduced by 61% over two years on a reuse basis',
      'Return logistics cost reduced through optimised nesting and stacking geometry',
      'Customer satisfaction with delivery condition significantly improved',
    ],
    tags: ['Crates', 'Precision Components', 'Reusable Packaging', 'Logistics'],
    status: 'published',
  },
  {
    id: 'functional-test-rig',
    index: '03',
    title: 'End-of-Line Functional Test Rig',
    category: 'Automation & Control',
    categorySlug: 'automation-control',
    summary:
      'A semi-automated functional test station for a product manufacturer requiring consistent end-of-line validation across all production units.',
    challenge:
      'The client had no formalised end-of-line test process. Inspection was manual, inconsistent, and operator-dependent. Field returns were indicating that functional failures were leaving the facility, eroding customer trust and generating warranty cost. The business needed a reliable test gateway before despatch.',
    solution:
      'We designed and built a dedicated test rig with a fixed fixture for part location, integrated pneumatic actuation for test sequence execution, and a Beckhoff-based control system that logged pass/fail data per serial number. The rig reduced test time, removed subjectivity, and created a traceable quality record for every unit.',
    outcomes: [
      'Test time per unit reduced from 8 minutes (manual) to under 90 seconds',
      'Full pass/fail traceability established for first time in production history',
      'Field return rate attributable to end-of-line failures reduced by 78%',
      'Operator training time for test process reduced from days to under an hour',
    ],
    tags: ['Test Rig', 'Beckhoff', 'Automation', 'Quality Control'],
    status: 'published',
  },
  {
    id: 'prototype-development-mechanism',
    index: '04',
    title: 'Mechanism Development & Prototype Build',
    category: 'Product Development',
    categorySlug: 'product-development',
    summary:
      'Mechanical design and prototype build for a novel industrial deployment mechanism requiring validation before production commitment.',
    challenge:
      'The client had a concept for a deployable industrial mechanism but no internal mechanical engineering capability. They needed to validate the kinematic design and test physical performance before investing in production tooling.',
    solution:
      'We led the mechanical design from concept through CAD, identified two kinematic configurations for testing, and produced a set of functional prototypes using a combination of machined metal components and SLS-printed structural elements. The prototypes were used to validate deployment force, range of motion, and durability under load.',
    outcomes: [
      'Two kinematic configurations tested and evaluated within a single prototype sprint',
      'Preferred configuration identified with documented performance data',
      'Design-for-manufacture review completed alongside prototype validation',
      'Client proceeded to production tooling with confidence in design intent',
    ],
    tags: ['Prototyping', 'Mechanism Design', 'CAD', 'Development'],
    status: 'published',
  },
]

export const featuredProjects = projects.filter((p) => p.status === 'published').slice(0, 3)
