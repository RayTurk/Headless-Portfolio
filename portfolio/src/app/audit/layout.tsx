import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Free Website Audit | Ray Turk',
  description:
    'Get an instant SEO, technical, social sharing, and accessibility audit for your website — free, no account needed. Serving Cleveland businesses and beyond.',
};

export default function AuditLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
