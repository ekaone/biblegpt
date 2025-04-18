import type { Metadata } from "next";
import { Geist, Geist_Mono, Sour_Gummy } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const sourGummy = Sour_Gummy({
  variable: "--font-sour-gummy",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "BibleGPT",
    template: "%s | BibleGPT",
  },
  description:
    "An AI-powered Bible study assistant that helps you explore and understand the scriptures better.",
  keywords: [
    "Bible",
    "AI",
    "Bible Study",
    "Scripture",
    "Christian",
    "Religion",
  ],
  authors: [{ name: "Eka Prasetia" }],
  creator: "Eka Prasetia",
  publisher: "BibleGPT",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://biblegpt.prasetia.me"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "BibleGPT - AI Bible Study Assistant",
    description:
      "An AI-powered Bible study assistant that helps you explore and understand the scriptures better.",
    url: "https://biblegpt.prasetia.me",
    siteName: "BibleGPT",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "BibleGPT - AI Bible Study Assistant",
    description:
      "An AI-powered Bible study assistant that helps you explore and understand the scriptures better.",
    creator: "@twekaone",
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
  verification: {
    google: "google-site-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${sourGummy.variable} antialiased`}>{children}</body>
    </html>
  );
}
