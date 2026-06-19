const upcomingAreas = [
  {
    index: '01',
    title: 'Tooling, Fixtures & Production Support',
    description:
      'Practical jigs, fixtures, assembly aids, and support hardware to improve repeatability, workflow, and production efficiency.',
  },
  {
    index: '02',
    title: 'Automation & Machine Systems',
    description:
      'Machine, motion, and control-system concepts around smarter workflows, targeted automation, and scalable solutions.',
  },
  {
    index: '03',
    title: 'Custom Transport & Storage Solutions',
    description:
      'Engineered transport, handling, and storage for products and assemblies where protection, structure, and usability matter.',
  },
]

export default function AdditionalServices() {
  return (
    <section className="py-[120px] bg-nm-bg border-t border-nm-border" aria-labelledby="upcoming-heading">
      <div className="site-container">

        {/* Header */}
        <div className="mb-14">
          <p className="text-[12px] font-medium text-nm-text-s tracking-[2.5px] uppercase mb-5">
            // What We&rsquo;re Building
          </p>
          <h2
            id="upcoming-heading"
            className="text-[clamp(28px,3vw,44px)] font-bold text-nm-text-p leading-[1.15] tracking-[-0.02em]"
          >
            Broader engineering<br />
            <span className="text-nm-text-s font-medium">capabilities taking shape.</span>
          </h2>
        </div>

        {/* List */}
        <div>
          {upcomingAreas.map((area, i) => (
            <div
              key={area.index}
              className={`grid grid-cols-[48px_1fr] md:grid-cols-[72px_1fr_180px] gap-8 md:gap-10 items-start md:items-center py-9 border-t border-nm-border ${
                i === upcomingAreas.length - 1 ? 'border-b' : ''
              }`}
            >
              <div className="text-[14px] font-bold text-nm-text-t pt-0.5">{area.index}</div>
              <div>
                <h3 className="text-[17px] font-bold text-nm-text-p mb-2 leading-[1.4]">
                  {area.title}
                </h3>
                <p className="text-[13px] text-nm-text-s leading-[1.8] max-w-[640px]">
                  {area.description}
                </p>
              </div>
              <div className="hidden md:block text-right">
                <span className="text-[11px] font-medium text-nm-text-t border border-nm-border px-3.5 py-1.5 uppercase tracking-[1.5px] whitespace-nowrap">
                  In Development
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
