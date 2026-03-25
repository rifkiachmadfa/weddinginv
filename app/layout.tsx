import type { Metadata } from "next";
import "./globals.css";
import localFont from "next/font/local";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const brightDusty = localFont({
  src: "../font/Bright-Dusty.otf",
});

export const metadata: Metadata = {
  title: "Undangan Pernikahan Rizky & Anisa",
  description: "Kami dengan penuh kebahagiaan mengundang Anda untuk menyaksikan momen sakral pernikahan kami.",
  openGraph: {
    title: "Undangan Pernikahan Rizky & Anisa",
    description: "Sabtu, 14 Juni 2025 — Bandung, Jawa Barat",
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
      <body className={brightDusty.className}>{children}</body>
    </html>
  );
}