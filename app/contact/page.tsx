import type { Metadata } from 'next'
import SectionLabel from '@/components/ui/SectionLabel'
import Button from '@/components/ui/Button'

export const metadata: Metadata = {
  title: 'Start a Project — Project Enquiries',
  description:
    'Send us a project brief or describe your engineering challenge. Northern Modulus responds to serious industrial engineering enquiries within one business day.',
}

const budgetRanges = [
  'Under £5,000',
  '£5,000 – £15,000',
  '£15,000 – £50,000',
  '£50,000 – £150,000',
  'Over £150,000',
  'Not yet defined',
]

const serviceAreas = [
  'Tooling, Fixtures & Production Support',
  'Engineered Transport, Packaging & Handling',
  'Product Development & Prototyping',
  'Targeted Automation & Control Integration',
  'Not sure — need to discuss',
]

export default function ContactPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 md:pt-40 pb-14 md:pb-20 overflow-hidden">
        <div className="absolute inset-0 line-grid opacity-30" aria-hidden="true" />
        <div className="site-container relative">
          <SectionLabel className="mb-6">Start a Project</SectionLabel>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end">
            <div className="lg:col-span-8">
              <h1 className="text-disp-xl text-nm-text-p font-light tracking-tight mb-6">
                Tell us about<br />
                your application.
              </h1>
              <p className="text-body-lg text-nm-text-s leading-relaxed max-w-[52ch]">
                Use the form below to send us a project brief. Include as much detail as you have —
                the more context you give us, the better our initial response will be.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Form + info layout */}
      <section className="pb-20 md:pb-32">
        <div className="site-container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            {/* Form */}
            <div className="lg:col-span-7">
              <form
                className="space-y-6"
                aria-label="Project enquiry form"
                /* No backend: form is design-only. Wire up to Formspree, Resend, or similar on implementation. */
              >
                {/* Contact details */}
                <fieldset className="space-y-5">
                  <legend className="font-mono text-label-sm text-nm-text-t uppercase tracking-[0.14em] mb-5 block">
                    Contact Details
                  </legend>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label
                        htmlFor="name"
                        className="block font-mono text-label-sm text-nm-text-s uppercase tracking-[0.12em] mb-2"
                      >
                        Full Name <span className="text-nm-green-text">*</span>
                      </label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        required
                        autoComplete="name"
                        placeholder="Your name"
                        className="w-full bg-nm-s1 border border-nm-border rounded-sm2 px-4 py-3 text-body-md text-nm-text-p placeholder:text-nm-text-t focus:outline-none focus:border-nm-green-accent transition-colors duration-200"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="company"
                        className="block font-mono text-label-sm text-nm-text-s uppercase tracking-[0.12em] mb-2"
                      >
                        Company <span className="text-nm-green-text">*</span>
                      </label>
                      <input
                        id="company"
                        name="company"
                        type="text"
                        required
                        autoComplete="organization"
                        placeholder="Company name"
                        className="w-full bg-nm-s1 border border-nm-border rounded-sm2 px-4 py-3 text-body-md text-nm-text-p placeholder:text-nm-text-t focus:outline-none focus:border-nm-green-accent transition-colors duration-200"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label
                        htmlFor="email"
                        className="block font-mono text-label-sm text-nm-text-s uppercase tracking-[0.12em] mb-2"
                      >
                        Email <span className="text-nm-green-text">*</span>
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        autoComplete="email"
                        placeholder="your@company.com"
                        className="w-full bg-nm-s1 border border-nm-border rounded-sm2 px-4 py-3 text-body-md text-nm-text-p placeholder:text-nm-text-t focus:outline-none focus:border-nm-green-accent transition-colors duration-200"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="phone"
                        className="block font-mono text-label-sm text-nm-text-s uppercase tracking-[0.12em] mb-2"
                      >
                        Phone
                      </label>
                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        autoComplete="tel"
                        placeholder="+44 (0)..."
                        className="w-full bg-nm-s1 border border-nm-border rounded-sm2 px-4 py-3 text-body-md text-nm-text-p placeholder:text-nm-text-t focus:outline-none focus:border-nm-green-accent transition-colors duration-200"
                      />
                    </div>
                  </div>
                </fieldset>

                <div className="h-px bg-nm-border" aria-hidden="true" />

                {/* Project details */}
                <fieldset className="space-y-5">
                  <legend className="font-mono text-label-sm text-nm-text-t uppercase tracking-[0.14em] mb-5 block">
                    Project Details
                  </legend>

                  {/* Solution area */}
                  <div>
                    <p
                      className="block font-mono text-label-sm text-nm-text-s uppercase tracking-[0.12em] mb-3"
                      id="service-area-label"
                    >
                      Solution Area <span className="text-nm-green-text">*</span>
                    </p>
                    <div
                      role="group"
                      aria-labelledby="service-area-label"
                      className="flex flex-wrap gap-2"
                    >
                      {serviceAreas.map((area) => (
                        <label
                          key={area}
                          className="flex items-center gap-2 px-3.5 py-2 bg-nm-s1 border border-nm-border rounded-sm2 cursor-pointer hover:border-nm-border-mid hover:bg-nm-s2 transition-colors duration-200 has-[:checked]:border-nm-green-accent has-[:checked]:bg-nm-green-deep"
                        >
                          <input
                            type="radio"
                            name="serviceArea"
                            value={area}
                            className="sr-only"
                          />
                          <span className="text-body-sm text-nm-text-s">{area}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* What do you need help with */}
                  <div>
                    <label
                      htmlFor="help"
                      className="block font-mono text-label-sm text-nm-text-s uppercase tracking-[0.12em] mb-2"
                    >
                      What Do You Need Help With? <span className="text-nm-green-text">*</span>
                    </label>
                    <input
                      id="help"
                      name="help"
                      type="text"
                      required
                      placeholder="e.g. Assembly fixture for a range of housing variants"
                      className="w-full bg-nm-s1 border border-nm-border rounded-sm2 px-4 py-3 text-body-md text-nm-text-p placeholder:text-nm-text-t focus:outline-none focus:border-nm-green-accent transition-colors duration-200"
                    />
                  </div>

                  {/* Project description */}
                  <div>
                    <label
                      htmlFor="description"
                      className="block font-mono text-label-sm text-nm-text-s uppercase tracking-[0.12em] mb-2"
                    >
                      Project Description <span className="text-nm-green-text">*</span>
                    </label>
                    <textarea
                      id="description"
                      name="description"
                      required
                      rows={5}
                      placeholder="Describe the project, the parts or systems involved, the application environment, and any constraints you are aware of."
                      className="w-full bg-nm-s1 border border-nm-border rounded-sm2 px-4 py-3 text-body-md text-nm-text-p placeholder:text-nm-text-t focus:outline-none focus:border-nm-green-accent transition-colors duration-200 resize-y min-h-[120px]"
                    />
                  </div>

                  {/* Challenge / goal */}
                  <div>
                    <label
                      htmlFor="challenge"
                      className="block font-mono text-label-sm text-nm-text-s uppercase tracking-[0.12em] mb-2"
                    >
                      Current Challenge or Goal
                    </label>
                    <textarea
                      id="challenge"
                      name="challenge"
                      rows={3}
                      placeholder="What is going wrong currently, or what does success look like once this is solved?"
                      className="w-full bg-nm-s1 border border-nm-border rounded-sm2 px-4 py-3 text-body-md text-nm-text-p placeholder:text-nm-text-t focus:outline-none focus:border-nm-green-accent transition-colors duration-200 resize-y min-h-[90px]"
                    />
                  </div>
                </fieldset>

                <div className="h-px bg-nm-border" aria-hidden="true" />

                {/* Timeline + budget */}
                <fieldset className="space-y-5">
                  <legend className="font-mono text-label-sm text-nm-text-t uppercase tracking-[0.14em] mb-5 block">
                    Timeline & Budget
                  </legend>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label
                        htmlFor="timeline"
                        className="block font-mono text-label-sm text-nm-text-s uppercase tracking-[0.12em] mb-2"
                      >
                        Timeline
                      </label>
                      <input
                        id="timeline"
                        name="timeline"
                        type="text"
                        placeholder="e.g. Required within 8 weeks"
                        className="w-full bg-nm-s1 border border-nm-border rounded-sm2 px-4 py-3 text-body-md text-nm-text-p placeholder:text-nm-text-t focus:outline-none focus:border-nm-green-accent transition-colors duration-200"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="budget"
                        className="block font-mono text-label-sm text-nm-text-s uppercase tracking-[0.12em] mb-2"
                      >
                        Budget Range
                      </label>
                      <select
                        id="budget"
                        name="budget"
                        defaultValue=""
                        className="w-full bg-nm-s1 border border-nm-border rounded-sm2 px-4 py-3 text-body-md text-nm-text-p focus:outline-none focus:border-nm-green-accent transition-colors duration-200 appearance-none cursor-pointer"
                      >
                        <option value="" disabled className="text-nm-text-t">
                          Select a range
                        </option>
                        {budgetRanges.map((r) => (
                          <option key={r} value={r} className="bg-nm-s2 text-nm-text-p">
                            {r}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </fieldset>

                <div className="h-px bg-nm-border" aria-hidden="true" />

                {/* File upload */}
                <div>
                  <p className="block font-mono text-label-sm text-nm-text-s uppercase tracking-[0.12em] mb-2">
                    Drawings or Reference Files
                  </p>
                  <div className="border border-dashed border-nm-border-mid rounded-sm2 p-8 text-center hover:border-nm-green-mid transition-colors duration-200 cursor-pointer group">
                    <svg
                      width="32"
                      height="32"
                      viewBox="0 0 32 32"
                      fill="none"
                      className="mx-auto mb-3 text-nm-text-t group-hover:text-nm-green-dim transition-colors duration-200"
                      aria-hidden="true"
                    >
                      <path d="M16 22V10M16 10L11 15M16 10L21 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      <rect x="5" y="24" width="22" height="3" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
                    </svg>
                    <p className="text-body-sm text-nm-text-s mb-1">
                      Drop drawings, specifications, or reference files here
                    </p>
                    <p className="font-mono text-label-sm text-nm-text-t uppercase tracking-[0.1em]">
                      PDF, DXF, DWG, STEP, or images · Max 20 MB
                    </p>
                    <input
                      type="file"
                      name="files"
                      multiple
                      accept=".pdf,.dxf,.dwg,.step,.stp,.jpg,.jpeg,.png"
                      className="absolute inset-0 opacity-0 cursor-pointer"
                      aria-label="Upload project files"
                    />
                  </div>
                  <p className="mt-2 font-mono text-label-sm text-nm-text-t tracking-[0.1em]">
                    Files are treated as confidential by default. NDAs available on request.
                  </p>
                </div>

                {/* How did you hear */}
                <div>
                  <label
                    htmlFor="referral"
                    className="block font-mono text-label-sm text-nm-text-s uppercase tracking-[0.12em] mb-2"
                  >
                    How Did You Hear About Us?
                  </label>
                  <input
                    id="referral"
                    name="referral"
                    type="text"
                    placeholder="Referral, search, LinkedIn, trade event…"
                    className="w-full bg-nm-s1 border border-nm-border rounded-sm2 px-4 py-3 text-body-md text-nm-text-p placeholder:text-nm-text-t focus:outline-none focus:border-nm-green-accent transition-colors duration-200"
                  />
                </div>

                {/* Submit */}
                <div className="pt-4">
                  <Button type="submit" variant="primary" size="lg" withArrow className="w-full sm:w-auto justify-center">
                    Send Project Brief
                  </Button>
                  <p className="mt-4 text-body-sm text-nm-text-t">
                    We respond to all serious enquiries within one business day.
                  </p>
                </div>
              </form>
            </div>

            {/* Sidebar info */}
            <aside className="lg:col-span-4 lg:col-start-9 space-y-8" aria-label="Contact information">
              {/* Direct contact */}
              <div className="p-7 bg-nm-s1 border border-nm-border rounded-sm2">
                <p className="font-mono text-label-sm text-nm-text-t uppercase tracking-[0.14em] mb-5">
                  Direct Enquiries
                </p>
                <div className="space-y-4">
                  <div>
                    <p className="font-mono text-label-sm text-nm-text-t uppercase tracking-[0.1em] mb-1">
                      Email
                    </p>
                    <a
                      href="mailto:projects@northernmodulus.com"
                      className="text-body-md text-nm-text-p hover:text-nm-green-text transition-colors duration-200"
                    >
                      projects@northernmodulus.com
                    </a>
                  </div>
                  <div>
                    <p className="font-mono text-label-sm text-nm-text-t uppercase tracking-[0.1em] mb-1">
                      Response Time
                    </p>
                    <p className="text-body-sm text-nm-text-s">Within one business day</p>
                  </div>
                </div>
              </div>

              {/* What to include */}
              <div className="p-7 bg-nm-green-deep border border-nm-green-mid rounded-sm2">
                <p className="font-mono text-label-sm text-nm-green-text uppercase tracking-[0.14em] mb-5">
                  What to Include
                </p>
                <ul className="space-y-3">
                  {[
                    'What the part or system does',
                    'Current problem or limitation',
                    'Dimensional constraints if known',
                    'Volume or quantity requirements',
                    'Any drawings, photos, or specs',
                    'Timescale requirements',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span
                        className="mt-2 w-1 h-1 rounded-full bg-nm-green-accent flex-shrink-0"
                        aria-hidden="true"
                      />
                      <span className="text-body-sm text-nm-text-s">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA links */}
              <div className="space-y-3">
                {[
                  { label: 'Send Drawings for Review', href: '#' },
                  { label: 'Request a Tooling Review', href: '#' },
                  { label: 'Discuss an Automation Opportunity', href: '#' },
                  { label: 'Review a Transport Requirement', href: '#' },
                ].map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className="flex items-center justify-between gap-3 p-4 bg-nm-s1 border border-nm-border rounded-sm2 hover:border-nm-border-mid hover:bg-nm-s2 transition-colors duration-200 group"
                  >
                    <span className="text-body-sm text-nm-text-s group-hover:text-nm-text-p transition-colors duration-200">
                      {link.label}
                    </span>
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 12 12"
                      fill="none"
                      aria-hidden="true"
                      className="text-nm-text-t group-hover:text-nm-green-text transition-colors duration-200 flex-shrink-0"
                    >
                      <path d="M2 6H10M6.5 2.5L10 6L6.5 9.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </a>
                ))}
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  )
}
