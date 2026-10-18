import Link from 'next/link'
import Image from 'next/image'

const socials = [
  {
    label: 'Instagram',
    href: 'https://instagram.com/northernmodulus',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
        <circle cx="12" cy="12" r="4"/>
        <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/>
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/company/northern-modulus',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="2" y="2" width="20" height="20" rx="3" ry="3"/>
        <line x1="8" y1="11" x2="8" y2="17"/>
        <line x1="8" y1="8" x2="8" y2="8.5"/>
        <line x1="12" y1="17" x2="12" y2="13" />
        <path d="M12 13a3 3 0 0 1 6 0v4"/>
      </svg>
    ),
  },
]

const footerLinks = [
  { label: 'Shop',            href: '/shop' },
  { label: 'Custom Printing', href: '/3d-printing' },
  { label: 'Work',            href: '/work' },
  { label: 'About',           href: '/about' },
  { label: 'Contact',         href: '/contact' },
]

const legal = {
  name: 'NORTHERN MODULUS SIA',
  registrationNumber: '50203734921',
  address: 'Marijas iela 16–17, Rīga, Latvia',
}

const legalComplete = Object.values(legal).every((v) => v.trim() !== '' && !v.startsWith('TODO'))

export default function Footer() {
  return (
    <footer className="bg-nm-bg border-t border-nm-border">
      <div className="site-container">
        <div className="py-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">

          {/* Logo + copyright */}
          <div className="flex flex-col gap-2.5">
            <Link href="/" aria-label="Northern Modulus — Home">
              <Image
                src="/pictures/new-logo_svg.svg"
                alt="Northern Modulus"
                width={817}
                height={273}
                className="h-[70px] w-auto"
              />
            </Link>
            <p className="text-[12px] text-nm-text-t">
              © {new Date().getFullYear()} NORTHERN MODULUS SIA. All rights reserved.
            </p>
          </div>

          <nav aria-label="Footer" className="flex flex-wrap gap-x-7 gap-y-3">
            {footerLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-[13px] text-nm-text-s hover:text-nm-text-p transition-colors duration-200"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right: socials */}
          <div className="flex items-center gap-5">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="text-nm-text-t hover:text-nm-text-p transition-colors duration-200"
                >
                  {s.icon}
                </a>
              ))}
          </div>

        </div>

        {legalComplete && (
          <div className="border-t border-nm-border py-6 flex flex-col sm:flex-row flex-wrap gap-x-8 gap-y-1.5 text-[12px] text-nm-text-t">
            <span>{legal.name}</span>
            <span>Reg. no. {legal.registrationNumber}</span>
            <span>{legal.address}</span>
          </div>
        )}
      </div>
    </footer>
  )
}
