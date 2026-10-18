import { Resend } from 'resend'
import { NextResponse } from 'next/server'
import { MATERIALS, MAX_FILES, SERVICE_AREAS } from '@/lib/enquiry'
import { FILE_LINK_TTL_DAYS, createSignedFileUrl, fileNameFromPath, isValidUploadPath } from '@/lib/file-links'

const TO_EMAIL = 'northernmodulus@gmail.com'
const FROM_EMAIL = process.env.CONTACT_FROM || 'Northern Modulus <onboarding@resend.dev>'

const MAX_DESCRIPTION = 5000
const MAX_FIELD = 300
const MAX_URL = 1000
const EMAIL_PATTERN = /^[^\s@<>"',;]+@[^\s@<>"',;]+\.[^\s@<>"',;]+$/
const QUANTITY_PATTERN = /^[1-9]\d{0,5}$/

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

// Only accept Blob pathnames in the shape /api/upload issues tokens for; returns null if anything is off.
function cleanFilePaths(value: unknown): string[] | null {
  if (value === undefined || value === null) return []
  if (!Array.isArray(value) || value.length > MAX_FILES) return null
  const paths: string[] = []
  for (const item of value) {
    if (typeof item !== 'string' || !isValidUploadPath(item)) return null
    paths.push(item)
  }
  return paths
}

function siteBaseUrl(request: Request): string {
  const production = process.env.VERCEL_PROJECT_PRODUCTION_URL
  return production ? `https://${production}` : new URL(request.url).origin
}

function fileListHtml(paths: string[], baseUrl: string): string {
  const items = paths.map((path) => {
    const name = escapeHtml(fileNameFromPath(path))
    try {
      return `<li style="margin-bottom: 4px;"><a href="${escapeHtml(createSignedFileUrl(baseUrl, path))}">${name}</a></li>`
    } catch (err) {
      console.error('File link signing failed:', err)
      return `<li style="margin-bottom: 4px;">${name} — no download link (FILE_LINK_SECRET not set). Blob path: ${escapeHtml(path)}</li>`
    }
  })
  return `<ul style="margin: 0; padding-left: 18px;">${items.join('')}</ul>`
}

const LABEL_CELL = 'padding: 8px 0; color: #666; width: 160px; vertical-align: top;'
const VALUE_CELL = 'padding: 8px 0;'
const HEADING = 'font-size: 0.9rem; text-transform: uppercase; letter-spacing: 0.1em; color: #666; margin-top: 28px; margin-bottom: 12px;'
const BLOCK_LABEL = 'margin: 0 0 4px; color: #666; font-size: 0.85rem;'
const BLOCK_VALUE = 'margin: 0 0 16px; background: #f5f5f5; padding: 10px 12px; border-radius: 4px; white-space: pre-wrap;'

