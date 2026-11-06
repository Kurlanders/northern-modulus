'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { SHOP_COPY, imageAlt, imageLabel, type Product } from '@/lib/data/products'

const SWIPE_MIN_PX = 40

function useSwipe(onPrev: () => void, onNext: () => void) {
  const start = useRef<{ x: number; y: number } | null>(null)
  return {
    onTouchStart: (e: React.TouchEvent) => {
      start.current = { x: e.touches[0].clientX, y: e.touches[0].clientY }
    },
    onTouchEnd: (e: React.TouchEvent) => {
      if (!start.current) return
      const dx = e.changedTouches[0].clientX - start.current.x
      const dy = e.changedTouches[0].clientY - start.current.y
      start.current = null
      if (Math.abs(dx) < SWIPE_MIN_PX || Math.abs(dy) > Math.abs(dx)) return
      if (dx > 0) onPrev()
      else onNext()
    },
  }
}

const roundButton =
  'absolute top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full border border-nm-border-light bg-nm-bg text-nm-text-p flex items-center justify-center hover:border-nm-green-text transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-nm-green-text'

function Chevron({ direction }: { direction: 'left' | 'right' }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d={direction === 'left' ? 'M10 3L5 8L10 13' : 'M6 3L11 8L6 13'} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function PrevNext({ onPrev, onNext }: { onPrev: () => void; onNext: () => void }) {
  return (
    <>
      <button type="button" aria-label="Previous image" onClick={onPrev} className={`${roundButton} left-3`}>
        <Chevron direction="left" />
      </button>
      <button type="button" aria-label="Next image" onClick={onNext} className={`${roundButton} right-3`}>
        <Chevron direction="right" />
      </button>
    </>
  )
}

function Lightbox({
  src,
  caption,
  position,
  count,
  onPrev,
  onNext,
  onClose,
}: {
  src: string
  caption: string
  position: string
  count: string
  onPrev: () => void
  onNext: () => void
  onClose: () => void
}) {
  const ref = useRef<HTMLDialogElement>(null)
  const swipe = useSwipe(onPrev, onNext)

  // showModal gives the focus trap, Escape and focus return for free.
  useEffect(() => {
    ref.current?.showModal()
    document.body.classList.add('overflow-hidden')
    return () => document.body.classList.remove('overflow-hidden')
  }, [])

  return (
    <dialog
      ref={ref}
      aria-label="Full-screen image"
      onClose={onClose}
      onClick={(e) => {
        if (e.target === ref.current) ref.current?.close()
      }}
      onKeyDown={(e) => {
        if (e.key === 'ArrowLeft') onPrev()
        if (e.key === 'ArrowRight') onNext()
      }}
      className="dark fixed inset-0 m-0 w-screen h-dvh max-w-none max-h-none bg-nm-bg p-0"
      {...swipe}
    >
      <div className="relative w-full h-full flex flex-col">
        <div className="flex items-center justify-between gap-4 px-4 h-16 flex-shrink-0">
          <p className="font-mono text-[13px] text-nm-text-s">{count}</p>
          <button
            type="button"
            autoFocus
            aria-label="Close full-screen image"
            onClick={() => ref.current?.close()}
            className="w-11 h-11 rounded-full border border-nm-border-light text-nm-text-p flex items-center justify-center hover:border-nm-green-text transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-nm-green-text"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M2 2L12 12M12 2L2 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        </div>
        <div className="relative flex-1 min-h-0">
          <Image src={src} alt={caption} fill sizes="100vw" style={{ objectPosition: position }} className="object-contain" />
          <PrevNext onPrev={onPrev} onNext={onNext} />
        </div>
        <p className="px-4 py-3 text-[13px] leading-[1.5] text-nm-text-s text-center flex-shrink-0">{caption}</p>
      </div>
    </dialog>
  )
}

// Keep the image lists in products.ts; replace a render path there with a photo path and nothing here changes.
export default function ShopGallery({ product }: { product: Pick<Product, 'images' | 'imageFocus' | 'imageNotes' | 'name'> }) {
  const { images, imageFocus, imageNotes } = product
  const [selected, setSelected] = useState(0)
  const [lightbox, setLightbox] = useState(false)
  const multiple = images.length > 1

  const go = useCallback(
    (delta: number) => setSelected((index) => (index + delta + images.length) % images.length),
    [images.length]
  )
  const prev = useCallback(() => go(-1), [go])
  const next = useCallback(() => go(1), [go])
  const swipe = useSwipe(prev, next)

  const current = images[selected]
  if (!current) return null
  const alt = imageAlt(current, product.name)
  const position = imageFocus?.[current] ?? 'center'
  const note = imageNotes?.[current]
  const count = `${selected + 1} / ${images.length}`

  return (
    <div
      role="group"
      aria-roledescription="image gallery"
      aria-label={`${product.name} images`}
      onKeyDown={(e) => {
        if (lightbox || !multiple) return
        if (e.key === 'ArrowLeft') prev()
        if (e.key === 'ArrowRight') next()
      }}
    >
      <figure>
        <div className="relative aspect-[4/3] border border-nm-border bg-nm-s3 overflow-hidden touch-pan-y" {...swipe}>
          <button
            type="button"
            onClick={() => setLightbox(true)}
            aria-label={`Open full screen. ${alt}`}
            className="absolute inset-0 w-full h-full cursor-zoom-in focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-nm-green-text"
          >
            <Image
              key={current}
              src={current}
              alt=""
              fill
              priority={selected === 0}
              sizes="(min-width: 1024px) 60vw, 100vw"
              style={{ objectPosition: position }}
              className="object-cover"
            />
          </button>
          {multiple && <PrevNext onPrev={prev} onNext={next} />}
          {multiple && (
            <p aria-live="polite" className="absolute right-3 bottom-3 font-mono text-[12px] text-nm-text-s bg-nm-bg border border-nm-border px-2 py-1 pointer-events-none">
              {count}
            </p>
          )}
        </div>
        <figcaption className="mt-2.5 text-[13px] leading-[1.5] text-nm-text-t">
          {SHOP_COPY.renderNote}
          {note && ` ${note}`}
        </figcaption>
      </figure>

      {multiple && (
        <div className="mt-4 flex gap-2 overflow-x-auto pb-1 sm:grid sm:grid-cols-4 xl:grid-cols-8 sm:overflow-visible sm:pb-0" role="group" aria-label="Choose an image">
          {images.map((image, index) => {
            const active = index === selected
            return (
              <button
                key={image}
                type="button"
                aria-pressed={active}
                onClick={() => setSelected(index)}
                className={`flex flex-col flex-shrink-0 w-[104px] sm:w-auto border bg-nm-s1 text-left transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-nm-green-text ${
                  active ? 'border-nm-green-text' : 'border-nm-border hover:border-nm-field'
                }`}
              >
                <span className="relative block aspect-[4/3] overflow-hidden bg-nm-s3">
                  <Image src={image} alt="" fill sizes="120px" style={{ objectPosition: imageFocus?.[image] ?? 'center' }} className="object-cover" />
                </span>
                <span className="block px-2 py-1.5 border-t border-nm-border text-[12px] leading-[1.3] text-nm-text-s">
                  {imageLabel(image, index)}
                </span>
              </button>
            )
          })}
        </div>
      )}

      {lightbox && (
        <Lightbox
          src={current}
          caption={`${alt}${note ? ` ${note}` : ''}`}
          position={position}
          count={count}
          onPrev={prev}
          onNext={next}
          onClose={() => setLightbox(false)}
        />
      )}
    </div>
  )
}
