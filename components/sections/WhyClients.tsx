import SectionLabel from '@/components/ui/SectionLabel'

const differentiators = [
  {
    index: '01',
    title: 'Engineering review before we print.',
    description:
      'We check your file before it goes on the machine — geometry, wall thickness, print orientation, and potential structural weaknesses. Most services just slice and print. We flag issues first.',
  },
  {
    index: '02',
    title: 'Premium quality as standard.',
    description:
      'We use industrial-grade hardware and take care with every build. Parts arrive clean, accurate, and ready for assembly or use — not something you need to clean up before it is useful.',
  },
  {
    index: '03',
    title: 'Functional parts, not just prototypes.',
    description:
      'We print for development and for use. If your part will be assembled, loaded, or shipped, we treat it accordingly — material, settings, and finish chosen for the application.',
  },
  {
    index: '04',
    title: 'Clear pricing. Fast quoting.',
    description:
      'No black-box pricing. Send your file and you get a quote with material, lead time, and cost — clearly. Most quotes back within 24 hours. No chasing required.',
  },
  {
    index: '05',
    title: 'One-off and repeat orders welcome.',
    description:
      'Single parts, small batches, or ongoing production runs — we work at the volume that makes sense for your project. Repeat orders use saved settings so every batch matches.',
  },
]

export default function WhyClients() {
  return (
    <section className="section-py bg-nm-s1 border-y border-nm-border" aria-labelledby="why-clients-heading">
      <div className="site-container">
        <div className="mb-14 md:mb-18">
          <SectionLabel className="mb-5">Why Northern Modulus</SectionLabel>
          <h2
            id="why-clients-heading"
            className="text-disp-lg text-nm-text-p font-light tracking-tight max-w-[24ch]"
          >
            Premium 3D printing with<br />
            engineering behind it.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-nm-border">
          {differentiators.map((item) => (
            <div key={item.index} className="bg-nm-s1 p-7 md:p-8 hover:bg-nm-s2 transition-colors duration-300 group flex flex-col">
              <div className="flex items-center gap-4 mb-5">
                <span className="font-mono text-label-sm text-nm-green-text tracking-[0.14em]">
                  {item.index}
                </span>
                <div className="h-px flex-1 bg-nm-border group-hover:bg-nm-border-mid transition-colors duration-300" aria-hidden="true" />
              </div>
              <h3 className="text-h3 text-nm-text-p font-medium tracking-tight mb-3">
                {item.title}
              </h3>
              <p className="text-body-sm text-nm-text-s leading-relaxed flex-1">
                {item.description}
              </p>
            </div>
          ))}

          {/* Final CTA tile */}
          <div className="bg-nm-green-deep border-0 p-7 md:p-8 flex flex-col justify-between">
            <p className="text-body-md text-nm-text-s leading-relaxed mb-6">
              Ready to get a quote or ask a question about your part?
            </p>
            <a
              href="/contact"
              className="inline-flex items-center gap-2 font-mono text-label-md uppercase tracking-[0.12em] text-nm-green-text hover:text-nm-green-bright transition-colors duration-200"
            >
              Get a Quote
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                <path d="M2 6H10M6.5 2.5L10 6L6.5 9.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
