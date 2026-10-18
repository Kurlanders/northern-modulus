import fs from 'node:fs'
import path from 'node:path'
import Image from 'next/image'

const PRINTS_DIR = path.join(process.cwd(), 'public', 'pictures', 'prints')
const IMAGE_FILE = /\.(jpe?g|png|webp|avif|gif)$/i

function getPrints(): string[] {
  try {
    return fs.readdirSync(PRINTS_DIR).filter((file) => IMAGE_FILE.test(file)).sort()
  } catch {
    return []
  }
}

function altFromFilename(file: string): string {
  return file.replace(IMAGE_FILE, '').replace(/[-_]+/g, ' ').trim() || 'Recent print'
}

export default function RecentPrints() {
  const prints = getPrints()
  if (prints.length === 0) return null

  return (
    <section className="py-[80px] bg-nm-bg border-t border-nm-border" aria-labelledby="recent-prints-heading">
      <div className="site-container">
        <div className="flex items-end justify-between gap-6 mb-8">
          <div>
            <p className="text-[12px] font-medium text-nm-text-s tracking-[2.5px] uppercase mb-4">
              {'// Recent prints'}
            </p>
            <h2
              id="recent-prints-heading"
              className="text-[clamp(22px,2.5vw,32px)] font-bold text-nm-text-p tracking-[-0.02em]"
            >
              Off the machine.
            </h2>
          </div>
          <a
            href="https://instagram.com/northernmodulus"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[13px] font-semibold text-nm-green-text hover:opacity-80 transition-opacity whitespace-nowrap"
          >
            More on Instagram →
          </a>
        </div>

        <div className="flex gap-px bg-nm-border border border-nm-border overflow-x-auto">
          {prints.map((file) => (
            <div key={file} className="relative w-[240px] sm:w-[280px] aspect-square flex-shrink-0 bg-nm-s1">
              <Image
                src={`/pictures/prints/${encodeURIComponent(file)}`}
                alt={altFromFilename(file)}
                fill
                sizes="280px"
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
