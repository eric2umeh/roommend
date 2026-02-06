import React from 'react'
import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const _geist = Geist({ subsets: ['latin'] })
const _geistMono = Geist_Mono({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Roommend - Hotel & Restaurant Management',
  description:
    'Modern, innovative hotel and restaurant management system. Free for first 5 users. Manage rooms, reservations, guests, POS, inventory, and staff from anywhere.',
  keywords: [
    'hotel management',
    'restaurant management',
    'POS system',
    'booking system',
    'property management',
    'Nigeria',
    'Africa',
  ],
  authors: [{ name: 'Roommend Team' }],
  creator: 'Roommend Inc',
  publisher: 'Roommend Inc',
  robots: 'index, follow',
  openGraph: {
    type: 'website',
    locale: 'en_NG',
    url: 'https://roommend.app',
    siteName: 'Roommend',
    title: 'Roommend - Hotel & Restaurant Management',
    description:
      'Modern hotel and restaurant management system for African properties',
    images: [
      {
        url: 'https://roommend.app/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Roommend Dashboard',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Roommend - Hotel Management',
    description: 'Modern hotel and restaurant management system',
  },
    generator: 'v0.app'
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0a0a0a' },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
