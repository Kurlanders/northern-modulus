export interface Project {
  id: string
  index: string
  title: string
  subtitle?: string
  category: string
  categorySlug: string
  summary: string
  challenge: string
  solution: string
  outcomes: string[]
  tags: string[]
  images?: string[]
  badge?: string
  status: 'published' | 'draft'
}

export const projects: Project[] = [
  {
    id: 'smart-window-ventilation',
    index: '01',
    title: 'Smart Window Ventilation',
    subtitle: 'Sensor-Triggered Ventilation for Tilt-and-Turn Windows',
    category: 'Product Development',
    categorySlug: 'product-development',
    summary:
      'A retrofit device for tilt-and-turn windows that automates secure ventilation — solving the rain, draft, and security gaps of leaving a window tilted open.',
    challenge:
      'Tilt-and-turn windows are usually left either fully closed or tilted open — there\'s no safe middle ground. Tilted open, they let in rain, cold drafts, noise, and are an easy security gap. Fully closed, indoor air quality and condensation build up, especially in apartments. Most people compromise by tilting the window and hoping the weather holds.',
    solution:
      'An inflatable silicone bladder and telescoping insert seal the tilted gap on demand, controlled by a compact sensor unit with rain, temperature, and manual trigger via USB-C powered fans and valves. The window can stay safely cracked for ventilation without the drawbacks — the seal closes automatically when it rains or when armed for security.',
    outcomes: [
      'Ventilate a tilted window without rain or draft entry',
      'Remove the need to manually monitor weather to keep a window cracked',
      'Close the security gap left by a tilted-open window',
      'Retrofit onto existing tilt-and-turn windows — no replacement hardware',
    ],
    tags: ['Ventilation', 'Smart Home', 'Retrofit', 'Early Concept'],
    images: ['/pictures/Window_front.png', '/pictures/Window_side.png'],
    badge: 'Early Concept',
    status: 'published',
  },
]

export const featuredProjects = projects.filter((p) => p.status === 'published').slice(0, 3)
