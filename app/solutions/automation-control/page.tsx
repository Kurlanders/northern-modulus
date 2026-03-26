import type { Metadata } from 'next'
import { getSolutionBySlug } from '@/lib/data/solutions'
import SolutionPageTemplate from '@/components/templates/SolutionPageTemplate'
import { notFound } from 'next/navigation'

export const metadata: Metadata = {
  title: 'Targeted Automation & Control Integration — Northern Modulus',
  description:
    'Small automation systems, test rigs, semi-automated workstations, and machine control integration for manufacturers. Automation where it delivers real operational return.',
}

export default function AutomationControlPage() {
  const solution = getSolutionBySlug('automation-control')
  if (!solution) notFound()
  return <SolutionPageTemplate solution={solution} />
}
