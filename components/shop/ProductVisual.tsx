import Image from 'next/image'
import { imageAlt, type Product } from '@/lib/data/products'

// Fills an aspect-ratio box. Set the box's size on the parent so images never shift the layout.
export default function ProductVisual({
  src,
  product,
  sizes = '(min-width: 1024px) 50vw, 100vw',
  priority = false,
  className = '',
}: {
  src: string
  product: Pick<Product, 'name' | 'imageFocus'>
  sizes?: string
  priority?: boolean
  className?: string
}) {
  if (!src) return null
  return (
    <Image
      src={src}
      alt={imageAlt(src, product.name)}
      fill
      sizes={sizes}
      priority={priority}
      style={{ objectPosition: product.imageFocus?.[src] ?? 'center' }}
      className={`object-cover ${className}`}
    />
  )
}

export function primaryImage(images: string[]): string {
  return images[0] ?? ''
}
