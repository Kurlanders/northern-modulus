import Link from 'next/link'
import CTASection from '@/components/sections/CTASection'
import TeamSection from '@/components/sections/TeamSection'
import { pageMetadata } from '@/lib/metadata'

export const metadata = pageMetadata(
  'About',
  'Northern Modulus is an engineering-led 3D printing company in Riga, Latvia, founded by Rihards Vašuks. Composites manufacturing background, engineering review on every part, in-house production.'
)

const principles = [
  {
    index: '01',
    title: 'Engineering review on every part.',
    description:
      'Before anything is printed, the file is checked: wall thickness, orientation, load paths, tolerances and fit. If something will cause a problem, you hear about it in the quote — not after the print.',
  },
  {
    index: '02',
    title: 'In-house production.',
    description:
      'Every part is printed, checked and packed in-house, with settings saved for repeat orders.',
  },
  {
    index: '03',
    title: 'Honest scope.',
    description:
      'If a part would be better machined, moulded or bought off the shelf, we will say so. Quotes state material, settings, lead time and price.',
  },
  {
    index: '04',
    title: 'Direct contact.',
    description:
      'You deal with the person who reviews, prints and checks your part. No account managers and no hand-offs.',
  },
]

const offers = [
  {
    title: 'Shop',
    description: 'Standard printed parts, ready to order. First products launching soon.',
    href: '/shop',
    cta: 'Go to shop',
  },
  {
    title: 'Custom printing',
    description: 'Prototypes, functional parts, small batches, jigs and fixtures, and moulds — made to your file.',
    href: '/3d-printing',
    cta: 'Custom printing',
  },
]

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-[140px] pb-[80px] bg-nm-bg border-b border-nm-border overflow-hidden">
        <div className="absolute inset-0 line-grid opacity-20 pointer-events-none" aria-hidden="true" />
        <div className="site-container relative">
          <p className="text-[12px] font-medium text-nm-text-s tracking-[2.5px] uppercase mb-6">
            {'// About'}
          </p>
          <h1 className="text-[clamp(32px,4.5vw,64px)] font-bold text-nm-text-p leading-[1.1] tracking-[-0.025em] mb-7">
            Engineering first.<br />
            <span className="text-nm-text-s font-medium">Then printing.</span>
          </h1>
          <p className="text-[15px] text-nm-text-s leading-[1.8] max-w-[560px]">
            Northern Modulus is an engineering-led 3D printing company in Riga, Latvia, founded by
            Rihards Vašuks.
          </p>
        </div>
      </section>

      <TeamSection />

      {/* Background */}
      <section className="py-[100px] bg-nm-bg border-b border-nm-border">
        <div className="site-container">
          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] gap-12 lg:gap-20">
            <div>
              <p className="text-[12px] font-medium text-nm-text-s tracking-[2.5px] uppercase mb-5">
                {'// Background'}
              </p>
              <h2 className="text-[clamp(26px,3vw,42px)] font-bold text-nm-text-p leading-[1.15] tracking-[-0.02em]">
                From composites manufacturing<br />
                <span className="text-nm-text-s font-medium">to printed parts.</span>
              </h2>
            </div>
            <div className="space-y-6">
              <p className="text-[15px] text-nm-text-s leading-[1.85]">
                Rihards&apos; background is in composites manufacturing — an environment where
                moulds, tooling and process control decide whether a part is right first time.
                That experience shapes how every job here is approached.
              </p>
              <p className="text-[15px] text-nm-text-s leading-[1.85]">
                Design work is done in CAD with a mechanical design focus: how a part is
                loaded, how it fits the assembly, and how it will be made. A print is treated as a
                manufactured part, not just a file sent to a machine.
              </p>
              <p className="text-[15px] text-nm-text-s leading-[1.85]">
                Rihards is an engineer who leads projects end to end: from requirements and design
                to production. He is building Northern Modulus to grow into a team of engineers
                working to the same standard.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How we work */}
      <section className="py-[100px] bg-nm-s1 border-b border-nm-border">
        <div className="site-container">
          <p className="text-[12px] font-medium text-nm-text-s tracking-[2.5px] uppercase mb-5">
            {'// How We Work'}
          </p>
          <h2 className="text-[clamp(26px,3vw,42px)] font-bold text-nm-text-p leading-[1.15] tracking-[-0.02em] mb-14">
            Careful work.<br />
            <span className="text-nm-text-s font-medium">On every part.</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-nm-border border border-nm-border">
            {principles.map((p) => (
              <div key={p.index} className="bg-nm-s1 p-9">
                <p className="text-[12px] font-semibold text-nm-green-text tracking-[2px] mb-4">{p.index}</p>
                <h3 className="text-[17px] font-bold text-nm-text-p mb-3 leading-[1.4]">{p.title}</h3>
                <p className="text-[15px] text-nm-text-s leading-[1.85]">{p.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What we offer */}
      <section className="py-[100px] bg-nm-bg">
        <div className="site-container">
          <p className="text-[12px] font-medium text-nm-text-s tracking-[2.5px] uppercase mb-5">
            {'// What We Offer'}
          </p>
          <h2 className="text-[clamp(26px,3vw,42px)] font-bold text-nm-text-p leading-[1.15] tracking-[-0.02em] mb-14">
            Two ways to get a part.
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-nm-border border border-nm-border">
            {offers.map((offer) => (
              <Link
                key={offer.href}
                href={offer.href}
                className="group bg-nm-s1 hover:bg-nm-s2 transition-colors duration-200 p-9 flex flex-col"
              >
                <span className="text-[20px] font-bold text-nm-text-p mb-3">{offer.title}</span>
                <span className="text-[15px] text-nm-text-s leading-[1.7] mb-6 flex-1">{offer.description}</span>
                <span className="text-[13px] font-semibold text-nm-green-text">{offer.cta} →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        headline="Have a part in mind?"
        subtext="Send a file, a sketch or a description. We'll review it and come back with a clear quote — material, lead time and price."
        primaryCTA="Get a Quote"
        primaryHref="/contact"
        secondaryCTA="Custom Printing"
        secondaryHref="/3d-printing"
      />
    </>
  )
}
