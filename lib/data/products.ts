export interface Product {
  slug: string
  name: string
  shortDescription: string
  description: string
  priceEur: number
  images: string[]
  material: string
  dimensions: string
  leadTimeDays: number
  inStock: boolean
  stripePaymentLink?: string
  draft: boolean
}

// Copy the example entry, set draft: false, and put images in public/pictures/products/.
export const products: Product[] = [
  {
    slug: 'example-product',
    name: 'Example Product',
    shortDescription: 'One-line summary shown on the shop card.',
    description:
      'Longer description shown on the product page. Explain what the part is for, how it fits, and anything the buyer should know.',
    priceEur: 12,
    images: ['/pictures/products/example-product-1.jpg'],
    material: 'PETG',
    dimensions: '60 × 40 × 20 mm',
    leadTimeDays: 3,
    inStock: true,
    // stripePaymentLink: 'https://buy.stripe.com/...',
    draft: true,
  },
]

export const publishedProducts = products.filter((p) => !p.draft)

export function getPublishedProduct(slug: string): Product | undefined {
  return publishedProducts.find((p) => p.slug === slug)
}

export function formatPrice(eur: number): string {
  return `€${eur.toFixed(2)}`
}
