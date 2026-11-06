import Link from 'next/link'

export default function ShopAnnouncement() {
  return (
    <section className="bg-nm-s1 border-y border-nm-border" aria-label="New in the shop">
      <div className="site-container py-4">
        <Link
          href="/shop/nm-mast-event"
          className="group flex flex-wrap items-baseline gap-x-3 gap-y-1 text-[15px] text-nm-text-s hover:text-nm-text-p transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-nm-green-text"
        >
          <span className="font-semibold text-nm-green-text">New: NM Mast System</span>
          <span>A telescoping glass-fibre mast, engineered and made in Riga. Pre-orders open.</span>
          <span aria-hidden="true" className="motion-safe:transition-transform duration-200 group-hover:translate-x-[3px]">→</span>
        </Link>
      </div>
    </section>
  )
}
