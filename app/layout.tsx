import type { Metadata, Viewport } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  weight: ['300', '400', '500', '600'],
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
  weight: ['400', '500'],
})

export const metadata: Metadata = {
  title: {
    default: 'Northern Modulus — Industrial Engineering Solutions',
    template: '%s — Northern Modulus',
  },
  description:
    'Custom industrial engineering solutions for manufacturers — fixtures, tooling, engineered transport systems, product development, and targeted automation.',
  keywords: [
    'industrial engineering',
    'custom fixtures',
    'tooling design',
    'engineered transport systems',
    'product development',
    'prototyping',
    'automation integration',
    'manufacturing solutions',
  ],
  openGraph: {
    type: 'website',
    siteName: 'Northern Modulus',
    title: 'Northern Modulus — Industrial Engineering Solutions',
    description:
      'Custom industrial engineering solutions for manufacturers — fixtures, tooling, engineered transport systems, product development, and targeted automation.',
  },
  twitter: {
    card: 'summary_large_image',
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
  },
}

export const viewport: Viewport = {
  themeColor: '#0C0D0F',
  colorScheme: 'dark',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="bg-nm-bg text-nm-text-p antialiased">
        <Header />
        <main id="main-content">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
