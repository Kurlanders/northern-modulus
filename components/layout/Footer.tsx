import Link from 'next/link'

const footerPrinting = [
  { label: '3D Printing Overview', href: '/3d-printing' },
  { label: 'Prototypes', href: '/3d-printing#prototypes' },
  { label: 'Functional Parts', href: '/3d-printing#functional' },
  { label: 'Small-Batch Production', href: '/3d-printing#batch' },
  { label: 'Materials & Capabilities', href: '/3d-printing#capabilities' },
]

const footerEngineering = [
  { label: 'Tooling & Fixtures', href: '/solutions/tooling-fixtures' },
  { label: 'Transport & Handling', href: '/solutions/transport-handling' },
  { label: 'Product Development', href: '/solutions/product-development' },
  { label: 'Automation & Control', href: '/solutions/automation-control' },
]

const footerNav = [
  { label: 'Portfolio', href: '/projects' },
  { label: 'About', href: '/about' },
  { label: 'Get a Quote', href: '/contact' },
]

export default function Footer() {
  return (
    <footer className="bg-nm-s1 border-t border-nm-border">
      <div className="site-container">
        {/* Main footer grid */}
        <div className="py-16 md:py-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">

          {/* Brand column */}
          <div className="lg:col-span-3">
            <Link href="/" className="flex items-center gap-2.5 mb-5 group w-fit">
              <svg width="26" height="26" viewBox="0 0 32 32" fill="none" aria-hidden="true">
                <path
                  d="M 16 3 L 27.26 9.5 L 27.26 22.5 L 16 29 L 4.74 22.5 L 4.74 9.5 Z"
                  stroke="#2D6349"
                  strokeWidth="1.4"
                />
                <path
                  d="M 10.5 9 L 10.5 23 M 21.5 9 L 21.5 23 M 10.5 9 L 21.5 23"
                  stroke="#4D8F6A"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="font-sans font-medium text-nm-text-p tracking-tight text-[0.9375rem]">
                Northern<span className="text-nm-green-text font-light"> Modulus</span>
              </span>
            </Link>
            <p className="text-body-md text-nm-text-s leading-relaxed max-w-xs mb-6">
              Premium custom 3D printing — prototypes, functional parts, and small-batch
              production with engineering review as standard.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 text-label-md font-mono uppercase tracking-[0.12em] text-nm-green-text hover:text-nm-green-bright transition-colors duration-200"
            >
              Get a Quote
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                <path d="M2 6H10M6.5 2.5L10 6L6.5 9.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </div>

          {/* 3D Printing column */}
          <div className="lg:col-span-3">
            <p className="font-mono text-label-sm uppercase tracking-[0.14em] text-nm-text-t mb-5">
              3D Printing
            </p>
            <ul className="space-y-3">
              {footerPrinting.map((link) => (
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

          {/* Engineering column */}
          <div className="lg:col-span-3">
            <p className="font-mono text-label-sm uppercase tracking-[0.14em] text-nm-text-t mb-5">
              Engineering Services
            </p>
            <ul className="space-y-3">
              {footerEngineering.map((link) => (
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
          <div className="lg:col-span-3">
            <p className="font-mono text-label-sm uppercase tracking-[0.14em] text-nm-text-t mb-5">
              Contact
            </p>
            <div className="space-y-4">
              <div>
                <p className="text-label-sm font-mono uppercase tracking-[0.1em] text-nm-text-t mb-1">
                  Email
                </p>
                <a
                  href="mailto:northernmodulus@gmail.com"
                  className="text-body-sm text-nm-text-s hover:text-nm-green-text transition-colors duration-200 break-all"
                >
                  northernmodulus@gmail.com
                </a>
              </div>
              <div>
                <p className="text-label-sm font-mono uppercase tracking-[0.1em] text-nm-text-t mb-1">
                  Instagram
                </p>
                <a
                  href="https://instagram.com/northernmodulus"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-body-sm text-nm-text-s hover:text-nm-green-text transition-colors duration-200"
                >
                  @northernmodulus
                </a>
              </div>
              <div>
                <p className="text-label-sm font-mono uppercase tracking-[0.1em] text-nm-text-t mb-1">
                  Response time
                </p>
                <p className="text-body-sm text-nm-text-s">Within one business day</p>
              </div>

              {/* Company nav */}
              <div className="pt-2">
                <p className="text-label-sm font-mono uppercase tracking-[0.1em] text-nm-text-t mb-3">
                  Company
                </p>
                <ul className="space-y-2">
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
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-nm-border py-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <p className="font-mono text-label-sm text-nm-text-t tracking-[0.1em]">
            © {new Date().getFullYear()} Northern Modulus. All rights reserved.
          </p>
          <div className="flex items-center gap-5">
            <a
              href="https://instagram.com/northernmodulus"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-label-sm text-nm-text-t hover:text-nm-text-s transition-colors duration-200 tracking-[0.1em]"
            >
              Instagram
            </a>
            <a
              href="mailto:northernmodulus@gmail.com"
              className="font-mono text-label-sm text-nm-text-t hover:text-nm-text-s transition-colors duration-200 tracking-[0.1em]"
            >
              Contact
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
