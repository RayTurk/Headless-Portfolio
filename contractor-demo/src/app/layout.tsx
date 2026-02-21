import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { siteConfig } from '@/lib/data';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    default: `${siteConfig.companyName} | Greater Cleveland HVAC & Plumbing`,
    template: `%s | ${siteConfig.companyName}`,
  },
  description:
    "Greater Cleveland's trusted HVAC and plumbing experts since 2002. 24/7 emergency service, licensed & insured. Heating, cooling, plumbing, and water heater services.",
  keywords: [
    'HVAC Cleveland',
    'plumber Cleveland',
    'furnace repair',
    'AC repair',
    'water heater installation',
    'Lake County HVAC',
    'Geauga County plumbing',
    'emergency HVAC',
  ],
  authors: [{ name: 'Summit HVAC & Plumbing' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: siteConfig.companyName,
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
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className={inter.className}>
        <Header />
        <main className="pt-16 lg:pt-20">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
