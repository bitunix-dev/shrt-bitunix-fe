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
  title: "Bitunix-shorten | URL Shortener dengan UTM Generator Otomatis",
  description:
    "Bitunix-shorten menyederhanakan kampanye marketing Anda dengan URL shortener & generator UTM otomatis. Lacak klik, buat QR code, dan optimalkan konversi dengan mudah.",
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
    "traffic source tracking",
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
    locale: "id_ID",
    url: "https://Bitunix-shorten.com",
    title: "Bitunix-shorten - Pemendekan URL dengan UTM Generator",
    description:
      "Optimalkan kampanye marketing Anda dengan Bitunix-shorten. Pemendekan URL, generator UTM otomatis, pelacakan klik, dan QR code untuk meningkatkan konversi.",
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
    title: "Bitunix-shorten - URL Shortener dengan UTM Generator",
    description:
      "Optimalkan kampanye marketing Anda dengan URL shortener & UTM generator otomatis. Lacak klik, buat QR code, dan tingkatkan konversi.",
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
      "id-ID": "https://Bitunix-shorten.com/id",
      "en-US": "https://Bitunix-shorten.com/en",
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
      me: ["my-email@example.com", "https://example.com/me"],
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
