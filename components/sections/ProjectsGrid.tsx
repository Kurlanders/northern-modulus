import Link from 'next/link'
import Image from 'next/image'
import { visibleWork } from '@/lib/data/work'
import Button from '@/components/ui/Button'

export default function ProjectsGrid() {
  const entries = visibleWork.slice(0, 3)
  if (entries.length === 0) return null

  return (
    <section className="py-[120px] bg-nm-s1 border-t border-nm-border" aria-labelledby="work-heading">
      <div className="site-container">

        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-end mb-12 gap-6">
          <div>
            <p className="text-[12px] font-medium text-nm-text-s tracking-[2.5px] uppercase mb-5">
              {'// Recent Work'}
            </p>
            <h2
              id="work-heading"
              className="text-[clamp(28px,3vw,44px)] font-bold text-nm-text-p leading-[1.15] tracking-[-0.02em]"
            >
              Real parts.<br />
              <span className="text-nm-text-s font-medium">Real problems solved.</span>
            </h2>
          </div>
          <Button href="/work" variant="text" size="sm" withArrow className="self-start lg:self-auto">
            All Work
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-px bg-nm-border border border-nm-border">
          {entries.map((entry) => (
            <Link
              key={entry.slug}
              href={`/work#${entry.slug}`}
              className="bg-nm-s1 hover:bg-nm-s2 transition-colors duration-300 flex flex-col"
            >
              <div className="relative h-[240px] overflow-hidden border-b border-nm-border bg-nm-s2">
                {entry.images[0] && (
                  <Image src={entry.images[0]} alt={entry.title} fill sizes="(min-width: 1024px) 33vw, 100vw" className="object-cover" />
                )}
              </div>
              <div className="p-8 flex flex-col flex-1">
                <h3 className="text-[17px] font-bold text-nm-text-p tracking-[-0.01em] mb-3 leading-[1.4]">
                  {entry.title}
                </h3>
                <p className="text-[15px] text-nm-text-s leading-[1.8] mb-6 flex-1">
                  {entry.result}
                </p>
                <p className="text-[12px] font-medium text-nm-text-t tracking-[1.5px] uppercase">
                  {entry.material} · {entry.quantity}
                </p>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  )
}
