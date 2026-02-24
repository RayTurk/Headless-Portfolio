import type { Metadata } from 'next'
import { Barlow, Barlow_Condensed, IBM_Plex_Mono } from 'next/font/google'
import { AnimatePresence } from 'framer-motion'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import '@/styles/globals.css'

const barlow = Barlow({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-sans',
  display: 'swap',
})

const barlowCondensed = Barlow_Condensed({
  subsets: ['latin'],
  weight: ['600', '700', '800', '900'],
  variable: '--font-display',
  display: 'swap',
})

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://2k26portfolio.netlify.app'),
  title: {
    default: 'Ray Turk | Cleveland WordPress & Full Stack Developer',
    template: '%s | Ray Turk',
  },
  description:
    'Cleveland-based WordPress and full-stack developer specializing in web maintenance, hosting, updates, and custom website builds.',
  keywords: [
    'WordPress',
    'Web Development',
    'Full Stack Developer',
    'Cleveland',
    'Web Maintenance',
    'Website Hosting',
    'React',
    'Next.js',
    'PHP',
  ],
  authors: [{ name: 'Ray Turk', url: process.env.NEXT_PUBLIC_SITE_URL || 'https://2k26portfolio.netlify.app' }],
  creator: 'Ray Turk',
  publisher: 'Ray Turk',
  robots: {
    index: true,
    follow: true,
    'max-image-preview': 'large',
    'max-snippet': -1,
    'max-video-preview': -1,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://2k26portfolio.netlify.app',
    siteName: 'Ray Turk',
    title: 'Ray Turk | Cleveland WordPress & Full Stack Developer',
    description:
      'Cleveland-based WordPress and full-stack developer specializing in web maintenance, hosting, updates, and custom website builds.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Ray Turk - Cleveland WordPress & Full Stack Developer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@rayturk',
    creator: '@rayturk',
    title: 'Ray Turk | Cleveland WordPress & Full Stack Developer',
    description:
      'Cleveland-based WordPress and full-stack developer specializing in web maintenance, hosting, updates, and custom website builds.',
    images: ['/og-image.jpg'],
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
  formatDetection: {
    email: true,
    telephone: true,
    address: true,
  },
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  colorScheme: 'dark',
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html
      lang="en"
      className={`${barlow.variable} ${barlowCondensed.variable} ${ibmPlexMono.variable} scroll-smooth`}
      suppressHydrationWarning
    >
      <head>
        <meta name="theme-color" content="#0f0d0b" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      </head>
      <body className="dark bg-surface-950 text-cinder font-sans antialiased">
        <Header />
        <main>
          <AnimatePresence mode="wait">
            {children}
          </AnimatePresence>
        </main>
        <Footer />
      </body>
    </html>
  )
}
