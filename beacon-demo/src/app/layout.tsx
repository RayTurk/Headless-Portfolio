import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'Beacon — Uptime Monitoring for Modern Teams',
    template: '%s | Beacon',
  },
  description:
    'Know before your customers do. Beacon monitors your websites and APIs every 30 seconds from 8 global locations with instant Slack and PagerDuty alerts.',
  keywords: ['uptime monitoring', 'API monitoring', 'status page', 'incident alerts', 'SaaS'],
  openGraph: {
    title: 'Beacon — Uptime Monitoring for Modern Teams',
    description: 'Know before your customers do.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} dark`}>
      <body className="min-h-screen bg-slate-950 text-white">
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
