import type { Metadata } from 'next'
import { getSolutionBySlug } from '@/lib/data/solutions'
import SolutionPageTemplate from '@/components/templates/SolutionPageTemplate'
import { notFound } from 'next/navigation'

export const metadata: Metadata = {
  title: 'Engineered Transport, Packaging & Handling — Northern Modulus',
  description:
    'Purpose-built crates, reusable transport systems, and handling solutions for high-value or complex industrial parts and assemblies.',
}

export default function TransportHandlingPage() {
  const solution = getSolutionBySlug('transport-handling')
  if (!solution) notFound()
  return <SolutionPageTemplate solution={solution} />
}
