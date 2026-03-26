import Button from '@/components/ui/Button'

interface CTASectionProps {
  headline?: string
  subtext?: string
  primaryCTA?: string
  primaryHref?: string
  secondaryCTA?: string
  secondaryHref?: string
  variant?: 'dark' | 'green' | 'subtle'
}

export default function CTASection({
  headline = 'Have a project in mind?',
  subtext = "If you have an engineering problem that needs a practical solution, we'd like to hear about it. Send us a brief — we'll come back with a clear view on how to approach it.",
  primaryCTA = 'Start a Project',
  primaryHref = '/contact',
  secondaryCTA = 'Discuss Your Application',
  secondaryHref = '/contact',
  variant = 'green',
}: CTASectionProps) {
  const bg = {
    dark:   'bg-nm-s1 border-y border-nm-border',
    green:  'bg-nm-green-deep border-y border-nm-green-mid',
    subtle: 'bg-nm-bg border-y border-nm-border',
  }[variant]

  return (
    <section className={`section-py-sm ${bg}`} aria-label="Project inquiry call to action">
      <div className="site-container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          <div className="lg:col-span-7">
            {/* Technical accent line */}
            <div className="flex items-center gap-4 mb-7" aria-hidden="true">
              <div className="w-8 h-px bg-nm-green-accent" />
              <span className="font-mono text-label-sm text-nm-green-text uppercase tracking-[0.14em]">
                Project Enquiries
              </span>
            </div>

            <h2 className="text-disp-md text-nm-text-p font-light tracking-tight mb-6">
              {headline}
            </h2>
            <p className="text-body-lg text-nm-text-s leading-relaxed max-w-[52ch]">
              {subtext}
            </p>
          </div>

          <div className="lg:col-span-5 flex flex-col sm:flex-row lg:flex-col xl:flex-row gap-3 lg:items-start xl:items-center">
            <Button href={primaryHref} variant="primary" size="lg" withArrow>
              {primaryCTA}
            </Button>
            <Button href={secondaryHref} variant="secondary" size="lg">
              {secondaryCTA}
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
