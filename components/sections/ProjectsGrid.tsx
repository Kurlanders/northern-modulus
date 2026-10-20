import Link from 'next/link'
import Image from 'next/image'
import { visibleWork } from '@/lib/data/work'
import Button from '@/components/ui/Button'

export default function ProjectsGrid() {
  const entries = visibleWork.slice(0, 3)
  if (entries.length === 0) return null
  const single = entries.length === 1

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

        {/* One entry spans the row as a wide card (image left, text right); 2–3 entries share a grid. */}
        <div className={`grid grid-cols-1 ${entries.length === 2 ? 'lg:grid-cols-2' : entries.length >= 3 ? 'lg:grid-cols-3' : ''} gap-px bg-nm-border border border-nm-border`}>
          {entries.map((entry) => (
            <Link
              key={entry.slug}
              href={`/work#${entry.slug}`}
              className={`bg-nm-s1 hover:bg-nm-s2 transition-colors duration-300 flex flex-col ${single ? 'lg:flex-row' : ''}`}
            >
              <div className={`relative overflow-hidden bg-nm-s2 border-nm-border ${single ? 'aspect-[4/5] lg:w-[40%] lg:flex-shrink-0 border-b lg:border-b-0 lg:border-r' : 'h-[240px] border-b'}`}>
                {entry.images[0] && (
                  <Image
                    src={entry.images[0]}
                    alt={entry.title}
                    fill
                    sizes={single ? '(min-width: 1024px) 40vw, 100vw' : '(min-width: 1024px) 33vw, 100vw'}
                    className={entry.images[0].endsWith('.svg') ? 'object-contain p-6' : 'object-cover'}
                  />
                )}
              </div>
              <div className={`p-8 flex flex-col flex-1 ${single ? 'lg:p-12 lg:justify-center' : ''}`}>
                <p className="text-[12px] font-medium text-nm-text-t tracking-[1.5px] uppercase mb-3">
                  {entry.material} · Qty {entry.quantity}
                </p>
                <h3 className={`font-bold text-nm-text-p tracking-[-0.01em] mb-3 leading-[1.3] ${single ? 'text-[clamp(22px,2.2vw,30px)]' : 'text-[17px]'}`}>
                  {entry.title}
                </h3>
                <p className={`text-[15px] text-nm-text-s leading-[1.8] ${single ? 'mb-8 max-w-[520px]' : 'mb-6 flex-1'}`}>
                  {entry.result}
                </p>
                <Button as="span" variant="text" size="sm" withArrow className="self-start">
                  View the part
                </Button>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  )
}
