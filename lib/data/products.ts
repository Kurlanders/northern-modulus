// All shop prices and copy live in this file, so one edit updates the whole shop.
//
// images[] entries are either real photo paths ('/pictures/products/x.jpg') or a generated
// illustration ('illustration:<key>', see components/shop/Illustrations.tsx). Swap an entry for a photo path when photos exist; nothing else needs to change.

export type ProductCategory = 'kit' | 'bundle' | 'top' | 'base' | 'collar' | 'accessory' | 'engineering'
export type ProductAvailability = 'preorder' | 'made-to-order' | 'quote'

export interface ProductOptionChoice {
  id: string
  label: string
  priceDeltaEur: number
  note?: string
  stripePaymentLink?: string
}

export interface ProductOption {
  id: string
  label: string
  choices: ProductOptionChoice[]
}

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
  category?: ProductCategory
  availability?: ProductAvailability
  shipsFrom?: string
  specs?: { label: string; value: string }[]
  inTheBox?: string[]
  faq?: { q: string; a: string }[]
  relatedSlugs?: string[]
  badges?: string[]
  illustration?: string
  options?: ProductOption[]
}

// Leave empty to keep the supplier unnamed on the site; set it to show the name.
export const TUBE_SUPPLIER_NAME = ''
export const PREORDER_SHIP_DATE = '2027-04-15'

export const SHOP_COPY = {
  vatNote: 'No VAT added (seller not VAT-registered)',
  shipsFromLabel: 'Ships from April 2027',
  preorderLine: 'Pre-order: ships from April 2027',
  partsLeadTime: '3–7 days after order',
  deliveryNote: 'Pickup in Riga, or delivery in Latvia (parcel locker or courier, quoted). Outside Latvia: on request for larger orders.',
  reserveNote: 'No payment now. We confirm availability and delivery date by email within 2 business days.',
  orderNote: 'No payment now. We confirm availability and delivery by email within 2 business days.',
  ratedLoads: 'Rated loads: published after load testing (February 2027)',
  illustrationNote: 'Illustration. Product photos coming soon.',
  returnsStandard: 'Standard shop products can be returned within 14 days.',
  returnsMadeToOrder: { before: 'Made to order: see the ', link: 'returns policy', after: ' for what can be returned.' },
  tube: TUBE_SUPPLIER_NAME
    ? `Pultruded glass-fibre (GFRP) tube, made in Latvia by ${TUBE_SUPPLIER_NAME}`
    : 'Pultruded glass-fibre (GFRP) tube, made in Latvia',
}

export const SHOP_HERO = {
  eyebrow: 'NM Mast System',
  headlineTop: "Structures that don't rust,",
  headlineBottom: 'built in Riga.',
  subline:
    'A telescoping glass-fibre mast with engineered printed nodes. One mast, many jobs: festoon lighting, flags and banners, shade sails, camera rigs and metal-free antenna masts.',
}

export const USE_CASES = [
  { id: 'festoon', title: 'Festoon lighting', text: 'Carry a run of lights across a terrace, garden or event space, with a guy line taking the pull.', illustration: 'scene-festoon', href: '/shop/nm-mast-event?top=festoon' },
  { id: 'banner', title: 'Flags & banners', text: 'A flag arm for one mast, or a crossbar between two for banner gates and backdrops.', illustration: 'scene-banner', href: '/shop/nm-mast-event?top=banner' },
  { id: 'sail', title: 'Shade sails', text: 'A D-ring clamp gives a shade sail a corner point exactly where you need it.', illustration: 'scene-sail', href: '/shop/nm-mast-event?top=sail' },
  { id: 'camera', title: 'Camera & light rigs', text: 'A 1/4" and 3/8" top turns the mast into a tall, light rig for a camera or lamp.', illustration: 'scene-camera', href: '/shop/nm-mast-event?top=camera' },
  { id: 'antenna', title: 'Metal-free antenna masts', text: 'The engineering version uses nylon fasteners: non-conductive and non-magnetic.', illustration: 'scene-antenna', href: '/shop/nm-mast-metal-free' },
]

