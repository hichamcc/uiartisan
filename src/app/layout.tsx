import type { Metadata } from "next";
import Script from "next/script";
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
    url: 'https://uiartisan.vercel.app/',
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
    shortcut: 'https://uiartisan.vercel.app/img/favicon.ico',
    icon: 'https://uiartisan.vercel.app/img/favicon.ico',
  },

  verification: {
    google: 'google-site-verification=zlspO2oCJ2F2FaRSu58yk3gEw3FV1lBX-jVxJMpBaC0',
  },
}


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Script
        id="gtm"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `(function(w,d,s,l,i){w[l] = w[l] || [];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}');`
        }}
      >

      </Script>
      <body className={inter.className} suppressHydrationWarning>
        <Suspense fallback={<Loading />}>
          {children}
        </Suspense>
      </body>
    </html >
  );
}
