import React from "react"
import type { Metadata } from 'next'
import { Lora, JetBrains_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import Script from 'next/script'
import { I18nProvider } from '@/lib/i18n'
import { ClientLayout } from '@/components/client-layout'
import './globals.css'

const _lora = Lora({ subsets: ["latin"], variable: "--font-lora" });
const _jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains" });

export const metadata: Metadata = {
  title: 'Allegory.js - A Web-Native Interactive Fiction Engine',
  description: 'Build immersive, simulation-driven interactive fiction for the web. Allegory.js bridges parser-based narratives with systemic game design.',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
  openGraph: {
    title: 'Allegory.js - A Web-Native Interactive Fiction Engine',
    description: 'Build immersive, simulation-driven interactive fiction for the web. Allegory.js bridges parser-based narratives with systemic game design.',
    url: 'https://allegoryjs.com',
    siteName: 'Allegory.js',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Allegory.js Logo',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Allegory.js - A Web-Native Interactive Fiction Engine',
    description: 'Build immersive, simulation-driven interactive fiction for the web. Allegory.js bridges parser-based narratives with systemic game design.',
    images: ['/og-image.png'],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased`}>
        <I18nProvider>
          <ClientLayout>
            {children}
          </ClientLayout>
        </I18nProvider>
        <Analytics />
        <Script
          data-goatcounter="https://allegoryjs.goatcounter.com/count"
          src="https://gc.zgo.at/count.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  )
}
