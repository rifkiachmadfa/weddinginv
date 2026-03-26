import prisma from "@/lib/db";
import { notFound } from "next/navigation";
import InvitationClient from "@/app/InvitationPageClient";
import { weddingData } from "@/config/weddingData";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; // ← await params
  const guest = await prisma.guest.findUnique({ where: { slug } });
  if (!guest) return { title: "Undangan tidak ditemukan" };
  return {
    title: `Undangan untuk ${guest.name} — Rifki & Ayu`,
    description: `Kami mengundang ${guest.name} untuk hadir di pernikahan Rifki & Ayu`,
  };
}

export default async function GuestInvitationPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; // ← await params
  const guest = await prisma.guest.findUnique({ where: { slug } });
  if (!guest) notFound();

  return <InvitationClient guestName={guest.name} data={weddingData} />;
}