export const SHOP_FILTERS: { id: string; label: string; categories: ProductCategory[] | null }[] = [
  { id: 'all', label: 'All', categories: null },
  { id: 'kits', label: 'Kits', categories: ['kit', 'bundle', 'accessory'] },
  { id: 'tops', label: 'Tops', categories: ['top'] },
  { id: 'bases', label: 'Bases & collars', categories: ['base', 'collar'] },
  { id: 'engineering', label: 'Engineering', categories: ['engineering'] },
]

export const TRUST_POINTS = [
  'Designed by a composites engineer',
  'Made to order in Riga',
  'No VAT added',
  'Pickup in Riga or delivery in Latvia',
  '14-day returns on shop products',
]

export const CONFIG_REQUEST_TEMPLATE = `NM Metal-Free Mast: configuration request

Height needed:
Payload (what it carries, approximate weight and wind area):
Use (antenna, sensor, EMC test, other):
Quantity:
Anything else we should know:`

// Copy for the flagship page sections (/shop/nm-mast-event).
export const MAST_PAGE = {
  whyPoints: [
    { title: "Doesn't rust", text: "Glass fibre doesn't corrode in rain, salt or de-icing slush, and it isn't cold to the touch." },
    { title: 'Light', text: 'About 4.5 kg per mast and 1.8 m long for transport. One person sets it up.' },
    { title: 'Adjustable', text: 'A positive cross-pin lock at 3 heights, plus a split collar with a knob.' },
    { title: 'Modular', text: 'Swap the top adapter for each job. The same mast does all of them.' },
  ],
  howItWorks: {
    callouts: ['Base: ground spike or tripod', 'Ø60 lower tube', 'Lock collar and cross-pin', 'Ø38 upper tube', 'Top adapter for the job', 'Guy line, opposite the load'],
    steps: [
      { title: 'Set the base', text: 'Drive in the ground spike, or stand the tripod base on paving, concrete or indoors.' },
      { title: 'Raise and pin', text: 'Slide the Ø38 tube up, drop the cross-pin in at one of 3 heights, then tighten the collar knob.' },
      { title: 'Fit the top', text: 'Fit the top adapter for the job: festoon, banner, camera or shade sail.' },
      { title: 'Guy it', text: 'Run the guy line to the side opposite the load and peg it down before you load the mast.' },
    ],
  },
  comparisonRows: [
    { label: 'Corrosion', gfrp: "Doesn't corrode", steel: 'Rusts unless coated', aluminium: 'Can corrode, especially with salt' },
    { label: 'Weight', gfrp: 'Light', steel: 'Heavy', aluminium: 'Light' },
    { label: 'Electrical', gfrp: 'Non-conductive', steel: 'Conductive', aluminium: 'Conductive' },
    { label: 'Magnetic', gfrp: 'Non-magnetic', steel: 'Magnetic', aluminium: 'Non-magnetic' },
    { label: 'Cold to touch', gfrp: 'No', steel: 'Yes', aluminium: 'Yes' },
    { label: 'Stiffness', gfrp: 'Flexes more, so event use is guyed', steel: 'Stiff', aluminium: 'Fairly stiff' },
  ],
  engineeringNotes: [
    'Breaking bending moment of the tube sections (flexural strength × section modulus): 60×4 ≈ 2,430 Nm · 38×3 ≈ 610 Nm · 31×3 ≈ 415 Nm.',
    'GFRP modulus ≈ 19–21 GPa: the mast flexes visibly before it is near its strength limit. That is why event use is always guyed.',
    'Estimated free-standing tip deflection at 50 N side load: ~160 mm (3.2 m) vs ~730 mm (4.5 m). Hence the 4.5 m extension is guyed use only.',
    'Typical festoon pull: a 10 m span with ~0.2 kg/m of lights and 0.3 m sag pulls ~80 N per mast.',
  ],
  safety: [
    'Always use the guy line for festoons and banners, on the side opposite the load.',
    'Do not use in winds above the limit we will publish after load testing. Until then, take the mast down in strong wind.',
    'Not for climbing, for lifting people, or for overhead loads above people.',
    'The 4.5 m extension is for guyed use only.',
  ],
  safetyEngineering: [
    'Guy and load it as specified on your load sheet.',
    'Do not use in winds above the limit we will publish after load testing. Until then, take the mast down in strong wind.',
    'Not for climbing, for lifting people, or for overhead loads above people.',
  ],
}

