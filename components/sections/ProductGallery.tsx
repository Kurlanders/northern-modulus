'use client'

import { useState } from 'react'
import Image from 'next/image'

export default function ProductGallery({ images, name }: { images: string[]; name: string }) {
  const [active, setActive] = useState(0)

  if (images.length === 0) {
    return <div className="aspect-square bg-nm-s2 border border-nm-border" aria-hidden="true" />
  }

  return (
    <div>
      <div className="relative aspect-square bg-nm-s2 border border-nm-border overflow-hidden">
        <Image
          src={images[active]}
          alt={`${name} — image ${active + 1} of ${images.length}`}
          fill
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="object-cover"
          priority
        />
      </div>

      {images.length > 1 && (
        <div className="mt-3 grid grid-cols-4 sm:grid-cols-5 gap-3">
          {images.map((src, i) => (
            <button
              key={src}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`Show image ${i + 1}`}
              aria-pressed={i === active}
              className={`relative aspect-square overflow-hidden border transition-colors duration-200 ${
                i === active ? 'border-nm-green-text' : 'border-nm-border hover:border-nm-text-t'
              }`}
            >
              <Image src={src} alt="" fill sizes="120px" className="object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
