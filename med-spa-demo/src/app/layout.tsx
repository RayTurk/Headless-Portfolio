import type { Metadata } from 'next';
import { Cormorant_Garamond, DM_Sans } from 'next/font/google';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { siteConfig } from '@/lib/data';

const dmSans = DM_Sans({ subsets: ['latin'], variable: '--font-sans' });
const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-display',
});

export const metadata: Metadata = {
  title: {
    default: `${siteConfig.name} | Chagrin Falls, OH`,
    template: `%s | ${siteConfig.name}`,
  },
  description:
    'Luminary Aesthetics offers medical-grade injectables, laser treatments, and advanced skincare in Chagrin Falls, Ohio. Board-certified practitioners. Natural-looking results.',
  keywords: [
    'med spa Chagrin Falls',
    'Botox Cleveland',
    'dermal fillers Ohio',
    'microneedling',
    'HydraFacial',
    'medical spa Northeast Ohio',
  ],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: siteConfig.name,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${dmSans.variable} ${cormorant.variable}`}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className="font-sans">
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
