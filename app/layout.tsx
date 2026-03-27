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
    default: 'Northern Modulus — Premium Custom 3D Printing',
    template: '%s — Northern Modulus',
  },
  description:
    'Premium custom 3D printing for prototypes, functional parts, and small-batch production. Engineering-led file review, material guidance, and fast quoting.',
  keywords: [
    'custom 3D printing',
    'FDM printing service',
    'prototype printing',
    'functional 3D printed parts',
    'small batch 3D printing',
    'engineering 3D printing',
    'industrial 3D printing',
    'rapid prototyping',
  ],
  openGraph: {
    type: 'website',
    siteName: 'Northern Modulus',
    title: 'Northern Modulus — Premium Custom 3D Printing',
    description:
      'Premium custom 3D printing for prototypes, functional parts, and small-batch production. Engineering-led file review, material guidance, and fast quoting.',
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
