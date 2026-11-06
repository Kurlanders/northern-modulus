'use client'

import { useState } from 'react'
import Link from 'next/link'
import { SHOP_FILTERS, leadTimeLabel, priceLabel, stockLabel, type Product } from '@/lib/data/products'
import ProductVisual, { primaryImage } from '@/components/shop/ProductVisual'

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/shop/${product.slug}`}
      className="group border-r border-b border-nm-border bg-nm-s1 hover:bg-nm-s2 transition-colors duration-200 flex flex-col focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-nm-green-text"
    >
      <div className="relative aspect-[4/3] overflow-hidden border-b border-nm-border">
        <div className="absolute inset-0 line-grid opacity-40 pointer-events-none" aria-hidden="true" />
        <ProductVisual src={primaryImage(product.images)} alt={product.name} sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw" />
      </div>
      <div className="p-6 flex flex-col flex-1">
        <p className="font-mono text-[12px] uppercase tracking-[1.5px] text-nm-green-text mb-3">{stockLabel(product)}</p>
        <div className="flex items-baseline justify-between gap-4 mb-2">
          <h3 className="text-[17px] font-bold text-nm-text-p tracking-[-0.01em] leading-[1.35]">{product.name}</h3>
          <span className="text-[17px] font-bold text-nm-text-p whitespace-nowrap">{priceLabel(product)}</span>
        </div>
        <p className="text-[15px] text-nm-text-s leading-[1.65] mb-4 flex-1">{product.shortDescription}</p>
        <p className="font-mono text-[12px] text-nm-text-t">{leadTimeLabel(product)}</p>
      </div>
    </Link>
  )
}

export default function ProductGrid({ products }: { products: Product[] }) {
  const [filter, setFilter] = useState('all')
  const active = SHOP_FILTERS.find((f) => f.id === filter) ?? SHOP_FILTERS[0]
  const visible = products.filter((p) => !active.categories || (p.category && active.categories.includes(p.category)))

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-8" role="group" aria-label="Filter products">
        {SHOP_FILTERS.map((f) => (
          <button
            key={f.id}
            type="button"
            aria-pressed={filter === f.id}
            onClick={() => setFilter(f.id)}
            className={`min-h-11 px-4 rounded-full border text-[15px] transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-nm-green-text ${
              filter === f.id
                ? 'border-nm-green-text bg-nm-green-deep text-nm-text-p'
                : 'border-nm-border-light text-nm-text-s hover:border-nm-field hover:bg-nm-s2'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-l border-t border-nm-border">
        {visible.map((product) => (
          <ProductCard key={product.slug} product={product} />
        ))}
      </div>
    </div>
  )
}
