import Link from 'next/link'
import { notFound } from 'next/navigation'
import ProductGallery from '@/components/sections/ProductGallery'
import { pageMetadata } from '@/lib/metadata'
import { publishedProducts, getPublishedProduct, formatPrice } from '@/lib/data/products'

export const dynamicParams = false

export function generateStaticParams() {
  return publishedProducts.map((p) => ({ slug: p.slug }))
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const product = getPublishedProduct(params.slug)
  if (!product) return {}
  return pageMetadata(product.name, `${product.shortDescription} ${formatPrice(product.priceEur)}.`)
}

export default function ProductPage({ params }: { params: { slug: string } }) {
  const product = getPublishedProduct(params.slug)
  if (!product) notFound()

  const specs = [
    { label: 'Material',   value: product.material },
    { label: 'Dimensions', value: product.dimensions },
    { label: 'Lead time',  value: `${product.leadTimeDays} ${product.leadTimeDays === 1 ? 'day' : 'days'}` },
    { label: 'Stock',      value: product.inStock ? 'In stock' : 'Printed to order' },
  ]

  return (
    <section className="pt-[120px] pb-[100px] bg-nm-bg">
      <div className="site-container">
        <nav aria-label="Breadcrumb" className="mb-10 text-[12px] text-nm-text-t">
          <Link href="/shop" className="hover:text-nm-text-p transition-colors">Shop</Link>
          <span className="mx-2" aria-hidden="true">/</span>
          <span className="text-nm-text-s">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          <ProductGallery images={product.images} name={product.name} />

          <div>
            <p className="text-[11px] font-medium text-nm-green-text tracking-[2px] uppercase mb-4">
              {product.material}
            </p>
            <h1 className="text-[clamp(28px,3.5vw,48px)] font-bold text-nm-text-p leading-[1.1] tracking-[-0.025em] mb-5">
              {product.name}
            </h1>
            <p className="text-[15px] text-nm-text-s leading-[1.85] mb-8">
              {product.description}
            </p>

            <p className="text-[32px] font-bold text-nm-text-p tracking-[-0.02em] leading-none">
              {formatPrice(product.priceEur)}
            </p>
            <p className="mt-2 mb-8 text-[12px] text-nm-text-t">
              Price includes all applicable taxes. Shipping quoted separately.
            </p>

            {product.stripePaymentLink ? (
              <a
                href={product.stripePaymentLink}
                className="block w-full sm:w-auto sm:inline-block text-center bg-nm-green-text text-white px-10 py-4 text-[14px] font-semibold hover:opacity-85 transition-opacity"
              >
                Buy now →
              </a>
            ) : (
              <Link
                href={`/contact?product=${encodeURIComponent(product.slug)}`}
                className="block w-full sm:w-auto sm:inline-block text-center bg-nm-green-text text-white px-10 py-4 text-[14px] font-semibold hover:opacity-85 transition-opacity"
              >
                Order via enquiry →
              </Link>
            )}

            <p className="mt-5 text-[13px] text-nm-text-s">
              Need a different size or material?{' '}
              <Link href="/contact" className="text-nm-green-text font-semibold hover:opacity-80 transition-opacity">
                Get a custom quote →
              </Link>
            </p>

            <table className="mt-12 w-full border-t border-nm-border text-[13px]">
              <caption className="sr-only">Specifications</caption>
              <tbody>
                {specs.map((row) => (
                  <tr key={row.label} className="border-b border-nm-border">
                    <th scope="row" className="py-3.5 pr-6 text-left font-medium text-nm-text-t uppercase tracking-[1.5px] text-[11px] w-[40%]">
                      {row.label}
                    </th>
                    <td className="py-3.5 text-nm-text-p">{row.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <p className="mt-6 text-[12px] text-nm-text-t">
              Standard shop products can be returned within 14 days.{' '}
              <Link href="/returns" className="underline hover:text-nm-text-s">Returns policy</Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
