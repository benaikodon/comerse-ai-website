import type React from "react"
import type { Metadata } from "next"
import { Work_Sans } from "next/font/google"
import "./globals.css"

const workSans = Work_Sans({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
  variable: "--font-work-sans",
})

export const metadata: Metadata = {
  title: "Comerse AI - AI-Powered Customer Support for Ecommerce",
  description:
    "Seamless and exceptional customer service powered by Commerce AI. Resolve 80% of queries instantly, reduce costs by 50%, and boost satisfaction by 20%.",
  keywords: "AI customer support, ecommerce automation, chatbot, customer service, AI assistant",
  authors: [{ name: "Comerse AI Team" }],
  openGraph: {
    title: "Comerse AI - AI-Powered Customer Support",
    description: "Seamless and exceptional customer service powered by Commerce AI",
    url: process.env.NEXT_PUBLIC_SITE_URL,
    siteName: "Comerse AI",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Comerse AI - AI Customer Support",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Comerse AI - AI-Powered Customer Support",
    description: "Seamless and exceptional customer service powered by Commerce AI",
    images: ["/og-image.png"],
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
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${workSans.variable} dark`}>
      <body className={`${workSans.className} font-sans bg-background text-foreground min-h-screen`}>{children}</body>
    </html>
  )
}
