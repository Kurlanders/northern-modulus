'use client'

import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import Button from '@/components/ui/Button'
import ProductVisual, { primaryImage } from '@/components/shop/ProductVisual'
import { SHOP_COPY } from '@/lib/data/products'

const MastViewer = dynamic(() => import('@/components/shop/MastViewer'), { ssr: false, loading: () => null })

const DESKTOP_QUERY = '(min-width: 1024px)'

const viewLabels: Record<string, string> = {
  'viewer:mast': '3D view',
  'illustration:mast': 'Assembled',
  'illustration:collar': 'Lock collar',
  'illustration:base-spike': 'Base',
  'illustration:base-tripod': 'Tripod base',
  'illustration:tops-sheet': 'Top adapters',
  'illustration:packed': 'Packed',
}

// Illustrations now; swap the entries in products.ts for photo paths and nothing here changes.
export default function ShopGallery({ images, name }: { images: string[]; name: string }) {
  const [viewerFailed, setViewerFailed] = useState(false)
  const shown = viewerFailed ? images.filter((image) => !image.startsWith('viewer:')) : images
  const [selected, setSelected] = useState(0)
  const [viewerRequested, setViewerRequested] = useState(false)

  // The 3D chunk only loads by itself on desktop. On phones it waits for a tap, to protect the page load.
  useEffect(() => {
    if (!shown[0]?.startsWith('viewer:') || !window.matchMedia(DESKTOP_QUERY).matches) return
    const timer = window.setTimeout(() => setViewerRequested(true), 1200)
    return () => window.clearTimeout(timer)
  }, [shown])

  const current = shown[Math.min(selected, shown.length - 1)]
  const isViewer = current?.startsWith('viewer:')
  const poster = primaryImage(images)

  return (
    <div>
      <figure>
        <div className="relative aspect-[4/3] border border-nm-border bg-nm-s1 overflow-hidden">
          <div className="absolute inset-0 line-grid opacity-40 pointer-events-none" aria-hidden="true" />
          {isViewer ? (
            <>
              {!viewerRequested && <ProductVisual src={poster} alt={name} priority />}
              {viewerRequested && (
                <div className="absolute inset-0 cursor-grab active:cursor-grabbing" aria-label={`3D model of ${name}. Drag to rotate.`} role="img">
                  <MastViewer onError={() => setViewerFailed(true)} />
                </div>
              )}
              <div className="absolute left-3 bottom-3 pointer-events-none">
                {viewerRequested ? (
                  <span className="font-mono text-[12px] text-nm-text-s bg-nm-bg border border-nm-border px-2.5 py-1.5">Drag to rotate</span>
                ) : (
                  <span className="pointer-events-auto">
                    <Button variant="secondary" size="sm" onClick={() => setViewerRequested(true)} className="bg-nm-bg">
                      Open 3D view
                    </Button>
                  </span>
                )}
              </div>
            </>
          ) : (
            current && <ProductVisual src={current} alt={name} priority={selected === 0} />
          )}
        </div>
        <figcaption className="mt-2.5 text-[13px] text-nm-text-t">{SHOP_COPY.illustrationNote}</figcaption>
      </figure>

      {shown.length > 1 && (
        <div className="mt-4 grid grid-cols-3 sm:grid-cols-6 gap-2" role="group" aria-label="Product views">
          {shown.map((image, index) => {
            const label = viewLabels[image] ?? `View ${index + 1}`
            const active = image === current
            return (
              <button
                key={image}
                type="button"
                aria-pressed={active}
                aria-label={label}
                onClick={() => setSelected(index)}
                className={`group relative flex flex-col border bg-nm-s1 text-left transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-nm-green-text ${
                  active ? 'border-nm-green-text' : 'border-nm-border hover:border-nm-field'
                }`}
              >
                <span className="relative block aspect-[4/3] overflow-hidden">
                  {image.startsWith('viewer:') ? (
                    <span className="absolute inset-0 flex items-center justify-center font-mono text-[13px] text-nm-text-s">3D</span>
                  ) : (
                    <ProductVisual src={image} alt="" bare sizes="120px" />
                  )}
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
