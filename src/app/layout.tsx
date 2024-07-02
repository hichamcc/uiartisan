import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Suspense } from 'react'

import "./globals.css";
import Loading from './Loading'



const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: 'UI Artisan - Create Amazing User Interfaces',
    template: '%s | UI Generator'
  },
  description: 'Create stunning UI components with our easy-to-use generator. Perfect for developers and designers.',
  openGraph: {
    title: 'UI Generator',
    description: 'Create stunning UI components with our easy-to-use generator.',
    url: 'https://www.youruigenerator.com/',
    siteName: 'UI Generator',
    images: [
      {
        url: '/img/preview.png',
        width: 1200,
        height: 630,
      }
    ],
    locale: 'en_US',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  twitter: {
    title: 'UI Generator',
    card: 'summary_large_image',
  },
  icons: {
    shortcut: '/img/favicon.ico',
    icon: '/img/favicon.ico',
  },

  verification: {
    google: 'your-google-site-verification-code',
  },
}


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className} suppressHydrationWarning>
        <Suspense fallback={<Loading />}>
          {children}
        </Suspense>
      </body>
    </html>
  );
}
