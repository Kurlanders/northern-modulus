import Image from 'next/image'
import Link from 'next/link'
import { SHOP_COPY, HERO_RENDER, imageAlt } from '@/lib/data/products'

export default function ShopAnnouncement() {
  return (
    <section className="bg-nm-s1 border-y border-nm-border" aria-label="New in the shop">
      <div className="site-container py-4">
        <Link
          href="/shop/nm-mast-event"
          className="group flex items-center gap-4 text-[15px] text-nm-text-s hover:text-nm-text-p transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-nm-green-text"
        >
          <span className="relative w-16 h-16 flex-shrink-0 overflow-hidden rounded-lg bg-nm-s3">
            <Image src={HERO_RENDER} alt={imageAlt(HERO_RENDER, 'NM Event Mast')} fill sizes="64px" className="object-cover" />
          </span>
          <span className="flex flex-wrap items-baseline gap-x-3 gap-y-1 min-w-0">
            <span className="font-semibold text-nm-green-text">New: NM Mast System</span>
            <span>
              A telescoping glass-fibre mast, engineered and made in Riga. Pre-orders open.{' '}
              <span aria-hidden="true" className="inline-block motion-safe:transition-transform duration-200 group-hover:translate-x-[3px]">→</span>
            </span>
            <span className="text-[13px] text-nm-text-t">{SHOP_COPY.renderNote}</span>
          </span>
        </Link>
      </div>
    </section>
  )
}
