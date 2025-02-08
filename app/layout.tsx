/* eslint-disable @next/next/no-img-element */
import { Analytics } from "@vercel/analytics/react";
import { GeistSans } from "geist/font/sans";
import type { Metadata } from "next";
import { ThemeProvider } from "@/components/theme-provider";
import { SiteHeader } from "@/components/site-header";
import { Toaster } from "@/components/ui/toaster";
import { StructuredData } from "@/components/structured-data";
import "./globals.css";
import type React from "react"; // Import React
import { ErrorBoundary } from "@/components/error-boundary";
import { GoogleAnalytics, GoogleTagManager } from "@next/third-parties/google";
import Script from "next/script";
import { SiteFooter } from "@/components/site-footer";
import { CanonicalUrl } from "@/components/canonical-url";
import { SocialMeta } from "@/components/social-meta";
import { FaqSchema } from "@/components/faq-schema";
import { Breadcrumbs } from "@/components/breadcrumbs";

export const metadata: Metadata = {
  title: {
    default: "ETB Exchange Rates | Official & Market Rates",
    template: "%s | ETB Exchange Rates",
  },
  description:
    "Real-time Ethiopian Birr (ETB) exchange rates against major currencies. Track official and market rates with historical data.",
  keywords: [
    "ETB exchange rate",
    "Ethiopian Birr rate",
    "ETB to USD",
    "ETB converter",
    "Ethiopian currency",
    "Birr exchange rate",
    "parallel market ETB",
    "Ethiopian dollar rate",
    "unofficial ETB rate",
    "ETB market rates",
    "alternative exchange rates Ethiopia",
    "USDT Ethiopia",
    "ETB currency market",
    "Ethiopian forex rates",
    "real ETB rate",
    "current Ethiopian dollar price",
    "ETB market analysis",
    "Ethiopian currency market",
    "ETB trading rate",
    "Ethiopian money exchange",
    "ETB rates",
    "ETB exchange",
  ],
  authors: [{ name: "Ethio Black" }],
  creator: "Ethio Black",
  publisher: "Your Organization",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "ETB Exchange Rates",
    description:
      "Real-time Ethiopian Birr (ETB) exchange rates against major currencies",
    type: "website",
    locale: "en_US",
    url: process.env.NEXT_PUBLIC_DOMAIN,
    siteName: "ETB Exchange Rates",
  },
  twitter: {
    card: "summary_large_image",
    title: "ETB Exchange Rates",
    description:
      "Real-time Ethiopian Birr (ETB) exchange rates against major currencies",
    creator: "@ethioblack",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  other: {
    "google-site-verification": process.env.GOOGLE_SITE_VERIFICATION_KEY!,
  },
  metadataBase: new URL(process.env.DOMAIN!),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <StructuredData />
        <CanonicalUrl path={"/"} />
        <SocialMeta
          title="ETB Exchange Rates | Official & Market Rates"
          description="Real-time Ethiopian Birr (ETB) exchange rates against major currencies. Track official and market rates with historical data."
        />
        <FaqSchema />
      </head>
      <body className={GeistSans.className}>
        <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GTM_ID!} />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="relative flex min-h-screen flex-col">
            <SiteHeader />
            <main className="flex-1">
              <div className="container py-10">
                <Breadcrumbs items={[{ title: "Home", href: "/" }]} />
                <ErrorBoundary>
                  {children}
                  <Toaster />
                </ErrorBoundary>
              </div>
            </main>
            <SiteFooter />
          </div>
        </ThemeProvider>
        <Analytics />
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID!} />
        <a
          title="Web Analytics"
          href={`https://clicky.com/${process.env.NEXT_PUBLIC_CLICKY_ID!}`}
        >
          <img
            alt="Clicky"
            src="//static.getclicky.com/media/links/badge.gif"
            width={80}
            height={20}
          />
        </a>
        <Script
          async
          data-id={process.env.NEXT_PUBLIC_CLICKY_ID!}
          src="//static.getclicky.com/js"
        />
        <FaqSchema />
        <Script
          async
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.NEXT_PUBLIC_ADSENSE_ID}`}
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
