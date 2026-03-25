"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { weddingData } from "../config/weddingData";
import HeroSection from "./Components/HeroSection";
// import CoupleSection from "./components/CoupleSection";
// import EventSection from "./components/EventSection";
// import MapSection from "./components/MapSection";
// import DressCodeSection from "./components/DressCodeSection";
// import GiftSection from "./components/GiftSection";
// import ClosingSection from "./components/ClosingSection";
// import RSVPSection from "./Components/Rsvpsection";
// import CountdownSection from "./components/CountdownSection";
// import EnvelopeOpener from "./components/EnvelopeOpener";
// import FloralDivider from "./components/FloralDivider";

function InvitationContent() {
  const searchParams = useSearchParams();
  const guestName = searchParams.get("to") || "Tamu Undangan";
  // const [opened, setOpened] = useState(false);

  // useEffect(() => {
  //   if (opened) {
  //     document.body.style.overflow = "auto";
  //   } else {
  //     document.body.style.overflow = "hidden";
  //   }
  //   return () => {
  //     document.body.style.overflow = "auto";
  //   };
  // }, [opened]);

  return (
    <main className="min-h-screen bg-[#f4f1de] overflow-x-hidden">
      {/* {!opened && <EnvelopeOpener guestName={guestName} onOpen={() => setOpened(true)} />} */}

      <div
        // className={`transition-all duration-1000 ${opened ? "opacity-100" : "opacity-0 pointer-events-none"}`}
      >
        <HeroSection guestName={guestName} data={weddingData} />
        {/* <FloralDivider />
        <CoupleSection data={weddingData} />
        <FloralDivider flip />
        <CountdownSection targetDate={weddingData.weddingDate} />
        <EventSection data={weddingData} />
        <MapSection data={weddingData} />
        <FloralDivider />
        <DressCodeSection data={weddingData} />
        <FloralDivider flip />
        <GiftSection data={weddingData} />
        <RSVPSection data={weddingData} guestName={guestName} />
        <ClosingSection data={weddingData} /> */}
      </div>
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