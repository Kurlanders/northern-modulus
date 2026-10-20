export type WorkStatus = 'published' | 'concept'

export interface WorkEntry {
  title: string
  slug: string
  images: string[]
  problem: string
  material: string
  quantity: string
  result: string
  status: WorkStatus
}

export const showConcepts = false

export const work: WorkEntry[] = [
  {
    title: 'Split Ventilation Duct',
    slug: 'asa-ventilation-duct',
    images: ['/pictures/work/asa-ventilation-duct.jpg'],
    problem:
      'A ventilation duct with a tight bend that splits into two outlets underneath, needed at short notice. It had to handle heat, so standard PLA was ruled out, and the shape would have meant several joined pieces if made conventionally.',
    material: 'ASA',
    quantity: '1',
    result:
      'Printed in ASA as a single piece: mounting flange, bend and twin outlets together, with no joins to seal. ASA keeps its shape at higher temperatures than PLA or PETG, and the four mounting holes were printed in place, so the duct was ready to fit.',
    status: 'published',
  },
  {
    title: 'Smart Window Ventilation',
    slug: 'smart-window-ventilation',
    images: ['/pictures/Window_front.png', '/pictures/Window_side.png'],
    problem:
      "Tilt-and-turn windows are usually left either fully closed or tilted open — there's no safe middle ground. Tilted open, they let in rain, cold drafts, noise, and are an easy security gap. Fully closed, indoor air quality and condensation build up, especially in apartments.",
    material: 'TBD',
    quantity: 'TBD',
    result:
      'Early concept: a retrofit device with an inflatable silicone seal and sensor unit that keeps a tilted window ventilated while closing automatically for rain or security.',
    status: 'concept',
  },
]

export const visibleWork = work.filter((entry) => showConcepts || entry.status !== 'concept')
