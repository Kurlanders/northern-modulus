import type { Metadata } from 'next'
import HeroSection from '@/components/sections/HeroSection'
import PositioningStrip from '@/components/sections/PositioningStrip'
import WhatWeSolve from '@/components/sections/WhatWeSolve'
import SolutionsOverview from '@/components/sections/SolutionsOverview'
import ProjectsGrid from '@/components/sections/ProjectsGrid'
import ProcessSection from '@/components/sections/ProcessSection'
import WhyClients from '@/components/sections/WhyClients'
import AboutSection from '@/components/sections/AboutSection'
import CTASection from '@/components/sections/CTASection'

export const metadata: Metadata = {
  title: 'Northern Modulus — Industrial Engineering Solutions for Manufacturers',
  description:
    'Custom industrial engineering solutions for manufacturers — fixtures, tooling, engineered transport systems, prototyping, and targeted automation. From problem brief to delivered solution.',
}

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <PositioningStrip />
      <WhatWeSolve />
      <SolutionsOverview />
      <ProjectsGrid />
      <ProcessSection />
      <WhyClients />
      <AboutSection />
      <CTASection
        headline="Have a project in mind?"
        subtext="If you have an engineering problem that needs a practical solution, we'd like to hear about it. Send us a brief — we'll come back with a clear view on how to approach it."
        primaryCTA="Start a Project"
        primaryHref="/contact"
        secondaryCTA="Discuss Your Application"
        secondaryHref="/contact"
        variant="green"
      />
    </>
  )
}
