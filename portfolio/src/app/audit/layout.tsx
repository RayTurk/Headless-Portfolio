import { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/seo';

export const metadata: Metadata = generatePageMetadata({
  title: 'Free Website Audit',
  description:
    'Get an instant SEO, technical, social sharing, and accessibility audit for your website — free, no account needed. Serving Cleveland businesses and beyond.',
  path: '/audit',
});

export default function AuditLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
