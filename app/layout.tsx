import type { Metadata } from 'next';
import { Geist } from 'next/font/google';
import './globals.css';
import { themeBootstrap } from '@/lib/theme';
import { siteUrl, siteTitle as title, siteDescription as description } from '@/lib/site';

const geist = Geist({ subsets: ['latin'], variable: '--font-geist', display: 'swap' });
export const metadata: Metadata = {
  title, description,
  metadataBase: siteUrl,
  alternates: { canonical: '/' },
  robots: { index: true, follow: true },
  openGraph: { title, description, type: 'website', url: '/', locale: 'en_US', siteName: 'John Marie Naidas', images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: 'John Marie Naidas — Senior Full Stack Engineer' }] },
  twitter: { card: 'summary_large_image', title, description, images: ['/opengraph-image'] },
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" className={geist.variable} suppressHydrationWarning><head><script dangerouslySetInnerHTML={{ __html: themeBootstrap }} /></head><body><a className="skip-link" href="#main">Skip to content</a>{children}</body></html>;
}
