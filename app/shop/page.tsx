import Link from 'next/link'
import Image from 'next/image'
import { pageMetadata } from '@/lib/metadata'
import { publishedProducts, formatPrice } from '@/lib/data/products'

export const metadata = pageMetadata(
  'Shop',
  publishedProducts.length > 0
    ? 'Standard 3D printed parts from Northern Modulus, ready to order. Prices include all applicable taxes.'
    : 'Standard 3D printed parts from Northern Modulus, ready to order. First products launching soon.'
)

function ComingSoon() {
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

export default function ShopPage() {
  if (publishedProducts.length === 0) return <ComingSoon />

  return (
    <>
      <section className="relative pt-[140px] pb-[64px] bg-nm-bg border-b border-nm-border overflow-hidden">
        <div className="absolute inset-0 line-grid opacity-20 pointer-events-none" aria-hidden="true" />
        <div className="site-container relative">
          <p className="text-[12px] font-medium text-nm-text-s tracking-[2.5px] uppercase mb-6">
            {'// Shop'}
          </p>
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-8 items-end">
            <h1 className="text-[clamp(32px,4.5vw,64px)] font-bold text-nm-text-p leading-[1.1] tracking-[-0.025em]">
              Standard parts,<br />
              <span className="text-nm-text-s font-medium">ready to order.</span>
            </h1>
            <p className="text-[14px] text-nm-text-s leading-[1.8] max-w-[400px] lg:pb-2">
              Each part is printed in-house and checked before it ships. Need a
              different size or material?{' '}
              <Link href="/contact" className="text-nm-green-text hover:opacity-80 transition-opacity">
                Get a custom quote
              </Link>
              .
            </p>
          </div>
        </div>
      </section>

      <section className="py-[80px] bg-nm-bg">
        <div className="site-container">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-nm-border border border-nm-border">
            {publishedProducts.map((product) => (
              <Link
                key={product.slug}
                href={`/shop/${product.slug}`}
                className="group bg-nm-s1 hover:bg-nm-s2 transition-colors duration-200 flex flex-col"
              >
                <div className="relative aspect-square overflow-hidden border-b border-nm-border bg-nm-s2">
                  {product.images[0] && (
                    <Image
                      src={product.images[0]}
                      alt={product.name}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover group-hover:scale-[1.02] transition-transform duration-300"
                    />
                  )}
                </div>
                <div className="p-7 flex flex-col flex-1">
                  <div className="flex items-baseline justify-between gap-4 mb-2">
                    <h2 className="text-[17px] font-bold text-nm-text-p tracking-[-0.01em] leading-[1.35]">
                      {product.name}
                    </h2>
                    <span className="text-[17px] font-bold text-nm-text-p whitespace-nowrap">
                      {formatPrice(product.priceEur)}
                    </span>
                  </div>
                  <p className="text-[11px] font-medium text-nm-green-text tracking-[1.5px] uppercase mb-3">
                    {product.material}
                  </p>
                  <p className="text-[13px] text-nm-text-s leading-[1.75]">
                    {product.shortDescription}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
