import type { Metadata } from 'next'
import { getSolutionBySlug } from '@/lib/data/solutions'
import SolutionPageTemplate from '@/components/templates/SolutionPageTemplate'
import { notFound } from 'next/navigation'

export const metadata: Metadata = {
  title: 'Product Development & Prototyping — Northern Modulus',
  description:
    'Mechanical design, prototype development, and design-for-manufacture support for manufacturers and product-based businesses. From concept through validated hardware.',
}

export default function ProductDevelopmentPage() {
  const solution = getSolutionBySlug('product-development')
  if (!solution) notFound()
  return <SolutionPageTemplate solution={solution} />
}
