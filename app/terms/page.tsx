import Link from 'next/link'
import LegalPage from '@/components/templates/LegalPage'
import { company } from '@/lib/company'
import { pageMetadata } from '@/lib/metadata'

export const metadata = pageMetadata(
  'Terms & Conditions',
  'Terms for Northern Modulus shop orders and custom 3D printing: quotes, prices, custom work, liability and governing law.'
)

export default function TermsPage() {
  return (
    <LegalPage eyebrow="Terms" title="Terms & conditions">
      <h2>Who we are</h2>
      <p>
        These terms apply to orders from {company.name}, registration number{' '}
        {company.registrationNumber}, {company.address}. Contact:{' '}
        <a href={`mailto:${company.email}`}>{company.email}</a>.
      </p>

      <h2>Prices</h2>
      <p>
        Prices are in euro and are final. We are not VAT-registered, so prices include all
        applicable taxes. Shipping is quoted separately.
      </p>

      <h2>Quotes</h2>
      <p>
        A quote is valid for <strong>14 days</strong> from the date it is sent, unless the quote
        says otherwise.
      </p>

      <h2>Custom work</h2>
      <p>
        Custom printing starts only after you accept the quote. Custom parts are made to your
        files and requirements, so you are responsible for the suitability of the design for its
        use and for having the right to use any files you send. Lead times are estimates and are
        confirmed in the quote.
      </p>

      <h2>Shop products</h2>
      <p>
        Standard shop products can be returned under the 14-day right of withdrawal. See the{' '}
        <Link href="/returns">returns policy</Link>. Custom prints are excluded from withdrawal.
      </p>

      <h2>Liability</h2>
      <p>
        Our liability for any order is limited to the value of that order. This does not limit
        any liability that cannot be limited by law, or any rights you have under mandatory
        consumer law.
      </p>

      <h2>Governing law</h2>
      <p>These terms are governed by the laws of the Republic of Latvia.</p>
    </LegalPage>
  )
}
