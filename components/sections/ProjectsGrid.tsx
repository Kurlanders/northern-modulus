import Link from 'next/link'
import { featuredProjects } from '@/lib/data/projects'

const categoryTag: Record<string, string> = {
  'Tooling & Fixtures':   'TOOLING',
  'Transport & Handling': 'TRANSPORT',
  'Automation & Control': 'AUTOMATION',
  'Product Development':  'PRODUCT',
}

export default function ProjectsGrid() {
  return (
    <section className="py-[120px] bg-nm-s1 border-t border-nm-border" aria-labelledby="projects-heading">
      <div className="site-container">

        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-end mb-12 gap-6">
          <div>
            <p className="text-[12px] font-medium text-nm-text-s tracking-[2.5px] uppercase mb-5">
              // Selected Projects
            </p>
            <h2
              id="projects-heading"
              className="text-[clamp(28px,3vw,44px)] font-bold text-nm-text-p leading-[1.15] tracking-[-0.02em]"
            >
              Work that demonstrates<br />
              <span className="text-nm-text-s font-medium">engineering judgement.</span>
            </h2>
          </div>
          <Link
            href="/projects"
            className="text-[13px] font-semibold text-nm-green-text hover:opacity-80 transition-opacity whitespace-nowrap self-start lg:self-auto"
          >
            All Projects →
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-px bg-nm-border">
          {featuredProjects.map((project) => (
            <Link
              key={project.id}
              href="/projects"
              className="bg-nm-s1 hover:bg-nm-s3 transition-colors duration-300 flex flex-col group"
            >
              {/* Image placeholder */}
              <div className="h-[200px] bg-nm-s2 border-b border-nm-border flex items-center justify-center relative overflow-hidden">
                <div className="w-14 h-14 border border-nm-border flex items-center justify-center">
                  <div className="w-6 h-6 border border-nm-text-t" />
                </div>
                {/* Category tag */}
                <div
                  className="absolute top-4 left-4 px-2.5 py-1 border border-nm-green-text"
                  style={{ background: 'rgba(30,187,110,0.10)' }}
                >
                  <span className="text-[11px] font-semibold text-nm-green-text tracking-[1px]">
                    {categoryTag[project.category] ?? project.category.toUpperCase()}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-8 flex flex-col flex-1">
                <p className="text-[11px] font-medium text-nm-text-t tracking-[1.5px] uppercase mb-3">
                  {project.category}
                </p>
                <h3 className="text-[17px] font-bold text-nm-text-p tracking-[-0.01em] mb-3 leading-[1.4]">
                  {project.title}
                </h3>
                <p className="text-[13px] text-nm-text-s leading-[1.8] mb-6 flex-1">
                  {project.summary}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {project.tags.slice(0, 2).map((tag) => (
                    <span
                      key={tag}
                      className="text-[11px] font-medium text-nm-text-s border border-nm-border px-2.5 py-1 tracking-[0.5px] uppercase"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  )
}
