import Button from '@/components/ui/Button'
import SectionLabel from '@/components/ui/SectionLabel'

export default function HeroSection() {
  return (
    <section
      className="relative min-h-screen flex flex-col justify-center overflow-hidden"
      aria-label="Hero"
    >
      {/* Background grid */}
      <div className="absolute inset-0 line-grid opacity-40" aria-hidden="true" />

      {/* Gradient vignette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 50% 50%, transparent 30%, #0C0D0F 100%)',
        }}
        aria-hidden="true"
      />

      {/* Green accent — top right */}
      <div
        className="absolute top-0 right-0 w-[600px] h-[600px] opacity-[0.04] pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 70% 30%, #2E6642 0%, transparent 65%)',
        }}
        aria-hidden="true"
      />

      {/* Corner mark — top right technical */}
      <div className="absolute top-20 right-8 hidden lg:block" aria-hidden="true">
        <svg width="120" height="120" viewBox="0 0 120 120" fill="none" className="text-nm-border opacity-60">
          <line x1="120" y1="0" x2="120" y2="120" stroke="currentColor" strokeWidth="1" />
          <line x1="0" y1="0" x2="120" y2="0" stroke="currentColor" strokeWidth="1" />
          <line x1="90" y1="0" x2="120" y2="0" stroke="#2E6642" strokeWidth="1.5" />
          <line x1="120" y1="0" x2="120" y2="30" stroke="#2E6642" strokeWidth="1.5" />
          <circle cx="120" cy="0" r="3" fill="#2E6642" />
        </svg>
      </div>

      <div className="site-container relative pt-28 pb-20 md:pt-36 md:pb-28">
        <div className="max-w-site">
          {/* Label */}
          <div className="mb-8 animate-fade-in" style={{ animationDelay: '0.1s', animationFillMode: 'backwards' }}>
            <SectionLabel index="NM" light>
              Industrial Engineering Solutions
            </SectionLabel>
          </div>

          {/* Headline */}
          <div
            className="animate-fade-up"
            style={{ animationDelay: '0.2s', animationFillMode: 'backwards' }}
          >
            <h1 className="text-disp-2xl text-nm-text-p font-light tracking-tight max-w-[18ch] mb-8">
              Engineering solutions{' '}
              <span className="text-nm-text-s font-light">that work</span>{' '}
              <br className="hidden sm:block" />
              in practice.
            </h1>
          </div>

          {/* Subtext + CTA layout */}
          <div
            className="flex flex-col lg:flex-row lg:items-end gap-10 lg:gap-20 animate-fade-up"
            style={{ animationDelay: '0.35s', animationFillMode: 'backwards' }}
          >
            <p className="text-body-lg text-nm-text-s max-w-[50ch] leading-relaxed">
              We help manufacturers and industrial businesses solve practical physical problems —
              through custom fixtures and tooling, engineered transport systems, product
              development, and targeted automation.
            </p>

            <div className="flex flex-wrap items-center gap-3 flex-shrink-0">
              <Button href="/contact" variant="primary" size="lg" withArrow>
                Start a Project
              </Button>
              <Button href="/solutions" variant="secondary" size="lg">
                Explore Solutions
              </Button>
            </div>
          </div>

          {/* Bottom stat strip */}
          <div
            className="mt-20 md:mt-28 pt-8 border-t border-nm-border grid grid-cols-2 sm:grid-cols-4 gap-8 animate-fade-up"
            style={{ animationDelay: '0.5s', animationFillMode: 'backwards' }}
          >
            {[
              { value: '4', label: 'Solution Areas' },
              { value: 'DfM', label: 'Design-for-Manufacture' },
              { value: '01→', label: 'Concept to Delivery' },
              { value: 'B2B', label: 'Manufacturer Focus' },
            ].map((stat) => (
              <div key={stat.label} className="flex flex-col gap-1.5">
                <span className="font-mono text-[1.5rem] font-light text-nm-text-p tracking-tight leading-none">
                  {stat.value}
                </span>
                <span className="font-mono text-label-sm text-nm-text-t uppercase tracking-[0.12em]">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-30 animate-pulse">
        <span className="font-mono text-label-sm text-nm-text-t uppercase tracking-[0.14em]">Scroll</span>
        <svg width="12" height="20" viewBox="0 0 12 20" fill="none" aria-hidden="true">
          <rect x="1" y="1" width="10" height="18" rx="5" stroke="#8C8A85" strokeWidth="1.2" />
          <rect x="5" y="5" width="2" height="4" rx="1" fill="#8C8A85" className="animate-bounce" />
        </svg>
      </div>
    </section>
  )
}
