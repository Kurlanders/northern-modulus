import { Resend } from 'resend'
import { NextResponse } from 'next/server'

const TO_EMAIL = 'northernmodulus@gmail.com'
const FROM_EMAIL = process.env.CONTACT_FROM || 'Northern Modulus <onboarding@resend.dev>'

const MAX_DESCRIPTION = 5000
const MAX_FIELD = 300
const EMAIL_PATTERN = /^[^\s@<>"',;]+@[^\s@<>"',;]+\.[^\s@<>"',;]+$/

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

function clean(value: unknown, max: number = MAX_FIELD): string {
  return typeof value === 'string' ? value.trim().slice(0, max) : ''
}

function isHttpUrl(value: string): boolean {
  try {
    const { protocol } = new URL(value)
    return protocol === 'http:' || protocol === 'https:'
  } catch {
    return false
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()

    const raw = {
      name:        clean(body?.name),
      company:     clean(body?.company),
      email:       clean(body?.email),
      phone:       clean(body?.phone),
      serviceArea: clean(body?.serviceArea),
      help:        clean(body?.help),
      description: clean(body?.description, MAX_DESCRIPTION),
      challenge:   clean(body?.challenge),
      timeline:    clean(body?.timeline),
      fileLink:    clean(body?.fileLink),
      referral:    clean(body?.referral),
      product:     clean(body?.product),
    }

    if (!raw.name || !raw.company || !raw.email || !raw.description) {
      return NextResponse.json({ error: 'Missing required fields.' }, { status: 400 })
    }

    if (!EMAIL_PATTERN.test(raw.email)) {
      return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 })
    }

    if (raw.fileLink && !isHttpUrl(raw.fileLink)) {
      return NextResponse.json({ error: 'Please enter a valid file-sharing link.' }, { status: 400 })
    }

    const f = Object.fromEntries(
      Object.entries(raw).map(([key, value]) => [key, escapeHtml(value)])
    ) as typeof raw

    const resend = new Resend(process.env.RESEND_API_KEY)

    const { error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: TO_EMAIL,
      replyTo: raw.email,
      subject: `New ${raw.product ? `product enquiry (${raw.product})` : 'enquiry'} from ${raw.name} — ${raw.company}`.replace(/[\r\n]+/g, ' '),
      html: `
        <div style="font-family: monospace; max-width: 640px; color: #1a1a1a;">
          <h2 style="font-size: 1.1rem; border-bottom: 1px solid #ddd; padding-bottom: 8px; margin-bottom: 20px;">
            New Project Enquiry — Northern Modulus
          </h2>

          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; color: #666; width: 160px; vertical-align: top;">Name</td>
              <td style="padding: 8px 0; font-weight: 500;">${f.name}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #666; vertical-align: top;">Company</td>
              <td style="padding: 8px 0;">${f.company}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #666; vertical-align: top;">Email</td>
              <td style="padding: 8px 0;"><a href="mailto:${f.email}">${f.email}</a></td>
            </tr>
            ${f.phone ? `
            <tr>
              <td style="padding: 8px 0; color: #666; vertical-align: top;">Phone</td>
              <td style="padding: 8px 0;">${f.phone}</td>
            </tr>` : ''}
            ${f.product ? `
            <tr>
              <td style="padding: 8px 0; color: #666; vertical-align: top;">Product</td>
              <td style="padding: 8px 0;">${f.product}</td>
            </tr>` : ''}
            ${f.serviceArea ? `
            <tr>
              <td style="padding: 8px 0; color: #666; vertical-align: top;">Service Area</td>
              <td style="padding: 8px 0;">${f.serviceArea}</td>
            </tr>` : ''}
          </table>

          <h3 style="font-size: 0.9rem; text-transform: uppercase; letter-spacing: 0.1em; color: #666; margin-top: 28px; margin-bottom: 12px;">
            Project Detail
          </h3>

          ${f.help ? `
          <p style="margin: 0 0 4px; color: #666; font-size: 0.85rem;">What they need help with</p>
          <p style="margin: 0 0 16px; background: #f5f5f5; padding: 10px 12px; border-radius: 4px;">${f.help}</p>
          ` : ''}

          <p style="margin: 0 0 4px; color: #666; font-size: 0.85rem;">Project description</p>
          <p style="margin: 0 0 16px; background: #f5f5f5; padding: 10px 12px; border-radius: 4px; white-space: pre-wrap;">${f.description}</p>

          ${f.challenge ? `
          <p style="margin: 0 0 4px; color: #666; font-size: 0.85rem;">Current challenge / goal</p>
          <p style="margin: 0 0 16px; background: #f5f5f5; padding: 10px 12px; border-radius: 4px; white-space: pre-wrap;">${f.challenge}</p>
          ` : ''}

          <table style="width: 100%; border-collapse: collapse; margin-top: 8px;">
            ${f.timeline ? `
            <tr>
              <td style="padding: 8px 0; color: #666; width: 160px; vertical-align: top;">Timeline</td>
              <td style="padding: 8px 0;">${f.timeline}</td>
            </tr>` : ''}
            ${f.fileLink ? `
            <tr>
              <td style="padding: 8px 0; color: #666; vertical-align: top;">File link</td>
              <td style="padding: 8px 0;"><a href="${f.fileLink}">${f.fileLink}</a></td>
            </tr>` : ''}
            ${f.referral ? `
            <tr>
              <td style="padding: 8px 0; color: #666; vertical-align: top;">Referred by</td>
              <td style="padding: 8px 0;">${f.referral}</td>
            </tr>` : ''}
          </table>

          <p style="margin-top: 32px; font-size: 0.8rem; color: #999; border-top: 1px solid #eee; padding-top: 12px;">
            Sent from northernmodulus.com contact form
          </p>
        </div>
      `,
    })

    if (error) {
      console.error('Resend error:', error)
      return NextResponse.json({ error: 'Failed to send message.' }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Contact API error:', err)
    return NextResponse.json({ error: 'Something went wrong.' }, { status: 500 })
  }
}
