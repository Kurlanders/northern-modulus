import type { Metadata } from 'next'
import Link from 'next/link'
import Button from '@/components/ui/Button'

export const metadata: Metadata = {
  title: '404 — Page Not Found',
}

export default function NotFound() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden">
      <div className="absolute inset-0 line-grid opacity-20" aria-hidden="true" />

      <div className="site-container relative">
        <div className="max-w-narrow mx-auto text-center py-32">
          {/* Technical mark */}
          <div className="flex items-center justify-center gap-4 mb-12" aria-hidden="true">
            <div className="h-px w-16 bg-nm-border" />
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
              <rect x="4" y="4" width="18" height="18" stroke="#245040" strokeWidth="1.2" />
              <rect x="14" y="14" width="30" height="30" stroke="#4D8F6A" strokeWidth="1.2" strokeDasharray="3 3" fill="none" />
            </svg>
            <div className="h-px w-16 bg-nm-border" />
          </div>

          <p className="font-mono text-label-md text-nm-green-text uppercase tracking-[0.14em] mb-4">
            404 — Not Found
          </p>
          <h1 className="text-disp-lg text-nm-text-p font-light tracking-tight mb-6">
            This page does not exist.
          </h1>
          <p className="text-body-lg text-nm-text-s leading-relaxed mb-10">
            The page you were looking for could not be found. It may have moved, or the
            URL may be incorrect.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <Button href="/" variant="primary" size="lg" withArrow>
              Return Home
            </Button>
            <Button href="/solutions" variant="secondary" size="lg">
              View Solutions
            </Button>
          </div>

          {/* Quick links */}
          <div className="mt-16 pt-8 border-t border-nm-border">
            <p className="font-mono text-label-sm text-nm-text-t uppercase tracking-[0.14em] mb-5">
              Useful Pages
            </p>
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-3">
              {[
                { label: 'Solutions', href: '/solutions' },
                { label: 'Projects', href: '/projects' },
                { label: 'Process', href: '/process' },
                { label: 'About', href: '/about' },
                { label: 'Contact', href: '/contact' },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-body-sm text-nm-text-s hover:text-nm-text-p transition-colors duration-200"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
