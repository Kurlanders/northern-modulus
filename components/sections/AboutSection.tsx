import Link from 'next/link'
import SectionLabel from '@/components/ui/SectionLabel'

export default function AboutSection() {
  return (
    <section className="section-py bg-nm-s1 border-y border-nm-border" aria-labelledby="about-section-heading">
      <div className="site-container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left column */}
          <div className="lg:col-span-5">
            <SectionLabel className="mb-5">About Northern Modulus</SectionLabel>
            <h2
              id="about-section-heading"
              className="text-disp-lg text-nm-text-p font-light tracking-tight mb-8"
            >
              Engineering-led.<br />
              Outcome-focused.
            </h2>

            <Link
              href="/about"
              className="inline-flex items-center gap-2 text-label-md font-mono uppercase tracking-[0.12em] text-nm-green-text hover:text-nm-green-bright transition-colors duration-200"
            >
              Read About Us
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                <path d="M2 6H10M6.5 2.5L10 6L6.5 9.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </div>

          {/* Right column */}
          <div className="lg:col-span-7 space-y-6">
            <p className="text-body-lg text-nm-text-s leading-relaxed">
              Northern Modulus exists because most manufacturing businesses encounter physical
              engineering problems that fall between what internal teams can solve and what large
              contractors are willing to scope and price properly.
            </p>
            <p className="text-body-lg text-nm-text-s leading-relaxed">
              We occupy that space deliberately. Our focus is on practical, high-value problems —
              the fixture that is slowing production, the transport system that keeps damaging parts,
              the prototype that no one has the time to properly engineer.
            </p>
            <p className="text-body-lg text-nm-text-s leading-relaxed">
              The work spans mechanical design, fabrication logic, control integration, and
              materials — not as separate disciplines, but as a unified engineering capability
              directed at a single outcome: a solution that functions in the real world.
            </p>

            <div className="pt-4 flex flex-wrap gap-x-12 gap-y-5">
              {[
                { label: 'Primary focus', value: 'Manufacturers & Industrial Businesses' },
                { label: 'Approach', value: 'Problem-scoped Engineering' },
                { label: 'Output', value: 'Delivered, Working Solutions' },
              ].map((item) => (
                <div key={item.label}>
                  <p className="font-mono text-label-sm text-nm-text-t uppercase tracking-[0.12em] mb-1">
                    {item.label}
                  </p>
                  <p className="text-body-sm text-nm-text-s">{item.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