const PARTS_FAQ = [
  { q: 'When will it ship?', a: 'Parts are made to order and ship 3–7 days after you order. We confirm the date by email.' },
  { q: 'Does it fit my own tube?', a: 'It works with 60 mm, 38 mm and 31 mm OD GFRP round tube. Collars for other tube sizes are made to order: send us a quote request.' },
  { q: 'Can I return it?', a: 'Made to order: see the returns policy for what can be returned.' },
]

const TOP_RELATED = ['nm-mast-event', 'nm-top-festoon', 'nm-top-banner', 'nm-top-camera', 'nm-top-sail']

export const products: Product[] = [
  // Copy this draft to add a product: set draft: false and put images in public/pictures/products/.
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
  {
    slug: 'nm-mast-event',
    name: 'NM Event Mast 3.2 m',
    shortDescription: 'Telescoping GFRP mast kit with a lock collar, ground-spike base, top adapter of your choice and guy kit.',
    description:
      "A telescoping mast made from nested pultruded glass-fibre tubes, joined by engineered printed nodes. It doesn't rust, it isn't cold to the touch, and one person can carry it and set it up. Choose the top adapter for the job and swap it later.",
    priceEur: 179,
    images: ['illustration:mast', 'illustration:collar', 'illustration:base-spike', 'illustration:tops-sheet', 'illustration:packed'],
    material: 'GFRP tube, ASA / PC / PETG-CF nodes',
    dimensions: '3.2 m extended, ~1.8 m for transport',
    leadTimeDays: 0,
    inStock: false,
    draft: false,
    category: 'kit',
    availability: 'preorder',
    shipsFrom: PREORDER_SHIP_DATE,
    badges: ['Pre-order'],
    illustration: 'mast',
    specs: [
      { label: 'Extended height', value: '3.2 m (4.5 m with extension)' },
      { label: 'Transport length', value: '~1.8 m' },
      { label: 'Weight', value: '~4.5 kg' },
      { label: 'Tube', value: 'Pultruded GFRP, Ø60×4 + Ø38×3 mm, made in Latvia' },
      { label: 'Nodes', value: 'ASA / PC / PETG-CF' },
      { label: 'Lock', value: 'Split collar + cross-pin, 3 heights' },
    ],
    inTheBox: [
      '2 GFRP tubes: Ø60×4 and Ø38×3 mm',
      '1 lock collar and sliding bushing',
      '1 ground-spike base (or the tripod base, if you choose it)',
      '1 top adapter of your choice',
      '1 guy kit',
    ],
    options: [
      {
        id: 'top',
        label: 'Top adapter',
        choices: [
          { id: 'festoon', label: 'Festoon', priceDeltaEur: 0 },
          { id: 'banner', label: 'Banner', priceDeltaEur: 0 },
          { id: 'camera', label: 'Camera', priceDeltaEur: 0 },
          { id: 'sail', label: 'Shade sail', priceDeltaEur: 0 },
        ],
      },
      {
        id: 'base',
        label: 'Base',
        choices: [
          { id: 'spike', label: 'Ground spike (included)', priceDeltaEur: 0 },
          { id: 'tripod', label: 'Tripod base', priceDeltaEur: 49 },
        ],
      },
      {
        id: 'extension',
        label: 'Extension to 4.5 m',
        choices: [
          { id: 'none', label: 'No extension', priceDeltaEur: 0 },
          { id: 'yes', label: 'Add extension', priceDeltaEur: 49, note: 'Guyed use only' },
        ],
      },
    ],
    faq: [
      { q: 'How do shipping and pickup work?', a: 'Pick up in Riga, or we deliver in Latvia by parcel locker or courier, quoted with your order. Outside Latvia is on request for larger orders.' },
      { q: 'When will I get it?', a: 'Pre-orders ship from April 2027. We confirm availability and your delivery date by email within 2 business days of your reservation.' },
      { q: 'Do I pay now?', a: 'No. Reserving takes no payment. We confirm by email first and agree payment with you then.' },
      { q: 'What tube sizes does it use?', a: 'Nested round GFRP tube: Ø60×4 mm and Ø38×3 mm, plus an optional Ø31×3 mm section with the 4.5 m extension.' },
      { q: 'Can I use my own tube?', a: 'Yes, if it is 60 mm, 38 mm or 31 mm OD GFRP round tube. The lock collar is sold on its own, and collars for other tube sizes are made to order.' },
      { q: 'Does it work in winter?', a: "Glass fibre doesn't corrode in slush or de-icing salt, and isn't cold to the touch. A spike needs ground it can go into, so use the tripod base on frozen ground or paving. Tested wind and load limits are published after load testing." },
      { q: 'How long does setup take?', a: 'One person can set it up: base, raise and pin, fit the top, guy line. We will publish a measured time with the first delivered kits rather than guess now.' },
      { q: 'What is the returns policy?', a: 'Standard shop products have a 14-day right of withdrawal. Items made to your own specification are excluded. See the returns page.' },
      { q: 'Can I get a custom height or colour?', a: 'Send us a quote request. Custom heights, collars for other tube sizes and other adaptations are made to order.' },
    ],
    relatedSlugs: ['nm-festoon-set-4', 'nm-mast-extension', 'nm-base-tripod', 'nm-top-festoon', 'nm-top-banner', 'nm-cross-clamp'],
  },
  {
    slug: 'nm-festoon-set-4',
    name: 'NM Festoon Set: 4 Masts',
    shortDescription: '4 Event Masts with festoon tops, for lighting a whole space. Saves €67 against 4 single masts.',
    description:
      'Four complete NM Event Masts, each with a festoon top with 3 D-rings and a guy eye. Everything you need to carry lights around a terrace, garden or event space, except the lights.',
    priceEur: 649,
    images: ['illustration:festoon-set', 'illustration:scene-festoon', 'illustration:top-festoon', 'illustration:packed'],
    material: 'GFRP tube, ASA / PC / PETG-CF nodes',
    dimensions: '4 × 3.2 m extended, ~1.8 m for transport',
    leadTimeDays: 0,
    inStock: false,
    draft: false,
    category: 'bundle',
    availability: 'preorder',
    shipsFrom: PREORDER_SHIP_DATE,
    badges: ['Pre-order', 'Save €67'],
    illustration: 'festoon-set',
    specs: [
      { label: 'Contents', value: '4 × NM Event Mast with festoon top' },
      { label: 'Extended height', value: '3.2 m each' },
      { label: 'Transport length', value: '~1.8 m' },
      { label: 'Weight', value: '~4.5 kg per mast' },
    ],
    inTheBox: ['4 complete Event Mast kits', '4 festoon tops (3 D-rings + guy eye)', '4 guy kits'],
    faq: [
      { q: 'When will I get it?', a: 'Pre-orders ship from April 2027. We confirm availability and your delivery date by email within 2 business days of your reservation.' },
      { q: 'Are lights included?', a: 'No. The set is the masts, tops and guy kits. Use your own festoon lights.' },
      { q: 'Do I pay now?', a: 'No. Reserving takes no payment. We confirm by email first and agree payment with you then.' },
    ],
    relatedSlugs: ['nm-mast-event', 'nm-base-tripod', 'nm-mast-extension', 'nm-top-festoon'],
  },
  {
    slug: 'nm-mast-extension',
    name: 'Mast Extension to 4.5 m',
    shortDescription: 'Ø31×3 mm top section and a 38→31 collar. Takes an Event Mast to 4.5 m, guyed use only.',
    description:
      'Adds a Ø31×3 mm GFRP section and a 38→31 lock collar to the Event Mast, taking it from 3.2 m to 4.5 m. A taller mast flexes much more, so this is for guyed use only.',
    priceEur: 49,
    images: ['illustration:extension', 'illustration:mast'],
    material: 'GFRP tube, ASA collar',
    dimensions: 'Ø31×3 mm, takes the mast to 4.5 m',
    leadTimeDays: 7,
    inStock: false,
    draft: false,
    category: 'accessory',
    availability: 'made-to-order',
    badges: ['Made to order', 'Guyed use only'],
    illustration: 'extension',
    faq: PARTS_FAQ,
    relatedSlugs: ['nm-mast-event', 'nm-collar-60-38', 'nm-base-tripod'],
  },
  {
    slug: 'nm-top-festoon',
    name: 'Festoon Top',
    shortDescription: '3 D-rings and a guy eye, for carrying festoon lights in up to three directions.',
    description: 'A top adapter with 3 D-rings for festoon runs and a guy eye for the guy line. Fit it to the mast and hang your lights.',
    priceEur: 19,
    images: ['illustration:top-festoon', 'illustration:scene-festoon'],
    material: 'ASA',
    dimensions: 'Fits the NM Mast top section',
    leadTimeDays: 7,
    inStock: false,
    draft: false,
    category: 'top',
    availability: 'made-to-order',
    badges: ['Made to order'],
    illustration: 'top-festoon',
    faq: PARTS_FAQ,
    relatedSlugs: TOP_RELATED.filter((s) => s !== 'nm-top-festoon'),
  },
  {
    slug: 'nm-top-banner',
    name: 'Flag & Banner Arm',
    shortDescription: 'A side arm that holds a flag or banner out from the mast.',
    description: 'A top adapter with a side arm for flags and vertical banners. Use it with a guy line on the side opposite the load.',
    priceEur: 29,
    images: ['illustration:top-banner', 'illustration:scene-banner'],
    material: 'ASA',
    dimensions: 'Fits the NM Mast top section',
    leadTimeDays: 7,
    inStock: false,
    draft: false,
    category: 'top',
    availability: 'made-to-order',
    badges: ['Made to order'],
    illustration: 'top-banner',
    faq: PARTS_FAQ,
    relatedSlugs: TOP_RELATED.filter((s) => s !== 'nm-top-banner'),
  },
  {
    slug: 'nm-top-camera',
    name: 'Camera & Light Top',
    shortDescription: 'A 1/4" and a 3/8" mount for cameras, lights and small rigs.',
    description: 'A top adapter with standard 1/4" and 3/8" mounts, so a camera or light can sit on top of the mast.',
    priceEur: 24,
    images: ['illustration:top-camera', 'illustration:scene-camera'],
    material: 'ASA',
    dimensions: 'Fits the NM Mast top section; 1/4" + 3/8" mounts',
    leadTimeDays: 7,
    inStock: false,
    draft: false,
    category: 'top',
    availability: 'made-to-order',
    badges: ['Made to order'],
    illustration: 'top-camera',
    faq: PARTS_FAQ,
    relatedSlugs: TOP_RELATED.filter((s) => s !== 'nm-top-camera'),
  },
  {
    slug: 'nm-top-sail',
    name: 'Shade-Sail D-Ring Clamp',
    shortDescription: 'A clamp with a D-ring that gives a shade sail a corner point on the mast.',
    description: 'A clamp with a D-ring for the corner of a shade sail. Use it with a guy line on the side opposite the sail.',
    priceEur: 24,
    images: ['illustration:top-sail', 'illustration:scene-sail'],
    material: 'ASA',
    dimensions: 'Fits the NM Mast top section',
    leadTimeDays: 7,
    inStock: false,
    draft: false,
    category: 'top',
    availability: 'made-to-order',
    badges: ['Made to order'],
    illustration: 'top-sail',
    faq: PARTS_FAQ,
    relatedSlugs: TOP_RELATED.filter((s) => s !== 'nm-top-sail'),
  },
  {
    slug: 'nm-base-tripod',
    name: 'Hard-Ground Tripod Base',
    shortDescription: 'For paving, concrete and indoor use, where a ground spike can\'t go.',
    description: 'A three-legged base for the mast on paving, concrete or indoors, where a ground spike can\'t go. Use it with a guy line or ballast suited to the load.',
    priceEur: 49,
    images: ['illustration:base-tripod', 'illustration:mast'],
    material: 'ASA',
    dimensions: 'Takes the Ø60 mm lower tube',
    leadTimeDays: 7,
    inStock: false,
    draft: false,
    category: 'base',
    availability: 'made-to-order',
    badges: ['Made to order'],
    illustration: 'base-tripod',
    faq: PARTS_FAQ,
    relatedSlugs: ['nm-mast-event', 'nm-collar-60-38', 'nm-cross-clamp'],
  },
  {
    slug: 'nm-cross-clamp',
    name: 'Cross Clamp',
    shortDescription: 'Clamps a crossbar to the mast, to build banner gates and backdrops between two masts.',
    description: 'Clamps a crossbar to the mast. Use a pair of them to build a banner gate or a backdrop between two masts.',
    priceEur: 29,
    images: ['illustration:cross-clamp', 'illustration:scene-banner'],
    material: 'ASA',
    dimensions: 'Fits the NM Mast tube sections',
    leadTimeDays: 7,
    inStock: false,
    draft: false,
    category: 'collar',
    availability: 'made-to-order',
    badges: ['Made to order'],
    illustration: 'cross-clamp',
    faq: PARTS_FAQ,
    relatedSlugs: ['nm-mast-event', 'nm-top-banner', 'nm-collar-60-38'],
  },
  {
    slug: 'nm-collar-60-38',
    name: 'Lock Collar 60→38',
    shortDescription: 'The split collar and cross-pin lock, for building a mast on your own tubes.',
    description: 'The same split collar with knob and cross-pin lock used on the Event Mast, sold on its own for your own 60 mm and 38 mm OD GFRP tubes. Collars for other tube sizes are made to order.',
    priceEur: 29,
    images: ['illustration:collar', 'illustration:mast'],
    material: 'ASA, PC or PETG-CF bushing',
    dimensions: 'Ø60 mm to Ø38 mm OD round tube',
    leadTimeDays: 7,
    inStock: false,
    draft: false,
    category: 'collar',
    availability: 'made-to-order',
    badges: ['Made to order'],
    illustration: 'collar',
    faq: PARTS_FAQ,
    relatedSlugs: ['nm-mast-event', 'nm-base-tripod', 'nm-cross-clamp'],
  },
  {
    slug: 'nm-mast-metal-free',
    name: 'NM Metal-Free Mast (Engineering)',
    shortDescription: 'Nylon and FRP fasteners, configured height and payload, and a load sheet. Non-conductive and non-magnetic.',
    description:
      "An engineering version of the mast with no metal in it: nylon and FRP fasteners throughout. It doesn't disturb antennas, EMC tests or compasses. Height and payload are configured to your job and it comes with a load sheet, so it is quoted rather than sold from stock.",
    priceEur: 450,
    images: ['illustration:metal-free', 'illustration:scene-antenna', 'illustration:collar'],
    material: 'GFRP tube, ASA / PC / PETG-CF nodes, nylon and FRP fasteners',
    dimensions: 'Configured to your height and payload',
    leadTimeDays: 0,
    inStock: false,
    draft: false,
    category: 'engineering',
    availability: 'quote',
    badges: ['Configured to order'],
    illustration: 'metal-free',
    specs: [
      { label: 'Fasteners', value: 'Nylon and FRP, no metal' },
      { label: 'Electrical', value: 'Non-conductive' },
      { label: 'Magnetic', value: 'Non-magnetic' },
      { label: 'Height and payload', value: 'Configured to your job' },
      { label: 'Documentation', value: 'Load sheet for your configuration' },
    ],
    faq: [
      { q: 'What do you need from me?', a: 'The height, what it carries, and what it is for. If you have a drawing or CAD file, attach it. We reply with a configuration and a price.' },
      { q: 'Is it really metal-free?', a: 'Yes: GFRP tube, printed nodes, and nylon or FRP fasteners. Tell us if your job needs anything added, and we will say what that changes.' },
      { q: 'Does it have rated loads?', a: 'Load tests run in January 2027 and rated loads are published after them. Until then, your load sheet states what is calculated and what is tested.' },
    ],
    relatedSlugs: ['nm-mast-event', 'nm-collar-60-38', 'nm-base-tripod'],
  },
]

