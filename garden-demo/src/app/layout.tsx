import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { siteConfig } from '@/lib/data';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
  style: ['normal', 'italic'],
});

export const metadata: Metadata = {
  title: {
    default: `${siteConfig.businessName} | Hudson, Ohio`,
    template: `%s | ${siteConfig.businessName}`,
  },
  description:
    'Clover Garden Centre — Hudson, Ohio\'s full-service nursery and garden center. Annuals, perennials, trees, houseplants, and expert advice since 1987.',
  keywords: [
    'garden center Hudson Ohio',
    'nursery Hudson OH',
    'plants Hudson Ohio',
    'perennials Ohio',
    'houseplants Hudson',
    'garden supplies Ohio',
    'local nursery',
  ],
  authors: [{ name: 'Clover Garden Centre' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: siteConfig.businessName,
    title: `${siteConfig.businessName} | Hudson, Ohio`,
    description: siteConfig.tagline,
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className="min-h-screen bg-cream text-stone-800 antialiased">
        <Header />
        <main className="pt-16 lg:pt-20">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
