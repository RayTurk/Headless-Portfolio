import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { siteConfig } from '@/lib/data';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: `${siteConfig.businessName} | Premium Auto Detailing — Brooklyn, OH`,
    template: `%s | ${siteConfig.businessName}`,
  },
  description:
    'Premium auto detailing in Brooklyn, OH. Ceramic coatings, paint correction, interior deep clean, and more. Ceramic-certified technicians. Book online.',
  keywords: [
    'auto detailing Cleveland',
    'ceramic coating Cleveland',
    'paint correction Ohio',
    'car detailing Brooklyn OH',
    'interior car detailing',
    'headlight restoration',
    'mobile detailing Cleveland',
  ],
  authors: [{ name: 'Revive Auto Detailing' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: siteConfig.businessName,
    title: `${siteConfig.businessName} | Premium Auto Detailing`,
    description: siteConfig.tagline,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className="min-h-screen bg-zinc-950 text-white antialiased">
        <Header />
        <main className="pt-16 lg:pt-20">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
