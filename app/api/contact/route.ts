import { Resend } from 'resend'
import { NextResponse } from 'next/server'

const resend = new Resend(process.env.RESEND_API_KEY)

const TO_EMAIL = 'northernmodulus@gmail.com'
// Once you verify a domain in Resend, change this to e.g. 'noreply@northernmodulus.com'
const FROM_EMAIL = 'Northern Modulus <onboarding@resend.dev>'

export async function POST(request: Request) {
  try {
    const body = await request.json()

    const {
      name,
      company,
      email,
      phone,
      serviceArea,
      help,
      description,
      challenge,
      timeline,
      budget,
      referral,
    } = body

    // Basic validation
    if (!name || !company || !email || !description) {
      return NextResponse.json(
        { error: 'Missing required fields.' },
        { status: 400 }
      )
    }

    const { error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: TO_EMAIL,
      replyTo: email,
      subject: `New enquiry from ${name} — ${company}`,
      html: `
        <div style="font-family: monospace; max-width: 640px; color: #1a1a1a;">
          <h2 style="font-size: 1.1rem; border-bottom: 1px solid #ddd; padding-bottom: 8px; margin-bottom: 20px;">
            New Project Enquiry — Northern Modulus
          </h2>

          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; color: #666; width: 160px; vertical-align: top;">Name</td>
              <td style="padding: 8px 0; font-weight: 500;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #666; vertical-align: top;">Company</td>
              <td style="padding: 8px 0;">${company}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #666; vertical-align: top;">Email</td>
              <td style="padding: 8px 0;"><a href="mailto:${email}">${email}</a></td>
            </tr>
            ${phone ? `
            <tr>
              <td style="padding: 8px 0; color: #666; vertical-align: top;">Phone</td>
              <td style="padding: 8px 0;">${phone}</td>
            </tr>` : ''}
            ${serviceArea ? `
            <tr>
              <td style="padding: 8px 0; color: #666; vertical-align: top;">Service Area</td>
              <td style="padding: 8px 0;">${serviceArea}</td>
            </tr>` : ''}
          </table>

          <h3 style="font-size: 0.9rem; text-transform: uppercase; letter-spacing: 0.1em; color: #666; margin-top: 28px; margin-bottom: 12px;">
            Project Detail
          </h3>

          ${help ? `
          <p style="margin: 0 0 4px; color: #666; font-size: 0.85rem;">What they need help with</p>
          <p style="margin: 0 0 16px; background: #f5f5f5; padding: 10px 12px; border-radius: 4px;">${help}</p>
          ` : ''}

          <p style="margin: 0 0 4px; color: #666; font-size: 0.85rem;">Project description</p>
          <p style="margin: 0 0 16px; background: #f5f5f5; padding: 10px 12px; border-radius: 4px; white-space: pre-wrap;">${description}</p>

          ${challenge ? `
          <p style="margin: 0 0 4px; color: #666; font-size: 0.85rem;">Current challenge / goal</p>
          <p style="margin: 0 0 16px; background: #f5f5f5; padding: 10px 12px; border-radius: 4px; white-space: pre-wrap;">${challenge}</p>
          ` : ''}

          <table style="width: 100%; border-collapse: collapse; margin-top: 8px;">
            ${timeline ? `
            <tr>
              <td style="padding: 8px 0; color: #666; width: 160px; vertical-align: top;">Timeline</td>
              <td style="padding: 8px 0;">${timeline}</td>
            </tr>` : ''}
            ${budget ? `
            <tr>
              <td style="padding: 8px 0; color: #666; vertical-align: top;">Budget range</td>
              <td style="padding: 8px 0;">${budget}</td>
            </tr>` : ''}
            ${referral ? `
            <tr>
              <td style="padding: 8px 0; color: #666; vertical-align: top;">Referred by</td>
              <td style="padding: 8px 0;">${referral}</td>
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
      return NextResponse.json(
        { error: 'Failed to send message. Please try again.' },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Contact API error:', err)
    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 }
    )
  }
}
