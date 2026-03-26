import type { Metadata } from 'next'
import SectionLabel from '@/components/ui/SectionLabel'
import Button from '@/components/ui/Button'
import CTASection from '@/components/sections/CTASection'
import { projects } from '@/lib/data/projects'

export const metadata: Metadata = {
  title: 'Projects — Selected Engineering Work',
  description:
    'A selection of industrial engineering projects covering fixtures and tooling, engineered transport systems, automation, and product development.',
}

export default function ProjectsPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 md:pt-40 pb-20 md:pb-28 overflow-hidden">
        <div className="absolute inset-0 line-grid opacity-30" aria-hidden="true" />
        <div className="site-container relative">
          <SectionLabel className="mb-6">Selected Projects</SectionLabel>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end">
            <div className="lg:col-span-8">
              <h1 className="text-disp-xl text-nm-text-p font-light tracking-tight mb-6">
                Work that demonstrates<br />
                engineering judgement.
              </h1>
              <p className="text-body-lg text-nm-text-s leading-relaxed max-w-[56ch]">
                Each project below represents a specific operational problem solved through
                engineering. The detail matters — both in the problem definition and in the
                delivered result.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Projects */}
      <section className="pb-20 md:pb-32">
        <div className="site-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-px bg-nm-border">
            {projects.filter((p) => p.status === 'published').map((project) => (
              <article
                key={project.id}
                className="bg-nm-bg hover:bg-nm-s1 transition-colors duration-300 group p-8 md:p-10 flex flex-col"
              >
                {/* Header */}
                <div className="flex items-start justify-between gap-6 mb-6">
                  <div className="flex items-center gap-4">
                    <span className="font-mono text-label-sm text-nm-green-text tracking-[0.14em]">
                      {project.index}
                    </span>
                    <span className="font-mono text-label-sm text-nm-text-t uppercase tracking-[0.1em]">
                      {project.category}
                    </span>
                  </div>
                </div>

                {/* Image placeholder */}
                <div className="relative h-48 bg-nm-s1 border border-nm-border rounded-sm2 mb-7 overflow-hidden">
                  <div className="absolute inset-0 dot-grid opacity-40" aria-hidden="true" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" aria-hidden="true">
                      <rect x="4" y="4" width="18" height="18" stroke="#2E6642" strokeWidth="1.2" />
                      <rect x="14" y="14" width="30" height="30" stroke="#5FA575" strokeWidth="1.2" fill="none" />
                      <rect x="15" y="15" width="12" height="12" fill="#172D21" stroke="#2E6642" strokeWidth="1" />
                    </svg>
                  </div>
                  <div className="absolute inset-0 bg-nm-green-deep opacity-0 group-hover:opacity-50 transition-opacity duration-300" />
                </div>

                {/* Title */}
                <h2 className="text-h1 text-nm-text-p font-medium tracking-tight mb-4">
                  {project.title}
                </h2>

                {/* Summary */}
                <p className="text-body-md text-nm-text-s leading-relaxed mb-6">
                  {project.summary}
                </p>

                {/* Challenge */}
                <div className="mb-6 p-5 bg-nm-s1 border border-nm-border rounded-sm2">
                  <p className="font-mono text-label-sm text-nm-text-t uppercase tracking-[0.12em] mb-2">
                    The Challenge
                  </p>
                  <p className="text-body-sm text-nm-text-s leading-relaxed">
                    {project.challenge}
                  </p>
                </div>

                {/* Outcomes */}
                <div className="mb-7">
                  <p className="font-mono text-label-sm text-nm-text-t uppercase tracking-[0.12em] mb-4">
                    Outcomes
                  </p>
                  <ul className="space-y-2.5">
                    {project.outcomes.map((outcome, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span className="font-mono text-label-sm text-nm-green-text tracking-[0.12em] flex-shrink-0 mt-0.5">
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        <span className="text-body-sm text-nm-text-p leading-relaxed">{outcome}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Tags */}
                <div className="mt-auto flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="font-mono text-label-sm text-nm-text-t border border-nm-border px-2.5 py-1 rounded-sm2 uppercase tracking-[0.1em]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Note on confidentiality */}
      <section className="section-py-sm bg-nm-s1 border-y border-nm-border">
        <div className="site-container">
          <div className="max-w-content mx-auto">
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <div className="flex-shrink-0">
                <span className="font-mono text-label-sm text-nm-text-t uppercase tracking-[0.14em]">
                  Note
                </span>
              </div>
              <p className="text-body-md text-nm-text-s leading-relaxed">
                A number of projects are not published here due to client confidentiality
                requirements. The projects shown reflect the quality and scope of work we
                undertake across all four solution areas. If you would like to discuss
                relevant past work in a specific area before starting a project enquiry,
                we are happy to do so under NDA where appropriate.
              </p>
            </div>
          </div>
        </div>
      </section>

      <CTASection
        headline="Working on something similar?"
        subtext="If any of these projects reflect the kind of problem you are trying to solve, we would like to hear about your application."
        primaryCTA="Start a Project"
        primaryHref="/contact"
        secondaryCTA="View All Solutions"
        secondaryHref="/solutions"
        variant="green"
      />
    </>
  )
}
