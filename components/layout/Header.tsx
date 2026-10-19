'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import ThemeToggle from '@/components/theme/ThemeToggle'
import Button from '@/components/ui/Button'

const navLinks = [
  { label: 'Shop',            href: '/shop' },
  { label: 'Custom Printing', href: '/3d-printing' },
  { label: 'Work',            href: '/work' },
  { label: 'About',           href: '/about' },
]

export default function Header() {
  const [scrolled,   setScrolled]   = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  const isActive = (href: string) => pathname.startsWith(href)

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-nm-border ${
          scrolled || mobileOpen ? 'bg-nm-bg/95 backdrop-blur-md' : 'bg-nm-bg'
        }`}
      >
        <div className="site-container">
          <nav className="flex items-center justify-between h-[68px]">

            <Link href="/" className="flex-shrink-0" aria-label="Northern Modulus — Home">
              {/* Both logos render; CSS hides one per theme, so there's no layout shift. */}
              <Image
                src="/pictures/new-logo-light.svg"
                alt="Northern Modulus"
                width={817}
                height={273}
                className="h-[62px] w-auto flex-shrink-0 dark:hidden"
                priority
              />
              <Image
                src="/pictures/new-logo_svg.svg"
                alt="Northern Modulus"
                width={817}
                height={273}
                className="h-[62px] w-auto flex-shrink-0 hidden dark:block"
                priority
              />
            </Link>

            {/* Desktop nav */}
            <div className="hidden lg:flex items-center gap-9">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-[13px] font-medium transition-colors duration-200 ${
                    isActive(link.href) ? 'text-nm-text-p' : 'text-nm-text-s hover:text-nm-text-p'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="hidden lg:flex items-center gap-4">
              <ThemeToggle variant="pill" />
              <Button href="/contact" size="sm">
                Get a Quote
              </Button>
            </div>

            {/* Mobile: theme toggle stays in the top bar, next to the hamburger */}
            <div className="lg:hidden flex items-center gap-2">
              <ThemeToggle variant="icon" />
              <button
                onClick={() => setMobileOpen((v) => !v)}
                aria-expanded={mobileOpen}
                aria-label={mobileOpen ? 'Close navigation' : 'Open navigation'}
                className="flex flex-col justify-center items-center w-10 h-10 gap-[5px]"
              >
                <span className={`block w-5 h-[1.5px] bg-nm-text-s transition-all duration-300 ${mobileOpen ? 'rotate-45 translate-y-[6.5px]' : ''}`} />
                <span className={`block h-[1.5px] bg-nm-text-s transition-all duration-300 ${mobileOpen ? 'opacity-0 w-0' : 'w-4'}`} />
                <span className={`block w-5 h-[1.5px] bg-nm-text-s transition-all duration-300 ${mobileOpen ? '-rotate-45 -translate-y-[6.5px]' : ''}`} />
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* Mobile menu */}
      <div
        className={`fixed inset-0 z-40 bg-nm-bg transition-transform duration-500 ease-out-expo lg:hidden ${
          mobileOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        aria-hidden={!mobileOpen}
      >
        <div className="flex flex-col h-full pt-20 pb-8 px-6 overflow-y-auto">
          <nav className="flex-1">
            <div className="space-y-1 mb-6">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`block py-3 text-[22px] font-bold tracking-tight transition-colors duration-200 ${
                    isActive(link.href) ? 'text-nm-text-p' : 'text-nm-text-s hover:text-nm-text-p'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="h-px bg-nm-border mb-6" />

            <Button href="/contact" size="md" withArrow className="w-full">
              Get a Quote
            </Button>

            <ThemeToggle variant="menu" className="mt-3" />
          </nav>

          <div className="pt-6">
            <p className="text-[12px] text-nm-text-t uppercase tracking-[1.5px]">
              Northern Modulus
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
