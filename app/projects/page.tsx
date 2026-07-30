import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import CTASection from '@/components/sections/CTASection'
import { projects } from '@/lib/data/projects'

export const metadata: Metadata = {
  title: 'Projects — Northern Modulus',
  description:
    'A selection of engineering projects built and printed at Northern Modulus. Real problems, real results.',
}

const published = projects.filter((p) => p.status === 'published')

export default function ProjectsPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-[140px] pb-[80px] bg-nm-bg border-b border-nm-border overflow-hidden">
        <div className="absolute inset-0 line-grid opacity-20 pointer-events-none" aria-hidden="true" />
        <div className="site-container relative">
          <p className="text-[12px] font-medium text-nm-text-s tracking-[2.5px] uppercase mb-6">
            // Projects
          </p>
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-10 items-end">
            <h1 className="text-[clamp(32px,4.5vw,64px)] font-bold text-nm-text-p leading-[1.1] tracking-[-0.025em]">
              Work that demonstrates<br />
              <span className="text-nm-text-s font-medium">engineering judgement.</span>
            </h1>
            <p className="text-[14px] text-nm-text-s leading-[1.8] max-w-[400px] lg:pb-2">
              Each project here is a specific problem solved through engineering and 3D printing.
              The detail matters — both in the problem definition and in the result.
            </p>
          </div>
        </div>
      </section>

      {/* Project list */}
      <section className="bg-nm-bg">
        {published.map((project, idx) => (
          <article
            key={project.id}
            className={idx > 0 ? 'border-t border-nm-border' : ''}
          >

            {/* Image banner */}
            <div className="grid grid-cols-2 border-b border-nm-border overflow-hidden" style={{ height: '580px' }}>
              {project.images?.[0] && (
                <div className="relative overflow-hidden border-r border-nm-border">
                  <Image
                    src={project.images[0]}
                    alt={`${project.title} — overview`}
                    fill
                    className="object-cover"
                    style={{ objectPosition: 'center 8%' }}
                    priority={idx === 0}
                  />
                </div>
              )}
              {project.images?.[1] && (
                <div className="relative overflow-hidden">
                  <Image
                    src={project.images[1]}
                    alt={`${project.title} — detail`}
                    fill
                    className="object-cover"
                    style={{ objectPosition: 'center 8%' }}
                  />
                </div>
              )}
              {!project.images?.length && (
                <div className="col-span-2 flex items-center justify-center bg-nm-s2">
                  <div className="w-12 h-12 border border-nm-border" />
                </div>
              )}
            </div>

            {/* Content */}
            <div className="site-container py-16 lg:py-20">

              {/* Meta row */}
              <div className="flex flex-wrap items-center gap-3 mb-8">
                <span className="font-mono text-[11px] text-nm-green-text tracking-[2px]">
                  {project.index}
                </span>
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
              <h2 className="text-[clamp(24px,3vw,44px)] font-bold text-nm-text-p tracking-[-0.02em] leading-[1.15] mb-3">
                {project.title}
              </h2>
              {project.subtitle && (
                <p className="text-[14px] font-medium text-nm-green-text mb-8">
                  {project.subtitle}
                </p>
              )}

              {/* Summary */}
              <p className="text-[15px] text-nm-text-s leading-[1.85] max-w-[680px] mb-14">
                {project.summary}
              </p>

              {/* Challenge / Solution */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-px bg-nm-border mb-14">
                <div className="bg-nm-bg p-8 lg:p-10">
                  <p className="text-[11px] font-medium text-nm-text-t tracking-[2px] uppercase mb-5">
                    // The Challenge
                  </p>
                  <p className="text-[13px] text-nm-text-s leading-[1.85]">
                    {project.challenge}
                  </p>
                </div>
                <div className="bg-nm-s1 p-8 lg:p-10">
                  <p className="text-[11px] font-medium text-nm-text-t tracking-[2px] uppercase mb-5">
                    // The Solution
                  </p>
                  <p className="text-[13px] text-nm-text-s leading-[1.85]">
                    {project.solution}
                  </p>
                </div>
              </div>

              {/* Outcomes */}
              <div className="mb-12">
                <p className="text-[11px] font-medium text-nm-text-t tracking-[2px] uppercase mb-7">
                  // Outcomes
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {project.outcomes.map((outcome, i) => (
                    <div key={i} className="flex items-start gap-4 p-5 border border-nm-border bg-nm-s1">
                      <span className="font-mono text-[11px] text-nm-green-text tracking-[2px] flex-shrink-0 mt-0.5">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span className="text-[13px] text-nm-text-p leading-[1.7]">{outcome}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[11px] font-medium text-nm-text-s border border-nm-border px-3 py-1.5 tracking-[0.5px] uppercase"
                  >
                    {tag}
                  </span>
                ))}
              </div>

            </div>
          </article>
        ))}
      </section>

      {/* Confidentiality note */}
      <section className="py-16 bg-nm-s1 border-t border-nm-border border-b border-nm-border">
        <div className="site-container">
          <div className="grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-8 items-start">
            <p className="text-[11px] font-medium text-nm-text-t tracking-[2px] uppercase">
              // Note
            </p>
            <p className="text-[13px] text-nm-text-s leading-[1.85] max-w-[640px]">
              A number of projects are not published here due to client confidentiality requirements.
              The projects shown reflect the quality and scope of work we undertake. If you would
              like to discuss relevant past work before starting an enquiry, we are happy to do so
              under NDA where appropriate.
            </p>
          </div>
        </div>
      </section>

      <CTASection
        headline="Working on something similar?"
        subtext="If any of these projects reflect the kind of problem you're trying to solve, we'd like to hear about your application."
        primaryCTA="Start a Project"
        primaryHref="/contact"
        secondaryCTA="View Capabilities"
        secondaryHref="/3d-printing"
      />
    </>
  )
}
