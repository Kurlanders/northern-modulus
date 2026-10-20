'use client'

import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import Image from 'next/image'

const HeroModel = dynamic(() => import('./HeroModel'), {
  ssr: false,
  loading: () => null,
})

const DESKTOP_QUERY = '(min-width: 1024px)'

// Static snapshots of the same model (transparent PNGs, one per theme's lighting): shown on mobile,
// and on desktop until the 3D model has loaded.
const FALLBACKS = [
  { src: '/pictures/hero-model-static-light.png', themeClass: 'dark:hidden' },
  { src: '/pictures/hero-model-static-dark.png', themeClass: 'hidden dark:block' },
]

export default function ShopVisual() {
  const [desktop, setDesktop] = useState(false)
  const [modelReady, setModelReady] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia(DESKTOP_QUERY)
    const update = () => setDesktop(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  return (
    <figure className="w-full">
      <div className="relative h-[280px] lg:h-[480px] border border-nm-border bg-nm-s1 overflow-hidden">
        {/* Same grid treatment as the homepage hero */}
        <div
          className="absolute inset-0 pointer-events-none opacity-40 dark:opacity-[0.22]"
          aria-hidden="true"
          style={{
            backgroundImage:
              'linear-gradient(rgb(var(--nm-border)) 1px, transparent 1px), linear-gradient(90deg, rgb(var(--nm-border)) 1px, transparent 1px)',
            backgroundSize: '72px 72px',
          }}
        />
        {FALLBACKS.map((f) => (
          <div
            key={f.src}
            className={`absolute inset-0 transition-opacity duration-700 ${f.themeClass} ${desktop && modelReady ? 'opacity-0' : 'opacity-100'}`}
          >
            <Image src={f.src} alt="" fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-contain" />
          </div>
        ))}
        {desktop && (
          <div className="absolute inset-0" aria-hidden="true">
            <HeroModel onReady={() => setModelReady(true)} />
          </div>
        )}
      </div>
      <figcaption className="mt-3 text-[13px] text-nm-text-t">
        Standard parts, designed and printed in-house.
      </figcaption>
    </figure>
  )
}