export const publishedProducts = products.filter((p) => !p.draft)

// Kits first, then parts, then the engineering mast.
const CATEGORY_ORDER: ProductCategory[] = ['kit', 'bundle', 'accessory', 'top', 'base', 'collar', 'engineering']
export const catalogue = [...publishedProducts].sort(
  (a, b) => CATEGORY_ORDER.indexOf(a.category ?? 'accessory') - CATEGORY_ORDER.indexOf(b.category ?? 'accessory')
)

export function getPublishedProduct(slug: string): Product | undefined {
  return publishedProducts.find((p) => p.slug === slug)
}

export function formatPrice(eur: number): string {
  return Number.isInteger(eur) ? `€${eur}` : `€${eur.toFixed(2)}`
}

// Pre-order kits and bundles get the standard line. Made-to-order parts and the engineering mast point to the policy.
export function hasStandardReturns(product: Product): boolean {
  return product.availability === 'preorder' || product.category === 'kit' || product.category === 'bundle'
}

export function priceLabel(product: Product): string {
  return product.availability === 'quote' ? `from ${formatPrice(product.priceEur)}` : formatPrice(product.priceEur)
}

export function leadTimeLabel(product: Product): string {
  if (product.availability === 'preorder') return SHOP_COPY.shipsFromLabel
  if (product.availability === 'made-to-order') return SHOP_COPY.partsLeadTime
  if (product.availability === 'quote') return 'Agreed with your quote'
  return `${product.leadTimeDays} ${product.leadTimeDays === 1 ? 'day' : 'days'}`
}

