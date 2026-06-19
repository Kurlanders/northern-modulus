import Link from 'next/link'
import Image from 'next/image'

const footerPrinting = [
  { label: '3D Printing Overview',    href: '/3d-printing' },
  { label: 'Prototypes',              href: '/3d-printing#prototypes' },
  { label: 'Functional Parts',        href: '/3d-printing#functional' },
  { label: 'Small-Batch Production',  href: '/3d-printing#batch' },
  { label: 'Materials',               href: '/3d-printing#capabilities' },
]

const footerEngineering = [
  { label: 'Tooling & Fixtures',      href: '/solutions/tooling-fixtures' },
  { label: 'Automation',              href: '/solutions/automation-control' },
  { label: 'Transport & Handling',    href: '/solutions/transport-handling' },
]

export default function Footer() {
  return (
    <footer className="bg-nm-bg border-t border-nm-border">
      <div className="site-container">

        {/* Main grid */}
        <div className="py-16 md:py-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr] gap-16 md:gap-20">

          {/* Brand column */}
          <div>
            <Link href="/" className="block mb-5">
              <Image
                src="/pictures/new-logo_svg.svg"
                alt="Northern Modulus"
                width={817}
                height={273}
                className="h-[44px] w-auto"
              />
            </Link>
            <p className="text-[13px] text-nm-text-s leading-[1.9] max-w-[280px] mb-7">
              Premium FDM 3D printing — prototypes, functional parts, and small-batch
              production with engineering review as standard.
            </p>
            <Link
              href="/contact"
              className="bg-nm-green-text text-white px-6 py-2.5 text-[13px] font-semibold inline-block hover:opacity-85 transition-opacity"
            >
              Get a Quote
            </Link>
          </div>

          {/* 3D Printing column */}
          <div>
            <p className="text-[11px] font-semibold text-nm-text-t tracking-[2px] uppercase mb-6">
              3D Printing
            </p>
            <div className="flex flex-col gap-3.5">
              {footerPrinting.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-[13px] text-nm-text-s hover:text-nm-text-p transition-colors duration-200"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Engineering column */}
          <div>
            <p className="text-[11px] font-semibold text-nm-text-t tracking-[2px] uppercase mb-6">
              Engineering
            </p>
            <div className="flex flex-col gap-3.5">
              {footerEngineering.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-[13px] text-nm-text-s hover:text-nm-text-p transition-colors duration-200"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact column */}
          <div>
            <p className="text-[11px] font-semibold text-nm-text-t tracking-[2px] uppercase mb-6">
              Contact
            </p>
            <div className="flex flex-col gap-5">
              <div>
                <p className="text-[11px] text-nm-text-t tracking-[1px] uppercase mb-1">Email</p>
                <a
                  href="mailto:northernmodulus@gmail.com"
                  className="text-[13px] text-nm-text-s hover:text-nm-text-p transition-colors duration-200"
                >
                  northernmodulus@gmail.com
                </a>
              </div>
              <div>
                <p className="text-[11px] text-nm-text-t tracking-[1px] uppercase mb-1">Instagram</p>
                <a
                  href="https://instagram.com/northernmodulus"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[13px] text-nm-text-s hover:text-nm-text-p transition-colors duration-200"
                >
                  @northernmodulus
                </a>
              </div>
              <div>
                <p className="text-[11px] text-nm-text-t tracking-[1px] uppercase mb-1">Response</p>
                <p className="text-[13px] text-nm-text-s">Within 1 business day</p>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="border-t border-nm-border py-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <p className="text-[12px] text-nm-text-t tracking-[0.5px]">
            © {new Date().getFullYear()} Northern Modulus. All rights reserved.
          </p>
          <div className="flex gap-8">
            <a
              href="https://instagram.com/northernmodulus"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[12px] text-nm-text-t hover:text-nm-text-s transition-colors duration-200"
            >
              Instagram
            </a>
            <a
              href="mailto:northernmodulus@gmail.com"
              className="text-[12px] text-nm-text-t hover:text-nm-text-s transition-colors duration-200"
            >
              Contact
            </a>
          </div>
        </div>

      </div>
    </footer>
  )
}
