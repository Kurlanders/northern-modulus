'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Button from '@/components/ui/Button'

const printingLinks = [
  { label: 'How It Works', href: '/3d-printing#how-it-works' },
  { label: 'Materials & Capabilities', href: '/3d-printing#capabilities' },
  { label: 'Prototypes', href: '/3d-printing#prototypes' },
  { label: 'Functional Parts', href: '/3d-printing#functional' },
  { label: 'Small-Batch Production', href: '/3d-printing#batch' },
]

const navLinks = [
  { label: '3D Printing', href: '/3d-printing', hasDropdown: true },
  { label: 'Portfolio', href: '/projects' },
  { label: 'About', href: '/about' },
]

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [printingOpen, setPrintingOpen] = useState(false)
  const pathname = usePathname()
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
    setPrintingOpen(false)
  }, [pathname])

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setPrintingOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href.split('#')[0])

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled || mobileOpen
            ? 'bg-nm-bg/95 backdrop-blur-md border-b border-nm-border'
            : 'bg-transparent'
        }`}
      >
        <div className="site-container">
          <nav className="flex items-center justify-between h-16 md:h-18">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center gap-2.5 group flex-shrink-0"
              aria-label="Northern Modulus — Home"
            >
              <svg
                width="28"
                height="28"
                viewBox="0 0 32 32"
                fill="none"
                aria-hidden="true"
                className="flex-shrink-0"
              >
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
              <span className="font-sans font-medium text-nm-text-p tracking-tight text-[0.9375rem] leading-none">
                Northern<span className="text-nm-green-text font-light"> Modulus</span>
              </span>
            </Link>

            {/* Desktop nav */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) =>
                link.hasDropdown ? (
                  <div key={link.href} className="relative" ref={dropdownRef}>
                    <button
                      onClick={() => setPrintingOpen((v) => !v)}
                      onKeyDown={(e) => e.key === 'Escape' && setPrintingOpen(false)}
                      aria-expanded={printingOpen}
                      aria-haspopup="true"
                      className={`flex items-center gap-1.5 px-3.5 py-2 text-label-md font-mono uppercase tracking-[0.1em] transition-colors duration-200 rounded-sm2 ${
                        isActive(link.href)
                          ? 'text-nm-text-p'
                          : 'text-nm-text-s hover:text-nm-text-p'
                      }`}
                    >
                      {link.label}
                      <svg
                        width="10"
                        height="10"
                        viewBox="0 0 10 10"
                        fill="none"
                        aria-hidden="true"
                        className={`transition-transform duration-200 ${printingOpen ? 'rotate-180' : ''}`}
                      >
                        <path d="M2 3.5L5 6.5L8 3.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>

                    {printingOpen && (
                      <div className="absolute top-full left-0 mt-1.5 w-64 bg-nm-s2 border border-nm-border rounded-sm2 shadow-2xl shadow-black/60 overflow-hidden">
                        <div className="p-1">
                          <Link
                            href="/3d-printing"
                            className="block px-4 py-2.5 text-label-sm font-mono uppercase tracking-[0.12em] text-nm-green-text hover:bg-nm-s3 rounded-sm2 transition-colors duration-150"
                          >
                            Overview
                          </Link>
                          <div className="h-px bg-nm-border mx-3 my-1" />
                          {printingLinks.map((s) => (
                            <Link
                              key={s.href}
                              href={s.href}
                              className="block px-4 py-2.5 text-body-sm text-nm-text-s hover:text-nm-text-p hover:bg-nm-s3 rounded-sm2 transition-colors duration-150"
                            >
                              {s.label}
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`px-3.5 py-2 text-label-md font-mono uppercase tracking-[0.1em] transition-colors duration-200 rounded-sm2 ${
                      isActive(link.href)
                        ? 'text-nm-text-p'
                        : 'text-nm-text-s hover:text-nm-text-p'
                    }`}
                  >
                    {link.label}
                  </Link>
                )
              )}
            </div>

            {/* Desktop CTA */}
            <div className="hidden lg:flex items-center gap-3">
              <Button href="/contact" variant="primary" size="sm" withArrow>
                Get a Quote
              </Button>
            </div>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen((v) => !v)}
              aria-expanded={mobileOpen}
              aria-label={mobileOpen ? 'Close navigation' : 'Open navigation'}
              className="lg:hidden flex flex-col justify-center items-center w-10 h-10 gap-[5px] group"
            >
              <span
                className={`block w-5 h-[1.5px] bg-nm-text-s transition-all duration-300 ${
                  mobileOpen ? 'rotate-45 translate-y-[6.5px]' : ''
                }`}
              />
              <span
                className={`block h-[1.5px] bg-nm-text-s transition-all duration-300 ${
                  mobileOpen ? 'opacity-0 w-0' : 'w-4'
                }`}
              />
              <span
                className={`block w-5 h-[1.5px] bg-nm-text-s transition-all duration-300 ${
                  mobileOpen ? '-rotate-45 -translate-y-[6.5px]' : ''
                }`}
              />
            </button>
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
        <div className="flex flex-col h-full pt-20 pb-8 px-5 overflow-y-auto">
          <nav className="flex-1">
            <div className="space-y-1 mb-6">
              {/* 3D Printing with sub-links */}
              <div>
                <Link
                  href="/3d-printing"
                  className={`block py-3 text-h2 font-sans font-medium tracking-tight transition-colors duration-200 ${
                    isActive('/3d-printing') ? 'text-nm-text-p' : 'text-nm-text-s hover:text-nm-text-p'
                  }`}
                >
                  3D Printing
                </Link>
                <div className="pl-4 mt-1 mb-3 border-l border-nm-border space-y-1">
                  {printingLinks.map((s) => (
                    <Link
                      key={s.href}
                      href={s.href}
                      className="block py-1.5 text-body-sm text-nm-text-t hover:text-nm-text-s transition-colors duration-200"
                    >
                      {s.label}
                    </Link>
                  ))}
                </div>
              </div>

              {navLinks.filter((l) => !l.hasDropdown).map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`block py-3 text-h2 font-sans font-medium tracking-tight transition-colors duration-200 ${
                    isActive(link.href) ? 'text-nm-text-p' : 'text-nm-text-s hover:text-nm-text-p'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="h-px bg-nm-border mb-6" />

            <Button href="/contact" variant="primary" size="lg" className="w-full justify-center">
              Get a Quote
            </Button>
          </nav>

          <div className="pt-6">
            <p className="font-mono text-label-sm text-nm-text-t uppercase tracking-[0.12em]">
              Northern Modulus
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
