import React from "react"
import type { Metadata } from 'next'
import { Lora, JetBrains_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import Script from 'next/script'
import { I18nProvider } from '@/lib/i18n'
import { ClientLayout } from '@/components/client-layout'
import './globals.css'

const lora = Lora({ subsets: ["latin"], variable: "--font-lora" });
const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains" });

export const metadata: Metadata = {
  metadataBase: new URL('https://allegoryjs.com'),
  title: 'Allegory.js - A Web-Native Interactive Fiction Engine',
  description: 'Build immersive, simulation-driven interactive fiction for the web. Allegory.js bridges parser-based narratives with systemic game design.',
  generator: 'v0.app',
  keywords: ['interactive fiction', 'game engine', 'web development', 'simulation', 'parser', 'narrative design', 'JavaScript', 'TypeScript'],
  authors: [{ name: 'Allegory.js Team' }],
  creator: 'Allegory.js Team',
  publisher: 'Allegory.js',
  alternates: {
    canonical: 'https://allegoryjs.com',
  },
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
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Allegory.js',
    description: 'A web-native interactive fiction engine that bridges parser-based narratives with systemic game design',
    applicationCategory: 'DeveloperApplication',
    operatingSystem: 'Web Browser',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    author: {
      '@type': 'Organization',
      name: 'Allegory.js Team',
    },
    url: 'https://allegoryjs.com',
    codeRepository: 'https://github.com/allegoryjs/allegoryjs',
    programmingLanguage: ['JavaScript', 'TypeScript'],
  }

  return (
    <html lang="en" className={`${lora.variable} ${jetbrainsMono.variable}`}>
      <head>
        <meta name="theme-color" content="#000000" media="(prefers-color-scheme: dark)" />
        <meta name="theme-color" content="#ffffff" media="(prefers-color-scheme: light)" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
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
