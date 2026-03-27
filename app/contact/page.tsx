import type { Metadata } from 'next'
import SectionLabel from '@/components/ui/SectionLabel'
import ContactForm from '@/components/sections/ContactForm'

export const metadata: Metadata = {
  title: 'Get a Quote — Project Enquiries',
  description:
    'Send a project brief or describe your 3D printing requirement. Northern Modulus responds within one business day.',
}

export default function ContactPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 md:pt-40 pb-14 md:pb-20 overflow-hidden">
        <div className="absolute inset-0 line-grid opacity-30" aria-hidden="true" />
        <div className="site-container relative">
          <SectionLabel className="mb-6">Get a Quote</SectionLabel>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end">
            <div className="lg:col-span-8">
              <h1 className="text-disp-xl text-nm-text-p font-light tracking-tight mb-6">
                Tell us what<br />
                you need printed.
              </h1>
              <p className="text-body-lg text-nm-text-s leading-relaxed max-w-[52ch]">
                Fill in the form below and we will come back with a clear quote — material,
                lead time, and price. Most quotes within 24 hours.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Form + sidebar */}
      <section className="pb-20 md:pb-32">
        <div className="site-container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">

            {/* Form */}
            <div className="lg:col-span-7">
              <ContactForm />
            </div>

            {/* Sidebar */}
            <aside className="lg:col-span-4 lg:col-start-9 space-y-6" aria-label="Contact information">

              {/* Direct contact */}
              <div className="p-7 bg-nm-s1 border border-nm-border rounded-sm2">
                <p className="font-mono text-label-sm text-nm-text-t uppercase tracking-[0.14em] mb-5">
                  Direct Contact
                </p>
                <div className="space-y-4">
                  <div>
                    <p className="text-label-sm font-mono uppercase tracking-[0.1em] text-nm-text-t mb-1">Email</p>
                    <a
                      href="mailto:northernmodulus@gmail.com"
                      className="text-body-md text-nm-text-p hover:text-nm-green-text transition-colors duration-200 break-all"
                    >
                      northernmodulus@gmail.com
                    </a>
                  </div>
                  <div>
                    <p className="text-label-sm font-mono uppercase tracking-[0.1em] text-nm-text-t mb-1">Instagram</p>
                    <a
                      href="https://instagram.com/northernmodulus"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-body-md text-nm-text-p hover:text-nm-green-text transition-colors duration-200"
                    >
                      @northernmodulus
                    </a>
                  </div>
                  <div>
                    <p className="text-label-sm font-mono uppercase tracking-[0.1em] text-nm-text-t mb-1">Response Time</p>
                    <p className="text-body-sm text-nm-text-s">Within one business day</p>
                  </div>
                </div>
              </div>

              {/* What to include */}
              <div className="p-7 bg-nm-green-deep border border-nm-green-mid rounded-sm2">
                <p className="font-mono text-label-sm text-nm-green-text uppercase tracking-[0.14em] mb-5">
                  Useful to include
                </p>
                <ul className="space-y-3">
                  {[
                    'A CAD file, sketch, or reference image',
                    'Material preference or use case',
                    'Quantity required',
                    'Any dimensional or tolerance requirements',
                    'Finish requirements',
                    'Timeline',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="mt-2 w-1 h-1 rounded-full bg-nm-green-accent flex-shrink-0" aria-hidden="true" />
                      <span className="text-body-sm text-nm-text-s">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* No file note */}
              <div className="p-5 bg-nm-s1 border border-nm-border rounded-sm2">
                <p className="text-body-sm text-nm-text-s leading-relaxed">
                  <span className="text-nm-text-p font-medium">No file yet?</span> That is fine.
                  Describe what you need and we will advise on geometry and material
                  before you commit to anything.
                </p>
              </div>

            </aside>
          </div>
        </div>
      </section>
    </>
  )
}
