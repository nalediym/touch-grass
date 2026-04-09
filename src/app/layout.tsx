import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
  title: "Touch Grass — Get Rewarded for Going Outside",
  description:
    "Build streaks, earn points, and level up by logging your outdoor activities. The app that makes touching grass rewarding.",
  metadataBase: new URL("https://touch-grass-xi.vercel.app"),
  openGraph: {
    title: "Touch Grass",
    description: "Get rewarded for going outside. Build streaks, earn points, level up.",
    siteName: "Touch Grass",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Touch Grass",
    description: "Get rewarded for going outside. Build streaks, earn points, level up.",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Touch Grass",
  },
  other: {
    "mobile-web-app-capable": "yes",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
