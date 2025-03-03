import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Bitunix-shorten | URL Shortener with Automatic UTM Generator",
  description:
    "Bitunix-shorten simplifies your marketing campaigns with URL shortening & automatic UTM generation. Track clicks, create QR codes, and optimize conversions effortlessly.",
  keywords: [
    "URL shortener",
    "UTM generator",
    "UTM builder",
    "link tracking",
    "marketing campaign",
    "QR code generator",
    "short links",
    "analytics tracking",
    "campaign tracking",
    "traffic source monitoring",
  ],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-video-preview": -1,
      "max-snippet": -1,
    },
  },
  authors: [{ name: "Bitunix-shorten Team" }],
  creator: "Bitunix-shorten",
  publisher: "Bitunix-shorten",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://Bitunix-shorten.com",
    title: "Bitunix-shorten - URL Shortening with UTM Generator",
    description:
      "Optimize your marketing campaigns with Bitunix-shorten. URL shortening, automatic UTM generation, click tracking, and QR codes to boost conversions.",
    siteName: "Bitunix-shorten",
    images: [
      {
        url: "https://Bitunix-shorten.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Bitunix-shorten - URL Shortener & UTM Generator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Bitunix-shorten - URL Shortener with UTM Generator",
    description:
      "Optimize your marketing campaigns with URL shortening & automatic UTM generation. Track clicks, create QR codes, and boost conversions.",
    images: ["https://Bitunix-shorten.com/twitter-image.jpg"],
    creator: "@Bitunix-shorten",
    site: "@Bitunix-shorten",
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
    other: [
      {
        rel: "mask-icon",
        url: "/safari-pinned-tab.svg",
        color: "#5bbad5",
      },
    ],
  },
  manifest: "https://Bitunix-shorten.com/site.webmanifest",
  alternates: {
    canonical: "https://Bitunix-shorten.com",
    languages: {
      "en-US": "https://Bitunix-shorten.com/en",
      "id-ID": "https://Bitunix-shorten.com/id",
    },
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  },
  verification: {
    google: "google-site-verification-code",
    yandex: "yandex-verification-code",
    yahoo: "yahoo-verification-code",
    other: {
      me: [
        "contact@Bitunix-shorten.com",
        "https://Bitunix-shorten.com/contact",
      ],
    },
  },
  category: "Technology",
  metadataBase: new URL("https://Bitunix-shorten.com"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SidebarProvider>
          <AppSidebar />
          <main className="w-full">
            <SidebarTrigger />
            <div className="p-3 w-6xl mx-auto">{children}</div>
          </main>
        </SidebarProvider>
      </body>
    </html>
  );
}
