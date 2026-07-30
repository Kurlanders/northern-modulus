import Link from 'next/link'
import Image from 'next/image'
import { featuredProjects } from '@/lib/data/projects'

export default function ProjectsGrid() {
  const isSingle = featuredProjects.length === 1
  const project = featuredProjects[0]

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

        {/* Single project — wide card */}
        {isSingle && project && (
          <div className="border border-nm-border overflow-hidden grid grid-cols-1 lg:grid-cols-2 group hover:border-nm-border-mid transition-colors duration-300">

            {/* Content */}
            <div className="bg-nm-s1 group-hover:bg-nm-s2 transition-colors duration-300 p-10 lg:p-14 flex flex-col justify-between gap-10">
              <div>
                {/* Badge + category */}
                <div className="flex items-center gap-3 mb-8">
                  {project.badge && (
                    <span
                      className="text-[11px] font-semibold text-nm-green-text tracking-[1.5px] uppercase px-2.5 py-1 border border-nm-green-text"
                      style={{ background: 'rgba(30,187,110,0.08)' }}
                    >
                      {project.badge}
                    </span>
                  )}
                  <span className="text-[11px] font-medium text-nm-text-t tracking-[1.5px] uppercase">
                    {project.category}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-[clamp(20px,2.5vw,32px)] font-bold text-nm-text-p tracking-[-0.02em] leading-[1.2] mb-3">
                  {project.title}
                </h3>
                {project.subtitle && (
                  <p className="text-[13px] font-medium text-nm-green-text mb-6">
                    {project.subtitle}
                  </p>
                )}
                <p className="text-[14px] text-nm-text-s leading-[1.85] max-w-[480px]">
                  {project.summary}
                </p>
              </div>

              {/* Bottom: tags + link */}
              <div className="flex flex-col gap-5">
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[11px] font-medium text-nm-text-s border border-nm-border px-2.5 py-1 tracking-[0.5px] uppercase"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <Link
                  href="/projects"
                  className="text-[13px] font-semibold text-nm-green-text hover:opacity-80 transition-opacity"
                >
                  View project details →
                </Link>
              </div>
            </div>

            {/* Images */}
            <div className="grid grid-cols-2 bg-nm-s2 h-[520px] lg:h-auto" style={{ minHeight: '520px' }}>
              {project.images && project.images[0] && (
                <div className="relative overflow-hidden border-r border-nm-border">
                  <Image
                    src={project.images[0]}
                    alt={`${project.title} — front view`}
                    fill
                    className="object-contain p-4"
                  />
                </div>
              )}
              {project.images && project.images[1] && (
                <div className="relative overflow-hidden">
                  <Image
                    src={project.images[1]}
                    alt={`${project.title} — side view`}
                    fill
                    className="object-contain p-4"
                  />
                </div>
              )}
            </div>

          </div>
        )}

        {/* Multi-project grid */}
        {!isSingle && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-px bg-nm-border">
            {featuredProjects.map((p) => (
              <Link
                key={p.id}
                href="/projects"
                className="bg-nm-s1 hover:bg-nm-s3 transition-colors duration-300 flex flex-col group"
              >
                <div className="relative h-[200px] overflow-hidden border-b border-nm-border">
                  {p.images?.[0] ? (
                    <Image src={p.images[0]} alt={p.title} fill className="object-cover" />
                  ) : (
                    <div className="w-full h-full bg-nm-s2 flex items-center justify-center">
                      <div className="w-6 h-6 border border-nm-text-t" />
                    </div>
                  )}
                  {p.badge && (
                    <div
                      className="absolute top-4 left-4 px-2.5 py-1 border border-nm-green-text"
                      style={{ background: 'rgba(30,187,110,0.10)' }}
                    >
                      <span className="text-[11px] font-semibold text-nm-green-text tracking-[1px]">
                        {p.badge}
                      </span>
                    </div>
                  )}
                </div>
                <div className="p-8 flex flex-col flex-1">
                  <p className="text-[11px] font-medium text-nm-text-t tracking-[1.5px] uppercase mb-3">
                    {p.category}
                  </p>
                  <h3 className="text-[17px] font-bold text-nm-text-p tracking-[-0.01em] mb-3 leading-[1.4]">
                    {p.title}
                  </h3>
                  <p className="text-[13px] text-nm-text-s leading-[1.8] mb-6 flex-1">
                    {p.summary}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {p.tags.slice(0, 2).map((tag) => (
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
        )}

      </div>
    </section>
  )
}
