import type { Metadata, Viewport } from 'next'
import { Outfit, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import { Analytics } from '@vercel/analytics/next'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import AttributionCapture from '@/components/AttributionCapture'

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700', '800'],
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
  weight: ['400', '500'],
})

export const metadata: Metadata = {
  title: {
    default: 'Northern Modulus — Engineering-Led 3D Printing in Riga',
    template: '%s — Northern Modulus',
  },
  description:
    'Standard printed parts from the shop, and custom 3D printing for prototypes, functional parts, small batches, jigs, fixtures and moulds. Engineering review on every part.',
  keywords: [
    'custom 3D printing',
    'FDM printing service',
    'prototype printing',
    'functional 3D printed parts',
    'small batch 3D printing',
    'engineering 3D printing',
    '3D printed jigs and fixtures',
    '3D printed moulds',
    '3D printing Riga',
    'rapid prototyping',
  ],
  openGraph: {
    type: 'website',
    siteName: 'Northern Modulus',
    title: 'Northern Modulus — Engineering-Led 3D Printing in Riga',
    description:
      'Standard printed parts from the shop, and custom 3D printing for prototypes, functional parts, small batches, jigs, fixtures and moulds. Engineering review on every part.',
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
    <html lang="en" className={`${outfit.variable} ${jetbrainsMono.variable}`}>
      <body className="bg-nm-bg text-nm-text-p antialiased">
        <Header />
        <main id="main-content">{children}</main>
        <Footer />
        <AttributionCapture />
        <Analytics />
      </body>
    </html>
  )
}
