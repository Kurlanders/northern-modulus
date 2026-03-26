import type { Metadata } from 'next'
import { getSolutionBySlug } from '@/lib/data/solutions'
import SolutionPageTemplate from '@/components/templates/SolutionPageTemplate'
import { notFound } from 'next/navigation'

export const metadata: Metadata = {
  title: 'Tooling, Fixtures & Production Support — Northern Modulus',
  description:
    'Custom fixtures, jigs, workholding, and production-support hardware for manufacturers. Engineered solutions that improve process repeatability and reduce variation.',
}

export default function ToolingFixturesPage() {
  const solution = getSolutionBySlug('tooling-fixtures')
  if (!solution) notFound()
  return <SolutionPageTemplate solution={solution} />
}
