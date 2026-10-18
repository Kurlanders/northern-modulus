import type { Metadata } from 'next'
import HeroSection from '@/components/sections/HeroSection'
import RecentPrints from '@/components/sections/RecentPrints'
import WhatWeSolve from '@/components/sections/WhatWeSolve'
import PrintCapabilities from '@/components/sections/PrintCapabilities'
import HowItWorks from '@/components/sections/HowItWorks'
import ProjectsGrid from '@/components/sections/ProjectsGrid'
import FounderBanner from '@/components/sections/FounderBanner'
import CTASection from '@/components/sections/CTASection'

const TITLE = 'Northern Modulus — Engineering-Led 3D Printing in Riga'
const DESCRIPTION =
  'Standard printed parts from the shop, and custom 3D printing for prototypes, functional parts, small batches, jigs, fixtures and moulds. Engineering review on every part.'

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  openGraph: {
    type: 'website',
    siteName: 'Northern Modulus',
    title: TITLE,
    description: DESCRIPTION,
  },
}

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <RecentPrints />
      <WhatWeSolve />
      <PrintCapabilities />
      <HowItWorks />
      <ProjectsGrid />
      <FounderBanner />
      <CTASection
        headline="Ready to get a quote?"
        subtext="Send your file or describe what you need. We'll review it and come back with a clear quote — material, lead time, and price. Most quotes within one business day."
        primaryCTA="Get a Quote"
        primaryHref="/contact"
        secondaryCTA="Custom Printing"
        secondaryHref="/3d-printing"
        variant="green"
      />
    </>
  )
}
