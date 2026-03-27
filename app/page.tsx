import type { Metadata } from 'next'
import HeroSection from '@/components/sections/HeroSection'
import PositioningStrip from '@/components/sections/PositioningStrip'
import WhatWeSolve from '@/components/sections/WhatWeSolve'
import PrintCapabilities from '@/components/sections/PrintCapabilities'
import HowItWorks from '@/components/sections/HowItWorks'
import WhyClients from '@/components/sections/WhyClients'
import ProjectsGrid from '@/components/sections/ProjectsGrid'
import AboutSection from '@/components/sections/AboutSection'
import AdditionalServices from '@/components/sections/AdditionalServices'
import CTASection from '@/components/sections/CTASection'

export const metadata: Metadata = {
  title: 'Northern Modulus — Premium Custom 3D Printing',
  description:
    'Premium custom 3D printing for prototypes, functional parts, and small-batch production. Engineering-led file review, practical material guidance, and fast quoting.',
}

export default function HomePage() {
  return (
    <>
      {/* 1. Hero — 3D printing primary positioning */}
      <HeroSection />

      {/* 2. Credibility strip */}
      <PositioningStrip />

      {/* 3. What We Print — 3 cards */}
      <WhatWeSolve />

      {/* 4. Capabilities overview */}
      <PrintCapabilities />

      {/* 5. How it works — 4 steps */}
      <HowItWorks />

      {/* 6. Why Northern Modulus — trust + differentiation */}
      <WhyClients />

      {/* 7. Selected projects / portfolio */}
      <ProjectsGrid />

      {/* 8. About / company philosophy */}
      <AboutSection />

      {/* 9. Additional engineering services — secondary */}
      <AdditionalServices />

      {/* 10. Final CTA */}
      <CTASection
        headline="Ready to get a quote?"
        subtext="Send us your file or describe what you need. We'll review it and come back with a clear quote — material, lead time, and price. Most quotes within 24 hours."
        primaryCTA="Get a Quote"
        primaryHref="/contact"
        secondaryCTA="Explore 3D Printing"
        secondaryHref="/3d-printing"
        variant="green"
      />
    </>
  )
}
