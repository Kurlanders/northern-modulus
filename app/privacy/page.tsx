import LegalPage from '@/components/templates/LegalPage'
import { company } from '@/lib/company'
import { pageMetadata } from '@/lib/metadata'

export const metadata = pageMetadata(
  'Privacy Policy',
  'What the Northern Modulus contact form collects, how enquiries are sent and stored, and how to request deletion of your data.'
)

export default function PrivacyPage() {
  return (
    <LegalPage eyebrow="Privacy" title="Privacy policy">
      <h2>Who is responsible</h2>
      <p>
        {company.name}, registration number {company.registrationNumber}, {company.address}.
        Contact: <a href={`mailto:${company.email}`}>{company.email}</a>.
      </p>

      <h2>What the contact form collects</h2>
      <p>When you send an enquiry, the form collects:</p>
      <ul>
        <li>your name, company and email address (required)</li>
        <li>your phone number (optional)</li>
        <li>the details you write about your project: enquiry type, what you need, description, goal, quantity, material and timeline</li>
        <li>files you upload, and a file-sharing link if you add one</li>
        <li>how you heard about us, if you say</li>
        <li>the shop product you are asking about, if you came from a product page</li>
        <li>
          how you arrived at the site: the campaign tags in the link you first opened (utm_source,
          utm_medium, utm_campaign) and the referring page, if any
        </li>
      </ul>
      <p>
        We use this only to reply to your enquiry, prepare a quote and handle any resulting order.
      </p>

      <h2>How your enquiry is sent and stored</h2>
      <p>
        The website does not store form submissions in a database. Each enquiry is sent as an email
        through <strong>Resend</strong>, an email delivery service, to our company inbox ({company.email}). Files you
        upload are stored privately with <strong>Vercel Blob</strong> and are only accessible to
        Northern Modulus. The enquiry email contains signed download links that expire after 30
        days. The website is hosted on <strong>Vercel</strong>, which keeps standard server logs.
        These providers may process data outside the EU under their own safeguards.
      </p>
      <p>
        If you buy through a payment link, the payment is handled by <strong>Stripe</strong> under
        Stripe&apos;s own privacy policy. We do not see your full card details.
      </p>
      <p>
        We keep enquiry emails for as long as needed to deal with your enquiry or order, and longer
        only where accounting law requires it.
      </p>

      <h2>Analytics and cookies</h2>
      <p>
        This website does not set cookies and does not use advertising or social-media tracking
        such as the Meta Pixel.
      </p>
      <p>
        We use <strong>Vercel Web Analytics</strong>, which works without cookies and does not
        identify you. It counts page views and a few actions: sending a quote request, and clicking
        a product&apos;s order or buy button.
      </p>
      <p>
        When you first open the site, your browser&apos;s session storage keeps the campaign tags
        and referring page described above, so they can be included if you send an enquiry. Nothing
        is sent unless you submit the form, and session storage is cleared when you close the tab.
      </p>

      <h2>Your rights and deleting your data</h2>
      <p>
        You can ask to see, correct or delete the personal data we hold about you, or object to how
        it is used. To request deletion, email{' '}
        <a href={`mailto:${company.email}`}>{company.email}</a> from the address you used and say
        which enquiry it concerns. We will delete the email and any files you uploaded, and
        confirm once it is done.
      </p>
      <p>
        If you think your data has been handled incorrectly, you can complain to the Data State
        Inspectorate of Latvia (Datu valsts inspekcija).
      </p>
    </LegalPage>
  )
}
