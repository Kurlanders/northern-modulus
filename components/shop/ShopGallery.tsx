'use client'

import { useState } from 'react'
import ProductVisual from '@/components/shop/ProductVisual'
import { SHOP_COPY } from '@/lib/data/products'

const viewLabels: Record<string, string> = {
  'illustration:mast': 'Assembled',
  'illustration:collar': 'Lock collar',
  'illustration:base-spike': 'Base',
  'illustration:base-tripod': 'Tripod base',
  'illustration:tops-sheet': 'Top adapters',
  'illustration:packed': 'Packed',
  'illustration:festoon-set': 'The set',
  'illustration:extension': 'Extension',
  'illustration:cross-clamp': 'Clamp',
  'illustration:metal-free': 'Assembled',
  'illustration:top-festoon': 'Festoon top',
  'illustration:top-banner': 'Banner arm',
  'illustration:top-camera': 'Camera top',
  'illustration:top-sail': 'Sail clamp',
  'illustration:scene-festoon': 'In use',
  'illustration:scene-banner': 'In use',
  'illustration:scene-sail': 'In use',
  'illustration:scene-camera': 'In use',
  'illustration:scene-antenna': 'In use',
}

// Illustrations now; swap the entries in products.ts for photo paths and nothing here changes.
export default function ShopGallery({ images, name }: { images: string[]; name: string }) {
  const [selected, setSelected] = useState(0)
  const current = images[Math.min(selected, images.length - 1)]

  return (
    <div>
      <figure>
        <div className="relative aspect-[4/3] border border-nm-border bg-nm-s1 overflow-hidden">
          <div className="absolute inset-0 line-grid opacity-40 pointer-events-none" aria-hidden="true" />
          {current && <ProductVisual src={current} alt={name} priority={selected === 0} />}
        </div>
        <figcaption className="mt-2.5 text-[13px] text-nm-text-t">{SHOP_COPY.illustrationNote}</figcaption>
      </figure>

      {images.length > 1 && (
        <div className="mt-4 flex gap-2 overflow-x-auto pb-1 sm:grid sm:grid-cols-6 sm:overflow-visible sm:pb-0" role="group" aria-label="Product views">
          {images.map((image, index) => {
            const label = viewLabels[image] ?? `View ${index + 1}`
            const active = image === current
            return (
              <button
                key={image}
                type="button"
                aria-pressed={active}
                onClick={() => setSelected(index)}
                className={`group relative flex flex-col flex-shrink-0 w-[104px] sm:w-auto border bg-nm-s1 text-left transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-nm-green-text ${
                  active ? 'border-nm-green-text' : 'border-nm-border hover:border-nm-field'
                }`}
              >
                <span className="relative block aspect-[4/3] overflow-hidden">
                  <ProductVisual src={image} alt="" bare sizes="120px" />
                </span>
                <span className="block px-2 py-1.5 border-t border-nm-border text-[12px] leading-[1.3] text-nm-text-s">{label}</span>
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}
