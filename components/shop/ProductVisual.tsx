import Image from 'next/image'
import Illustration, { illustrationIsScene } from '@/components/shop/Illustrations'

// Resolves a products.ts images[] entry: 'illustration:<key>' draws the SVG, anything else is a photo path.
export default function ProductVisual({
  src,
  alt,
  bare = false,
  sizes = '(min-width: 1024px) 50vw, 100vw',
  priority = false,
}: {
  src: string
  alt: string
  bare?: boolean
  sizes?: string
  priority?: boolean
}) {
  if (src.startsWith('illustration:')) {
    const name = src.slice('illustration:'.length)
    const scene = illustrationIsScene(name)
    return (
      <div className={`absolute inset-0 ${scene ? '' : 'p-[5%]'}`}>
        <Illustration name={name} bare={bare} slice={scene} />
      </div>
    )
  }
  return <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className="object-cover" />
}

export function primaryImage(images: string[]): string {
  return images.find((image) => !image.startsWith('viewer:')) ?? ''
}
