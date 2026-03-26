import SectionLabel from '@/components/ui/SectionLabel'

const differentiators = [
  {
    index: '01',
    title: 'We engineer solutions, not proposals.',
    description:
      'Every engagement ends with a delivered result — hardware, systems, or validated designs that work in the client\'s environment. We are not a consulting practice that hands over a report.',
  },
  {
    index: '02',
    title: 'We scope precisely.',
    description:
      'We take time to understand the problem before committing to a solution. This avoids over-engineering, unnecessary cost, and solutions that solve the wrong thing.',
  },
  {
    index: '03',
    title: 'We move at manufacturing pace.',
    description:
      'Industrial businesses need decisions and results within commercial timelines. We operate with the urgency and directness that manufacturers expect, without sacrificing engineering rigour.',
  },
  {
    index: '04',
    title: 'We cover the full solution range.',
    description:
      'From mechanical design and prototyping through to tooling, transport systems, and automation — clients bring their operational problems without needing to pre-categorise them.',
  },
]

export default function WhyClients() {
  return (
    <section className="section-py bg-nm-bg" aria-labelledby="why-clients-heading">
      <div className="site-container">
        <div className="mb-14 md:mb-18">
          <SectionLabel className="mb-5">Why Clients Work With Us</SectionLabel>
          <h2
            id="why-clients-heading"
            className="text-disp-lg text-nm-text-p font-light tracking-tight max-w-[22ch]"
          >
            Engineering judgement<br />
            and commercial intelligence.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
          {differentiators.map((item) => (
            <div key={item.index} className="flex flex-col">
              <div className="flex items-center gap-4 mb-5">
                <span className="font-mono text-label-sm text-nm-green-text tracking-[0.14em]">
                  {item.index}
                </span>
                <div className="h-px flex-1 bg-nm-border" aria-hidden="true" />
              </div>
              <h3 className="text-h1 text-nm-text-p font-medium tracking-tight mb-4">
                {item.title}
              </h3>
              <p className="text-body-md text-nm-text-s leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
