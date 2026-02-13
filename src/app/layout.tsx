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
    default: "QuickQuery - 개발자 쿼리 보조 도구",
    template: "%s | QuickQuery",
  },
  description: "개발자를 위한 쿼리 도움, SQL 생성, 모델 매핑, 쿼리 변환 도구 모음. 엑셀 IN절 변환, CRUD 쿼리 생성, C# 모델 매핑을 지원합니다.",
  keywords: ["QuickQuery", "쿼리 도움", "쿼리 보조", "SQL 생성", "개발자 도구", "In절 생성", "CRUD 생성", "쿼리 변환"],
  openGraph: {
    title: "QuickQuery - 쿼리 작성 및 변환 보조 도구",
    description: "개발자를 위한 쿼리 도움 및 생산성 향상 도구. 복잡한 SQL 작업을 쉽고 빠르게 해결하세요.",
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
      </body>
    </html>
  );
}