// `value` must already be escaped HTML.
function row(label: string, value: string): string {
  return value ? `<tr><td style="${LABEL_CELL}">${label}</td><td style="${VALUE_CELL}">${value}</td></tr>` : ''
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
      quantity:    clean(body?.quantity),
      material:    clean(body?.material),
      timeline:    clean(body?.timeline),
      fileLink:    clean(body?.fileLink, MAX_URL),
      referral:    clean(body?.referral),
      product:     clean(body?.product),
      utmSource:   clean(body?.utmSource),
      utmMedium:   clean(body?.utmMedium),
      utmCampaign: clean(body?.utmCampaign),
      referrer:    clean(body?.referrer, MAX_URL),
    }

    if (!raw.name || !raw.email || !raw.description) {
      return NextResponse.json({ error: 'Missing required fields.' }, { status: 400 })
    }
    if (!EMAIL_PATTERN.test(raw.email)) {
      return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 })
    }
    if (raw.fileLink && !isHttpUrl(raw.fileLink)) {
      return NextResponse.json({ error: 'Please enter a valid file-sharing link.' }, { status: 400 })
    }
    if (raw.quantity && !QUANTITY_PATTERN.test(raw.quantity)) {
      return NextResponse.json({ error: 'Quantity must be a whole number.' }, { status: 400 })
    }
    if (raw.material && !(MATERIALS as readonly string[]).includes(raw.material)) {
      return NextResponse.json({ error: 'Please choose a material from the list.' }, { status: 400 })
    }
    if (raw.serviceArea && !(SERVICE_AREAS as readonly string[]).includes(raw.serviceArea)) {
      return NextResponse.json({ error: 'Please choose an enquiry type from the list.' }, { status: 400 })
    }

    const filePaths = cleanFilePaths(body?.filePaths)
    if (filePaths === null) {
      return NextResponse.json({ error: 'One of the uploaded files is invalid. Please upload it again.' }, { status: 400 })
    }

    const f = Object.fromEntries(
      Object.entries(raw).map(([key, value]) => [key, escapeHtml(value)])
    ) as typeof raw

    const filesHtml = filePaths.length > 0 ? fileListHtml(filePaths, siteBaseUrl(request)) : ''

    const subject = [
      `New ${raw.product ? `product enquiry (${raw.product})` : 'enquiry'} from ${raw.name}`,
      raw.company,
    ].filter(Boolean).join(' — ').replace(/[\r\n]+/g, ' ')

    const resend = new Resend(process.env.RESEND_API_KEY)

    const { error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: TO_EMAIL,
      replyTo: raw.email,
      subject,
      html: `
        <div style="font-family: monospace; max-width: 640px; color: #1a1a1a;">
          <h2 style="font-size: 1.1rem; border-bottom: 1px solid #ddd; padding-bottom: 8px; margin-bottom: 20px;">
            New Project Enquiry — Northern Modulus
          </h2>

          <table style="width: 100%; border-collapse: collapse;">
            ${row('Name', f.name)}
            ${row('Company', f.company)}
            ${row('Email', `<a href="mailto:${f.email}">${f.email}</a>`)}
            ${row('Phone', f.phone)}
            ${row('Product', f.product)}
            ${row('Enquiry type', f.serviceArea)}
          </table>

          <h3 style="${HEADING}">Project Detail</h3>

          ${f.help ? `<p style="${BLOCK_LABEL}">What they need</p><p style="${BLOCK_VALUE}">${f.help}</p>` : ''}
          <p style="${BLOCK_LABEL}">Project description</p>
          <p style="${BLOCK_VALUE}">${f.description}</p>
          ${f.challenge ? `<p style="${BLOCK_LABEL}">Current challenge / goal</p><p style="${BLOCK_VALUE}">${f.challenge}</p>` : ''}

          <table style="width: 100%; border-collapse: collapse; margin-top: 8px;">
            ${row('Quantity', f.quantity)}
            ${row('Material', f.material)}
            ${row('Timeline', f.timeline)}
            ${row('File link', f.fileLink ? `<a href="${f.fileLink}">${f.fileLink}</a>` : '')}
            ${row('Referred by', f.referral)}
          </table>

          ${filesHtml ? `
          <h3 style="${HEADING}">Uploaded Files (${filePaths.length})</h3>
          ${filesHtml}
          <p style="margin: 8px 0 0; color: #666; font-size: 0.85rem;">Download links expire in ${FILE_LINK_TTL_DAYS} days.</p>
          ` : ''}

          <h3 style="${HEADING}">Source</h3>
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="${LABEL_CELL}">utm_source</td><td style="${VALUE_CELL}">${f.utmSource || '—'}</td></tr>
            <tr><td style="${LABEL_CELL}">utm_medium</td><td style="${VALUE_CELL}">${f.utmMedium || '—'}</td></tr>
            <tr><td style="${LABEL_CELL}">utm_campaign</td><td style="${VALUE_CELL}">${f.utmCampaign || '—'}</td></tr>
            <tr><td style="${LABEL_CELL}">Referrer</td><td style="${VALUE_CELL}">${f.referrer || '— (direct)'}</td></tr>
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
