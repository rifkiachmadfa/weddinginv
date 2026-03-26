import type { Metadata } from "next";
import "./globals.css";
import localFont from "next/font/local";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";
import { Amiri } from "next/font/google";
const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const brightDusty = localFont({
  src: "../font/Bright-Dusty.otf",
});

const amiri = Amiri({
  subsets: ["arabic"],
  weight: ["400", "700"],
  variable: "--font-amiri",
});

export const metadata: Metadata = {
  title: "Undangan Pernikahan Ayu & Rifki",
  description: "Kami dengan penuh kebahagiaan mengundang Anda untuk menyaksikan momen sakral pernikahan kami.",
  openGraph: {
    title: "Undangan Pernikahan Ayu & Rifki",
    description: "Sabtu, 4 April 2026 — Sumedang, Jawa Barat",
    images: [
      {
        url: "https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&h=630&fit=crop",
        width: 1200,
        height: 630,
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={cn("font-sans", geist.variable)}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className={`${brightDusty.className} ${amiri.variable}`}>{children}</body>
    </html>
  );
}