import Link from 'next/link'
import { pageMetadata } from '@/lib/metadata'

export const metadata = pageMetadata(
  'Shop',
  'Standard 3D printed parts from Northern Modulus, ready to order. First products launching soon.'
)

export default function ShopPage() {
  return (
    <section className="relative min-h-[80vh] pt-[140px] pb-[100px] bg-nm-bg overflow-hidden flex items-center">
      <div className="absolute inset-0 line-grid opacity-20 pointer-events-none" aria-hidden="true" />
      <div className="site-container relative w-full">
        <p className="text-[12px] font-medium text-nm-text-s tracking-[2.5px] uppercase mb-6">
          {'// Shop'}
        </p>
        <h1 className="text-[clamp(32px,4.5vw,64px)] font-bold text-nm-text-p leading-[1.1] tracking-[-0.025em] mb-6">
          First products<br />
          <span className="text-nm-text-s font-medium">launching soon.</span>
        </h1>
        <p className="text-[15px] text-nm-text-s leading-[1.8] max-w-[480px] mb-10">
          Standard printed parts, ready to order, are on the way. Need a part now? Custom prints
          are available today — send a file or describe what you need.
        </p>
        <Link
          href="/contact"
          className="inline-block bg-nm-green-text text-white px-9 py-[14px] text-[13px] font-semibold hover:opacity-85 transition-opacity"
        >
          Get a Quote →
        </Link>
      </div>
    </section>
  )
}
