'use client'

import { useState } from 'react'
import Button from '@/components/ui/Button'

const budgetRanges = [
  'Under £5,000',
  '£5,000 – £15,000',
  '£15,000 – £50,000',
  '£50,000 – £150,000',
  'Over £150,000',
  'Not yet defined',
]

const serviceAreas = [
  'Custom 3D Printing',
  'Tooling, Fixtures & Production Support',
  'Engineered Transport, Packaging & Handling',
  'Product Development & Prototyping',
  'Targeted Automation & Control Integration',
  'Not sure — need to discuss',
]

type Status = 'idle' | 'loading' | 'success' | 'error'

export default function ContactForm() {
  const [status, setStatus] = useState<Status>('idle')
  const [errorMessage, setErrorMessage] = useState('')
  const [serviceArea, setServiceArea] = useState('')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('loading')
    setErrorMessage('')

    const form = e.currentTarget
    const data = new FormData(form)

    const payload = {
      name:        data.get('name') as string,
      company:     data.get('company') as string,
      email:       data.get('email') as string,
      phone:       data.get('phone') as string,
      serviceArea: serviceArea,
      help:        data.get('help') as string,
      description: data.get('description') as string,
      challenge:   data.get('challenge') as string,
      timeline:    data.get('timeline') as string,
      budget:      data.get('budget') as string,
      referral:    data.get('referral') as string,
    }

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      const json = await res.json()

      if (!res.ok) {
        setErrorMessage(json.error || 'Something went wrong. Please try again.')
        setStatus('error')
        return
      }

      setStatus('success')
      form.reset()
      setServiceArea('')
    } catch {
      setErrorMessage('Could not reach the server. Please try again or email us directly.')
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="py-16 flex flex-col items-start gap-5">
        {/* Success icon */}
        <div className="w-12 h-12 rounded-full bg-nm-green-deep border border-nm-green-mid flex items-center justify-center flex-shrink-0">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <path d="M4 10L8 14L16 6" stroke="#4D8F6A" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <div>
          <h2 className="text-h1 text-nm-text-p font-medium tracking-tight mb-3">
            Message sent.
          </h2>
          <p className="text-body-md text-nm-text-s leading-relaxed max-w-[46ch]">
            We have received your enquiry and will respond within one business day.
            Check your inbox — including spam — for our reply.
          </p>
        </div>
        <button
          onClick={() => setStatus('idle')}
          className="font-mono text-label-md uppercase tracking-[0.12em] text-nm-text-t hover:text-nm-text-s transition-colors duration-200 mt-2"
        >
          Send another enquiry
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6" aria-label="Project enquiry form">

      {/* Contact details */}
      <fieldset className="space-y-5">
        <legend className="font-mono text-label-sm text-nm-text-t uppercase tracking-[0.14em] mb-5 block">
          Contact Details
        </legend>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label htmlFor="name" className="block font-mono text-label-sm text-nm-text-s uppercase tracking-[0.12em] mb-2">
              Full Name <span className="text-nm-green-text">*</span>
            </label>
            <input
              id="name" name="name" type="text" required autoComplete="name"
              placeholder="Your name"
              className="w-full bg-nm-s1 border border-nm-border rounded-sm2 px-4 py-3 text-body-md text-nm-text-p placeholder:text-nm-text-t focus:outline-none focus:border-nm-green-accent transition-colors duration-200"
            />
          </div>
          <div>
            <label htmlFor="company" className="block font-mono text-label-sm text-nm-text-s uppercase tracking-[0.12em] mb-2">
              Company <span className="text-nm-green-text">*</span>
            </label>
            <input
              id="company" name="company" type="text" required autoComplete="organization"
              placeholder="Company name"
              className="w-full bg-nm-s1 border border-nm-border rounded-sm2 px-4 py-3 text-body-md text-nm-text-p placeholder:text-nm-text-t focus:outline-none focus:border-nm-green-accent transition-colors duration-200"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label htmlFor="email" className="block font-mono text-label-sm text-nm-text-s uppercase tracking-[0.12em] mb-2">
              Email <span className="text-nm-green-text">*</span>
            </label>
            <input
              id="email" name="email" type="email" required autoComplete="email"
              placeholder="your@company.com"
              className="w-full bg-nm-s1 border border-nm-border rounded-sm2 px-4 py-3 text-body-md text-nm-text-p placeholder:text-nm-text-t focus:outline-none focus:border-nm-green-accent transition-colors duration-200"
            />
          </div>
          <div>
            <label htmlFor="phone" className="block font-mono text-label-sm text-nm-text-s uppercase tracking-[0.12em] mb-2">
              Phone
            </label>
            <input
              id="phone" name="phone" type="tel" autoComplete="tel"
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

        {/* Service area */}
        <div>
          <p className="block font-mono text-label-sm text-nm-text-s uppercase tracking-[0.12em] mb-3">
            What are you enquiring about?
          </p>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Service area">
            {serviceAreas.map((area) => (
              <button
                key={area}
                type="button"
                onClick={() => setServiceArea(area === serviceArea ? '' : area)}
                className={`px-3.5 py-2 rounded-sm2 text-body-sm border transition-colors duration-200 ${
                  serviceArea === area
                    ? 'border-nm-green-accent bg-nm-green-deep text-nm-text-p'
                    : 'border-nm-border bg-nm-s1 text-nm-text-s hover:border-nm-border-mid hover:bg-nm-s2'
                }`}
              >
                {area}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label htmlFor="help" className="block font-mono text-label-sm text-nm-text-s uppercase tracking-[0.12em] mb-2">
            What do you need? <span className="text-nm-green-text">*</span>
          </label>
          <input
            id="help" name="help" type="text" required
            placeholder="e.g. 50 prototype brackets in PETG, functional test parts"
            className="w-full bg-nm-s1 border border-nm-border rounded-sm2 px-4 py-3 text-body-md text-nm-text-p placeholder:text-nm-text-t focus:outline-none focus:border-nm-green-accent transition-colors duration-200"
          />
        </div>

        <div>
          <label htmlFor="description" className="block font-mono text-label-sm text-nm-text-s uppercase tracking-[0.12em] mb-2">
            Project Description <span className="text-nm-green-text">*</span>
          </label>
          <textarea
            id="description" name="description" required rows={5}
            placeholder="Describe the part, application, material preferences, quantity, and any dimensional or finish requirements."
            className="w-full bg-nm-s1 border border-nm-border rounded-sm2 px-4 py-3 text-body-md text-nm-text-p placeholder:text-nm-text-t focus:outline-none focus:border-nm-green-accent transition-colors duration-200 resize-y min-h-[120px]"
          />
        </div>

        <div>
          <label htmlFor="challenge" className="block font-mono text-label-sm text-nm-text-s uppercase tracking-[0.12em] mb-2">
            Current Challenge or Goal
          </label>
          <textarea
            id="challenge" name="challenge" rows={3}
            placeholder="What problem are you solving, or what does success look like?"
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
            <label htmlFor="timeline" className="block font-mono text-label-sm text-nm-text-s uppercase tracking-[0.12em] mb-2">
              Timeline
            </label>
            <input
              id="timeline" name="timeline" type="text"
              placeholder="e.g. Required within 3 weeks"
              className="w-full bg-nm-s1 border border-nm-border rounded-sm2 px-4 py-3 text-body-md text-nm-text-p placeholder:text-nm-text-t focus:outline-none focus:border-nm-green-accent transition-colors duration-200"
            />
          </div>
          <div>
            <label htmlFor="budget" className="block font-mono text-label-sm text-nm-text-s uppercase tracking-[0.12em] mb-2">
              Budget Range
            </label>
            <select
              id="budget" name="budget"
              className="w-full bg-nm-s1 border border-nm-border rounded-sm2 px-4 py-3 text-body-md text-nm-text-p focus:outline-none focus:border-nm-green-accent transition-colors duration-200 appearance-none cursor-pointer"
            >
              <option value="">Select a range</option>
              {budgetRanges.map((r) => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>
          </div>
        </div>
      </fieldset>

      <div className="h-px bg-nm-border" aria-hidden="true" />

      {/* File upload note */}
      <div>
        <p className="block font-mono text-label-sm text-nm-text-s uppercase tracking-[0.12em] mb-2">
          Drawings or Reference Files
        </p>
        <div className="p-5 bg-nm-s1 border border-nm-border-mid rounded-sm2">
          <p className="text-body-sm text-nm-text-s leading-relaxed">
            Send files directly to{' '}
            <a href="mailto:northernmodulus@gmail.com" className="text-nm-green-text hover:text-nm-green-bright transition-colors duration-200">
              northernmodulus@gmail.com
            </a>
            {' '}— STEP, STL, PDF, DXF, DWG, or images. Files are treated as confidential by default.
          </p>
        </div>
      </div>

      {/* Referral */}
      <div>
        <label htmlFor="referral" className="block font-mono text-label-sm text-nm-text-s uppercase tracking-[0.12em] mb-2">
          How Did You Hear About Us?
        </label>
        <input
          id="referral" name="referral" type="text"
          placeholder="Referral, search, Instagram, trade event…"
          className="w-full bg-nm-s1 border border-nm-border rounded-sm2 px-4 py-3 text-body-md text-nm-text-p placeholder:text-nm-text-t focus:outline-none focus:border-nm-green-accent transition-colors duration-200"
        />
      </div>

      {/* Error message */}
      {status === 'error' && (
        <div className="p-4 bg-red-950/40 border border-red-900/60 rounded-sm2">
          <p className="text-body-sm text-red-400">{errorMessage}</p>
        </div>
      )}

      {/* Submit */}
      <div className="pt-4">
        <Button
          type="submit"
          variant="primary"
          size="lg"
          withArrow
          disabled={status === 'loading'}
          className="w-full sm:w-auto justify-center"
        >
          {status === 'loading' ? 'Sending…' : 'Send Enquiry'}
        </Button>
        <p className="mt-4 text-body-sm text-nm-text-t">
          We respond to all enquiries within one business day.
        </p>
      </div>
    </form>
  )
}
