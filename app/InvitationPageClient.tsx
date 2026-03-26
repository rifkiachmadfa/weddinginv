"use client";

import { useState } from "react";
import { StaticImageData } from "next/image";
import HeroSection from "@/app/Components/HeroSection";
import CoupleSection from "@/app/Components/CoupleSection";
import EventSection from "@/app/Components/EventSection";
import DressCodeSection from "@/app/Components/DressCodeSection";
import GiftSection from "@/app/Components/GiftSection";
import ClosingSection from "@/app/Components/ClosingSection";
import CountdownSection from "@/app/Components/CountDownSection";
import EnvelopeOpener from "@/app/Components/EnvelopeOpener";
import QuotesSection from "@/app/Components/QuotesSection";
import WishesSection from "@/app/Components/WishesSection";

interface WeddingData {
    heroImage: string | StaticImageData;
    groom: {
      name: string;
      fullName: string;
      photo: string;
      father: string;
      mother: string;
      instagram: string;
    };
    bride: {
      name: string;
      fullName: string;
      photo: string;
      father: string;
      mother: string;
      instagram: string;
    };
    weddingDate: string;
    akad: {
      day: string;
      date: string;
      time: string;
      venue: string;
      address: string;
    };
    resepsi: {
      day: string;
      date: string;
      time: string;
      venue: string;
      address: string;
    };
    googleMapsEmbed: string;
    googleMapsUrl: string;
    dressCode: {
      theme: string;
      description: string;
      avoidColors: string[];
      male: string;
      female: string;
    };
    gift: {
      address: string;
      contactPerson: string;
      contactPhone: string;
      bankAccounts: {
        bank: string;
        accountNumber: string;
        accountName: string;
      }[];
    };
    closing: {
      quote: string;
      quoteSource: string;
      message: string;
    };
    rsvpWhatsApp: string;
  }

interface Props {
  guestName: string;
  data: WeddingData;
}

export default function InvitationPageClient({ guestName, data }: Props) {
  const [opened, setOpened] = useState(false);

  return (
    <main className="min-h-screen bg-[#f4f1de] overflow-x-hidden">
      {!opened && (
        <EnvelopeOpener guestName={guestName} onOpen={() => setOpened(true)} />
      )}
      <HeroSection guestName={guestName} data={data} />
      <QuotesSection />
      <CoupleSection data={data} />
      <CountdownSection targetDate={data.weddingDate} />
      <EventSection data={data} />
      <DressCodeSection data={data} />
      <GiftSection data={data} />
      <WishesSection data={data} guestName={guestName} />
      <ClosingSection data={data} />
    </main>
  );
}