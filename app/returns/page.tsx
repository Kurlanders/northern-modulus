import Link from 'next/link'
import LegalPage from '@/components/templates/LegalPage'
import { company } from '@/lib/company'
import { pageMetadata } from '@/lib/metadata'

export const metadata = pageMetadata(
  'Returns & Withdrawal',
  'How to return a standard Northern Modulus shop product within the 14-day EU right of withdrawal, and which items are excluded.'
)

export default function ReturnsPage() {
  return (
    <LegalPage eyebrow="Returns" title="Returns & right of withdrawal">
      <h2>Standard shop products: 14-day right of withdrawal</h2>
      <p>
        If you are a consumer in the EU, you can withdraw from your purchase of a standard shop
        product within <strong>14 days</strong> of the day you (or someone you name) receive it,
        without giving a reason.
      </p>

      <h2>How to withdraw</h2>
      <ul>
        <li>
          Email <a href={`mailto:${company.email}`}>{company.email}</a> within the 14 days with a
          clear statement that you are withdrawing, your name, the order and the product.
        </li>
        <li>Send the product back within 14 days of telling us, unused and in its original condition.</li>
        <li>You pay the cost of return shipping.</li>
      </ul>

      <h2>Refunds</h2>
      <p>
        We refund the price you paid within <strong>14 days of receiving the returned product</strong>,
        using the same payment method you used, unless we agree otherwise. The refund includes the
        standard delivery cost you paid for the original shipment.
      </p>

      <h2>What is excluded</h2>
      <p>
        The right of withdrawal does not apply to items made to your specification. That includes
        all custom prints: parts printed from your files, drawings or requirements, and anything
        quoted through the{' '}
        <Link href="/contact">enquiry form</Link>.
      </p>

      <h2>Faulty or incorrect items</h2>
      <p>
        If a product arrives damaged, faulty or not as described, email{' '}
        <a href={`mailto:${company.email}`}>{company.email}</a> with photos. This is separate from
        the right of withdrawal, and your statutory rights for faulty goods are not affected.
      </p>

      <h2>Seller</h2>
      <p>
        {company.name}, registration number {company.registrationNumber}, {company.address}.
      </p>
    </LegalPage>
  )
}