export function stockLabel(product: Product): string {
  if (product.availability === 'preorder') return 'Pre-order'
  if (product.availability === 'made-to-order') return 'Made to order'
  if (product.availability === 'quote') return 'Configured to order'
  return product.inStock ? 'In stock' : 'Printed to order'
}

export const MAX_ORDER_QUANTITY = 10

export interface ResolvedConfig {
  selections: { option: ProductOption; choice: ProductOptionChoice }[]
  quantity: number
  unitPrice: number
  total: number
  stripePaymentLink?: string
}

// Unknown or missing values fall back to each option's first choice, so a tampered URL can't change a price.
export function resolveConfig(
  product: Product,
  values: Record<string, string | undefined>,
  quantity: number
): ResolvedConfig {
  const selections = (product.options ?? []).map((option) => ({
    option,
    choice: option.choices.find((c) => c.id === values[option.id]) ?? option.choices[0],
  }))
  const qty = Math.min(MAX_ORDER_QUANTITY, Math.max(1, Math.floor(quantity) || 1))
  const unitPrice = product.priceEur + selections.reduce((sum, s) => sum + s.choice.priceDeltaEur, 0)
  return {
    selections,
    quantity: qty,
    unitPrice,
    total: unitPrice * qty,
    stripePaymentLink: selections.find((s) => s.choice.stripePaymentLink)?.choice.stripePaymentLink ?? product.stripePaymentLink,
  }
}

export function reserveHref(product: Product, config: ResolvedConfig): string {
  const params = new URLSearchParams({ product: product.slug, qty: String(config.quantity) })
  for (const { option, choice } of config.selections) params.set(option.id, choice.id)
  return `/shop/reserve?${params.toString()}`
}

export function reservationLabel(product: Product): string {
  return product.availability === 'preorder' ? 'Reservation (pre-order)' : 'Order via enquiry (made to order)'
}

// Structured text for the enquiry email: the backend contract has no fields for a configuration.
export function reservationSummary(product: Product, config: ResolvedConfig): string {
  return [
    reservationLabel(product),
    `Product: ${product.name} (${product.slug})`,
    ...config.selections.map((s) => `${s.option.label}: ${s.choice.label}${s.choice.priceDeltaEur > 0 ? ` (+${formatPrice(s.choice.priceDeltaEur)})` : ''}`),
    `Quantity: ${config.quantity}`,
    `Unit price: ${formatPrice(config.unitPrice)}`,
    `Total: ${formatPrice(config.total)}. ${SHOP_COPY.vatNote}`,
    `Lead time: ${leadTimeLabel(product)}`,
  ].join('\n')
}
