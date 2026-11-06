'use client'

import { useState } from 'react'
import { track } from '@vercel/analytics'
import Button from '@/components/ui/Button'
import { readAttribution } from '@/lib/attribution'
import { company } from '@/lib/company'

type Status = 'idle' | 'loading' | 'success' | 'error'

const inputClass =
  'w-full bg-nm-s1 border border-nm-field rounded-lg px-4 py-3 text-[15px] text-nm-text-p placeholder:text-nm-text-t focus:outline-none focus:border-nm-green-accent focus:ring-2 focus:ring-nm-green-accent/25 transition-colors duration-200'
const labelClass = 'block font-mono text-[12px] uppercase tracking-[1.5px] text-nm-text-s mb-2'

interface ReserveFormProps {
  slug: string
  productName: string
  quantity: number
  total: number
  summary: string
  reservationLabel: string
  shipping: string
}

// Same endpoint and contract as the quote form: the configuration travels as structured text in the description.
export default function ReserveForm({ slug, productName, quantity, total, summary, reservationLabel, shipping }: ReserveFormProps) {
  const [status, setStatus] = useState<Status>('idle')
  const [errorMessage, setErrorMessage] = useState('')
  const [receiveBy, setReceiveBy] = useState<'Pickup in Riga' | 'Delivery in Latvia'>('Pickup in Riga')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('loading')
    setErrorMessage('')

    const data = new FormData(e.currentTarget)
    const city = ((data.get('city') as string) || '').trim()
    const notes = ((data.get('notes') as string) || '').trim()
    const attribution = readAttribution()
    const delivery = receiveBy === 'Pickup in Riga' ? receiveBy : `${receiveBy}${city ? `: ${city}` : ''}`

    const description = [summary, `Pickup or delivery: ${delivery}`, notes ? `Notes: ${notes}` : '']
      .filter(Boolean)
      .join('\n')

    const payload = {
      name: data.get('name') as string,
      email: data.get('email') as string,
      phone: data.get('phone') as string,
      serviceArea: 'Shop product',
      help: `${reservationLabel}: ${productName}`,
      description,
      quantity: String(quantity),
      timeline: shipping,
      product: slug,
      filePaths: [],
      utmSource: attribution.utmSource,
      utmMedium: attribution.utmMedium,
      utmCampaign: attribution.utmCampaign,
      referrer: attribution.referrer,
    }

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const json = await res.json().catch(() => null)
      if (res.status === 400 && json?.error) {
        setErrorMessage(json.error)
        setStatus('error')
        return
      }
      if (!res.ok || json?.success !== true) {
        setStatus('error')
        return
      }
      track('reserve_submit', { product: slug, quantity, total })
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="py-10 flex flex-col items-start gap-5" role="status">
        <div className="w-12 h-12 rounded-full bg-nm-green-deep border border-nm-green-mid flex items-center justify-center">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="text-nm-green-text" aria-hidden="true">
            <path d="M4 10L8 14L16 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <h2 className="text-[26px] font-bold text-nm-text-p tracking-[-0.02em]">Reservation received.</h2>
        <p className="text-[15px] text-nm-text-s leading-[1.75] max-w-[46ch]">
          We&apos;ll confirm availability and your delivery date by email within 2 business days. No payment has been taken.
        </p>
        <Button href="/shop" variant="secondary" size="md">
          Back to the shop
        </Button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5" aria-label="Reservation form">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="name" className={labelClass}>
            Full name <span className="text-nm-green-text">*</span>
          </label>
          <input id="name" name="name" type="text" required autoComplete="name" placeholder="Your name" className={inputClass} />
        </div>
        <div>
          <label htmlFor="email" className={labelClass}>
            Email <span className="text-nm-green-text">*</span>
          </label>
          <input id="email" name="email" type="email" required autoComplete="email" placeholder="you@example.com" className={inputClass} />
        </div>
      </div>

      <div>
        <label htmlFor="phone" className={labelClass}>
          Phone <span className="text-nm-text-t normal-case tracking-normal">(optional)</span>
        </label>
        <input id="phone" name="phone" type="tel" autoComplete="tel" placeholder="+371 2X XXX XXX" className={inputClass} />
      </div>

      <fieldset>
        <legend className={labelClass}>Pickup or delivery</legend>
        <div className="flex flex-wrap gap-2">
          {(['Pickup in Riga', 'Delivery in Latvia'] as const).map((option) => (
            <label
              key={option}
              className={`inline-flex items-center min-h-11 px-4 py-2 rounded-full border text-[15px] cursor-pointer transition-colors duration-200 has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-nm-green-text ${
                receiveBy === option
                  ? 'border-nm-green-text bg-nm-green-deep text-nm-text-p'
                  : 'border-nm-border-light text-nm-text-s hover:border-nm-field hover:bg-nm-s2'
              }`}
            >
              <input
                type="radio"
                name="receiveBy"
                value={option}
                checked={receiveBy === option}
                onChange={() => setReceiveBy(option)}
                className="sr-only"
              />
              {option}
            </label>
          ))}
        </div>
      </fieldset>

      {receiveBy === 'Delivery in Latvia' && (
        <div>
          <label htmlFor="city" className={labelClass}>
            City <span className="text-nm-green-text">*</span>
          </label>
          <input id="city" name="city" type="text" required autoComplete="address-level2" placeholder="e.g. Jelgava" className={inputClass} />
        </div>
      )}

      <div>
        <label htmlFor="notes" className={labelClass}>
          Notes <span className="text-nm-text-t normal-case tracking-normal">(optional)</span>
        </label>
        <textarea id="notes" name="notes" rows={3} placeholder="Anything we should know" className={`${inputClass} resize-y min-h-[90px]`} />
      </div>

      {status === 'error' && (
        <div className="p-4 bg-nm-error-bg border border-nm-error-border">
          <p className="text-[15px] text-nm-error">
            {errorMessage || (
              <>
                Something went wrong. Please email{' '}
                <a href={`mailto:${company.email}`} className="underline hover:no-underline">
                  {company.email}
                </a>{' '}
                directly.
              </>
            )}
          </p>
        </div>
      )}

      <div className="pt-2">
        <Button type="submit" size="lg" withArrow disabled={status === 'loading'} className="w-full sm:w-auto">
          {status === 'loading' ? 'Sending…' : 'Send reservation'}
        </Button>
        <p className="mt-4 text-[13px] leading-[1.6] text-nm-text-s">
          No payment now. We confirm availability and your delivery date by email within 2 business days.
        </p>
      </div>
    </form>
  )
}
