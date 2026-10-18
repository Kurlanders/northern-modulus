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
