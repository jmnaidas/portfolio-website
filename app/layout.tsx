import type { Metadata } from 'next';
import { Geist } from 'next/font/google';
import './globals.css';
import { themeBootstrap } from '@/lib/theme';

const geist = Geist({ subsets: ['latin'], variable: '--font-geist', display: 'swap' });
const title = 'John Marie Naidas | Senior Full Stack Engineer';
const description = 'Portfolio of John Marie Naidas, a Senior Full Stack Engineer specializing in backend systems, full stack development, architecture, enterprise platforms, and observability.';
const origin = process.env.NEXT_PUBLIC_SITE_URL;
export const metadata: Metadata = {
  title, description,
  ...(origin ? { metadataBase: new URL(origin), alternates: { canonical: '/' } } : {}),
  openGraph: { title, description, type: 'website', locale: 'en_US', siteName: 'John Marie Naidas' },
  twitter: { card: 'summary', title, description },
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" className={geist.variable} suppressHydrationWarning><head><script dangerouslySetInnerHTML={{ __html: themeBootstrap }} /></head><body><a className="skip-link" href="#main">Skip to content</a>{children}</body></html>;
}
