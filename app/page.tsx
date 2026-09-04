import type { Metadata } from 'next'
import HeroSection from '@/components/sections/HeroSection'
import WhatWeSolve from '@/components/sections/WhatWeSolve'
import PrintCapabilities from '@/components/sections/PrintCapabilities'
import HowItWorks from '@/components/sections/HowItWorks'
import ProjectsGrid from '@/components/sections/ProjectsGrid'
import AdditionalServices from '@/components/sections/AdditionalServices'
import MeetTheTeamBanner from '@/components/sections/MeetTheTeamBanner'
import CTASection from '@/components/sections/CTASection'

export const metadata: Metadata = {
  title: 'Northern Modulus — Premium Custom 3D Printing',
  description:
    'Premium custom 3D printing for prototypes, functional parts, and small-batch production. Engineering-led file review, material guidance, and fast quoting.',
}

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <WhatWeSolve />
      <PrintCapabilities />
      <HowItWorks />
      <ProjectsGrid />
      <AdditionalServices />
      <MeetTheTeamBanner />
      <CTASection
        headline="Ready to get a quote?"
        subtext="Send your file or describe what you need. We'll review it and come back with a clear quote — material, lead time, and price. Most quotes within 24 hours."
        primaryCTA="Get a Quote"
        primaryHref="/contact"
        secondaryCTA="Explore 3D Printing"
        secondaryHref="/3d-printing"
        variant="green"
      />
    </>
  )
}
