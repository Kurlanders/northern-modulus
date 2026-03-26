import Link from 'next/link'
import SectionLabel from '@/components/ui/SectionLabel'
import Button from '@/components/ui/Button'
import { featuredProjects } from '@/lib/data/projects'

export default function ProjectsGrid() {
  return (
    <section className="section-py bg-nm-bg" aria-labelledby="projects-heading">
      <div className="site-container">
        <div className="mb-14 md:mb-18 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
          <div>
            <SectionLabel className="mb-5">Selected Projects</SectionLabel>
            <h2
              id="projects-heading"
              className="text-disp-lg text-nm-text-p font-light tracking-tight max-w-[20ch]"
            >
              Work that demonstrates<br />
              engineering judgement.
            </h2>
          </div>
          <Button href="/projects" variant="secondary" size="md" withArrow>
            All Projects
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-px bg-nm-border">
          {featuredProjects.map((project) => (
            <Link
              key={project.id}
              href={`/projects`}
              className="group bg-nm-bg hover:bg-nm-s1 transition-colors duration-300 flex flex-col"
            >
              {/* Image placeholder */}
              <div className="relative h-52 bg-nm-s1 border-b border-nm-border overflow-hidden">
                <div className="absolute inset-0 dot-grid opacity-50" aria-hidden="true" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="flex flex-col items-center gap-3">
                    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" aria-hidden="true">
                      <rect x="4" y="4" width="14" height="14" stroke="#2E6642" strokeWidth="1.2" />
                      <rect x="12" y="12" width="24" height="24" stroke="#5FA575" strokeWidth="1.2" fill="none" />
                      <rect x="13" y="13" width="10" height="10" fill="#172D21" stroke="#2E6642" strokeWidth="1" />
                    </svg>
                    <span className="font-mono text-label-sm text-nm-text-t uppercase tracking-[0.12em]">
                      {project.category}
                    </span>
                  </div>
                </div>
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-nm-green-deep opacity-0 group-hover:opacity-60 transition-opacity duration-300" />
              </div>

              <div className="p-7 flex flex-col flex-1">
                <div className="flex items-center gap-3 mb-4">
                  <span className="font-mono text-label-sm text-nm-green-text tracking-[0.12em]">
                    {project.index}
                  </span>
                  <span className="font-mono text-label-sm text-nm-text-t uppercase tracking-[0.1em]">
                    {project.category}
                  </span>
                </div>

                <h3 className="text-h2 text-nm-text-p font-medium tracking-tight mb-3 group-hover:text-nm-text-p">
                  {project.title}
                </h3>

                <p className="text-body-sm text-nm-text-s leading-relaxed flex-1">
                  {project.summary}
                </p>

                {/* Tags */}
                <div className="mt-5 flex flex-wrap gap-2">
                  {project.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="font-mono text-label-sm text-nm-text-t border border-nm-border px-2.5 py-1 rounded-sm2 uppercase tracking-[0.1em] group-hover:border-nm-green-mid transition-colors duration-300"
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
