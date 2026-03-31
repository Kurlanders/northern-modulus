'use client'

import dynamic from 'next/dynamic'
import Button from '@/components/ui/Button'
import SectionLabel from '@/components/ui/SectionLabel'

// Canvas requires WebGL — must be client-only, no SSR
const HeroModel = dynamic(() => import('./HeroModel'), {
  ssr: false,
  loading: () => null,
})

export default function HeroSection() {
  return (
    <section
      className="relative min-h-screen bg-nm-bg overflow-hidden flex items-center"
      aria-label="Hero"
    >
      {/* Subtle dot-grid texture */}
      <div className="absolute inset-0 line-grid opacity-[0.10]" aria-hidden="true" />

      {/* Very faint green ambient glow — top-right corner */}
      <div
        className="absolute top-0 right-0 pointer-events-none"
        style={{
          width: '700px',
          height: '700px',
          background:
            'radial-gradient(circle at 70% 20%, #245040 0%, transparent 60%)',
          opacity: 0.05,
        }}
        aria-hidden="true"
      />

      {/* Bottom edge fade into the next section */}
      <div
        className="absolute inset-x-0 bottom-0 pointer-events-none"
        style={{
          height: '18%',
          background: 'linear-gradient(to top, #0C0D0F, transparent)',
        }}
        aria-hidden="true"
      />

      {/* ── Main grid layout ──────────────────────────────────────────────── */}
      <div className="relative z-10 w-full site-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center min-h-screen gap-0">

          {/* ── Left column: text content ─────────────────────────────────── */}
          <div className="flex flex-col justify-center pt-36 pb-16 lg:pt-0 lg:pb-0 pr-0 lg:pr-12">

            <div
              className="mb-8 animate-fade-in"
              style={{ animationDelay: '0.1s', animationFillMode: 'backwards' }}
            >
              <SectionLabel index="NM" light>Custom 3D Printing</SectionLabel>
            </div>

            <div
              className="animate-fade-up"
              style={{ animationDelay: '0.2s', animationFillMode: 'backwards' }}
            >
              <h1 className="text-disp-2xl text-nm-text-p font-light tracking-tight mb-8">
                Parts built to{' '}
                <span className="text-nm-text-s font-light">engineering</span>
                <br className="hidden sm:block" />
                {' '}standard.
              </h1>
            </div>

            <div
              className="animate-fade-up"
              style={{ animationDelay: '0.32s', animationFillMode: 'backwards' }}
            >
              <p className="text-body-lg text-nm-text-s leading-relaxed mb-10 max-w-[44ch]">
                Premium FDM printing with engineering review as standard —
                prototypes, functional parts, and small-batch production.
              </p>
            </div>

            <div
              className="flex flex-wrap items-center gap-3 mb-14 animate-fade-up"
              style={{ animationDelay: '0.44s', animationFillMode: 'backwards' }}
            >
              <Button href="/contact" variant="primary" size="lg" withArrow>
                Get a Quote
              </Button>
              <Button href="/3d-printing" variant="secondary" size="lg">
                Explore 3D Printing
              </Button>
            </div>

            {/* Stat strip */}
            <div
              className="pt-8 border-t border-nm-border grid grid-cols-2 sm:grid-cols-4 gap-6 animate-fade-up"
              style={{ animationDelay: '0.56s', animationFillMode: 'backwards' }}
            >
              {[
                { value: 'FDM',   label: 'Premium printing' },
                { value: '24h',   label: 'Quote turnaround' },
                { value: '1→500', label: 'Qty range'        },
                { value: 'Eng.',  label: 'Led review'       },
              ].map((s) => (
                <div key={s.value} className="flex flex-col gap-1.5">
                  <span className="font-mono text-[1.4rem] font-light text-nm-text-p tracking-tight leading-none">
                    {s.value}
                  </span>
                  <span className="font-mono text-label-sm text-nm-text-t uppercase tracking-[0.12em]">
                    {s.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* ── Right column: 3D model canvas ─────────────────────────────── */}
          <div
            className="relative h-[55vw] lg:h-screen max-h-[600px] lg:max-h-none"
            aria-hidden="true"
          >
            <HeroModel />
          </div>

        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-20"
        aria-hidden="true"
      >
        <span className="font-mono text-label-sm text-nm-text-t uppercase tracking-[0.14em]">
          Scroll
        </span>
        <svg width="12" height="20" viewBox="0 0 12 20" fill="none">
          <rect x="1" y="1" width="10" height="18" rx="5" stroke="#8C8A85" strokeWidth="1.2" />
          <rect x="5" y="5" width="2" height="4" rx="1" fill="#8C8A85" />
        </svg>
      </div>
    </section>
  )
}
