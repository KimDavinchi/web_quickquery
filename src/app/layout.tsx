import { Analytics } from "@vercel/analytics/react";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import GoogleAdsense from "@/components/GoogleAdsense";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "QuickQuery - Developer SQL & Data Tools",
    template: "%s | QuickQuery",
  },
  description: "Free developer productivity tools: SQL In-Clause Generator, CRUD Builder, C# Model Mapper, and Query Interpolator. Boost your coding speed.",
  keywords: ["QuickQuery", "SQL Builder", "In-Clause Generator", "CRUD Generator", "Model Mapper", "Query Interpolator", "Developer Tools", "SQL Tools"],
  openGraph: {
    title: "QuickQuery - Developer SQL & Data Tools",
    description: "Boost your productivity with minimal, fast developer tools. SQL, CRUD, Mapper, and more.",
    type: "website",
  },
  other: {
    "google-adsense-account": "ca-pub-4402129586982373",
  },
  verification: {
    google: "umt5Iok0dtTNiSEjZT9ewEylylMjxo2VY6-5plIRE_I",
  },
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
        {children}
        <GoogleAdsense pId={process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_ID || ""} />
        <Analytics />
      </body>
    </html>
  );
}
