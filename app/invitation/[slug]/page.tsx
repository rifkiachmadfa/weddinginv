import prisma from "@/lib/db";
import { notFound } from "next/navigation";
import InvitationClient from "@/app/InvitationPageClient";
import { weddingData } from "@/config/weddingData";

import type { Metadata } from "next";

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // ambil data guest berdasarkan slug jika perlu personalisasi
  return {
    title: "Undangan Pernikahan Rifki & Ayu",
    description: "Dengan memohon rahmat dan ridho Allah SWT, kami mengundang Anda untuk hadir di hari bahagia kami.",
    openGraph: {
      title: "Undangan Pernikahan Rifki & Ayu 💍",
      description: "Dengan memohon rahmat dan ridho Allah SWT, kami mengundang Anda untuk hadir di hari bahagia kami.",
      url: `https://weddinginv-w7x9.vercel.app/invitation/${params.slug}`,
      siteName: "Undangan Rifki & Ayu",
      images: [
        {
          url: "https://weddinginv-w7x9.vercel.app/thumbnail.png", // ← foto/banner pernikahan
          width: 1080,
          height: 1080,
          alt: "Undangan Pernikahan Rifki & Ayu",
        },
      ],
      type: "website",
      locale: "id_ID",
    },
  };
}

export default async function GuestInvitationPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; // ← await params
  const guest = await prisma.guest.findUnique({ where: { slug } });
  if (!guest) notFound();

  return <InvitationClient guestName={guest.name} data={weddingData} />;
}