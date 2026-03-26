"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import { weddingData } from "../config/weddingData";
import HeroSection from "./Components/HeroSection";
import CoupleSection from "./Components/CoupleSection";
import EventSection from "./Components/EventSection";
import DressCodeSection from "./Components/DressCodeSection";
import GiftSection from "./Components/GiftSection";
import ClosingSection from "./Components/ClosingSection";
// import RSVPSection from "./Components/Rsvpsection";
import CountdownSection from "./Components/CountDownSection";
import EnvelopeOpener from "./Components/EnvelopeOpener";
// import FloralDivider from "./components/FloralDivider";
import QuotesSection from "./Components/QuotesSection";
import WishesSection from "./Components/WishesSection";

function InvitationContent() {
  const searchParams = useSearchParams();
  const guestName = searchParams.get("to") || "Tamu Undangan";

  const [opened, setOpened] = useState(false);

  
  return (
    <main className="min-h-screen bg-[#f4f1de] overflow-x-hidden">

        {!opened && <EnvelopeOpener guestName={guestName} onOpen={() => setOpened(true)} />}
        
        <HeroSection guestName={guestName} data={weddingData} />
        <QuotesSection/>
        <CoupleSection data={weddingData} />
        <CountdownSection targetDate={weddingData.weddingDate} />
        <EventSection data={weddingData} />
        <DressCodeSection data={weddingData} />
        <GiftSection data={weddingData} />
        <WishesSection data={weddingData} guestName={guestName} />
        <ClosingSection data={weddingData} />
    </main>
  );
}

export default function InvitationPage() {
  return (
    <Suspense>
      <InvitationContent />
    </Suspense>
  );
}