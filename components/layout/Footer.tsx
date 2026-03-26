import Link from 'next/link'

const footerSolutions = [
  { label: 'Product Development & Prototyping', href: '/solutions/product-development' },
  { label: 'Tooling, Fixtures & Production Support', href: '/solutions/tooling-fixtures' },
  { label: 'Engineered Transport & Handling', href: '/solutions/transport-handling' },
  { label: 'Targeted Automation & Control', href: '/solutions/automation-control' },
]

const footerNav = [
  { label: 'All Solutions', href: '/solutions' },
  { label: 'Projects', href: '/projects' },
  { label: 'Our Process', href: '/process' },
  { label: 'About', href: '/about' },
  { label: 'Start a Project', href: '/contact' },
]

export default function Footer() {
  return (
    <footer className="bg-nm-s1 border-t border-nm-border">
      <div className="site-container">
        {/* Main footer grid */}
        <div className="py-16 md:py-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">
          {/* Brand column */}
          <div className="lg:col-span-4">
            <Link href="/" className="flex items-center gap-2.5 mb-5 group w-fit">
              <svg
                width="26"
                height="26"
                viewBox="0 0 28 28"
                fill="none"
                aria-hidden="true"
              >
                <rect x="1" y="1" width="12" height="12" stroke="#2E6642" strokeWidth="1.5" />
                <rect x="7" y="7" width="20" height="20" stroke="#5FA575" strokeWidth="1.5" fill="none" />
                <rect x="8" y="8" width="6" height="6" fill="#2E6642" />
              </svg>
              <span className="font-sans font-medium text-nm-text-p tracking-tight text-[0.9375rem]">
                Northern<span className="text-nm-green-text">Modulus</span>
              </span>
            </Link>
            <p className="text-body-md text-nm-text-s leading-relaxed max-w-xs">
              Custom industrial engineering solutions for manufacturers — from prototype to production-ready hardware.
            </p>
            <div className="mt-6">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 text-label-md font-mono uppercase tracking-[0.12em] text-nm-green-text hover:text-nm-green-bright transition-colors duration-200"
              >
                Start a Project
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                  <path d="M2 6H10M6.5 2.5L10 6L6.5 9.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            </div>
          </div>

          {/* Solutions column */}
          <div className="lg:col-span-4">
            <p className="font-mono text-label-sm uppercase tracking-[0.14em] text-nm-text-t mb-5">
              Solutions
            </p>
            <ul className="space-y-3">
              {footerSolutions.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-body-sm text-nm-text-s hover:text-nm-text-p transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Navigation column */}
          <div className="lg:col-span-2">
            <p className="font-mono text-label-sm uppercase tracking-[0.14em] text-nm-text-t mb-5">
              Company
            </p>
            <ul className="space-y-3">
              {footerNav.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-body-sm text-nm-text-s hover:text-nm-text-p transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact column */}
          <div className="lg:col-span-2">
            <p className="font-mono text-label-sm uppercase tracking-[0.14em] text-nm-text-t mb-5">
              Contact
            </p>
            <div className="space-y-3">
              <div>
                <p className="text-label-sm font-mono uppercase tracking-[0.1em] text-nm-text-t mb-1">
                  Enquiries
                </p>
                <a
                  href="mailto:projects@northernmodulus.com"
                  className="text-body-sm text-nm-text-s hover:text-nm-green-text transition-colors duration-200"
                >
                  projects@northernmodulus.com
                </a>
              </div>
              <div>
                <p className="text-label-sm font-mono uppercase tracking-[0.1em] text-nm-text-t mb-1">
                  Response time
                </p>
                <p className="text-body-sm text-nm-text-s">Within one business day</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-nm-border py-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <p className="font-mono text-label-sm text-nm-text-t tracking-[0.1em]">
            © {new Date().getFullYear()} Northern Modulus. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link
              href="/contact"
              className="font-mono text-label-sm text-nm-text-t hover:text-nm-text-s transition-colors duration-200 tracking-[0.1em]"
            >
              Privacy
            </Link>
            <Link
              href="/contact"
              className="font-mono text-label-sm text-nm-text-t hover:text-nm-text-s transition-colors duration-200 tracking-[0.1em]"
            >
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
