"use client";

import { motion, type Variants } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, MapPin, ExternalLink, Car } from "lucide-react";

interface Props {
  data: {
    akad: { day: string; date: string; time: string; venue: string; address: string };
    resepsi: { day: string; date: string; time: string; venue: string; address: string };
    googleMapsEmbed: string;
    googleMapsUrl: string;
  };
}

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const parkingSpots = [
  {
    name: "Ex Amora Cafe",
    note: "Otomatis diarahkan koordinator parkir Kamara",
    mapsUrl: "https://maps.app.goo.gl/exAmora",
  },
  {
    name: "Masjid Agung Sumedang",
    note: "Area parkir luas",
    mapsUrl: "https://maps.app.goo.gl/masjidAgung",
  },
  {
    name: "TAHURA Gunung Kunci",
    note: "Alternatif parkir terdekat",
    mapsUrl: "https://maps.app.goo.gl/taHura",
  },
];

function EventCard({
  type,
  event,
  icon,
}: {
  type: string;
  event: { day: string; date: string; time: string; venue: string; address: string };
  icon: React.ReactNode;
}) {
  return (
    <motion.div variants={fadeUp} transition={{ duration: 0.7, ease: "easeOut" }}>
      <Card className="bg-transparent border-[#3d405b]/15 rounded-2xl shadow-none h-full">
        <CardContent className="p-8 flex flex-col gap-6 relative">
          <div className="absolute top-3 left-3 w-5 h-5 border-t border-l border-[#3d405b]/20" />
          <div className="absolute top-3 right-3 w-5 h-5 border-t border-r border-[#3d405b]/20" />
          <div className="absolute bottom-3 left-3 w-5 h-5 border-b border-l border-[#3d405b]/20" />
          <div className="absolute bottom-3 right-3 w-5 h-5 border-b border-r border-[#3d405b]/20" />

          <div className="text-center">
            <div className="flex justify-center mb-3 text-[#3d405b]/40">
              {icon}
            </div>
            <p className="text-[#3d405b]/40 text-[10px] tracking-[0.5em] uppercase mb-1">
              Rangkaian Acara
            </p>
            <h3 className="font-bright-dusty text-3xl text-[#3d405b]">{type}</h3>
          </div>

          <Separator className="bg-[#3d405b]/10" />

          <div className="flex flex-col gap-5">
            <div className="flex items-start gap-3">
              <Calendar className="w-4 h-4 text-[#3d405b]/40 mt-0.5 shrink-0" />
              <div>
                <p className="text-[#3d405b]/40 text-[10px] tracking-[0.4em] uppercase mb-0.5">
                  Hari & Tanggal
                </p>
                <p className="text-[#3d405b] text-sm font-medium">
                  {event.day}, {event.date}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Clock className="w-4 h-4 text-[#3d405b]/40 mt-0.5 shrink-0" />
              <div>
                <p className="text-[#3d405b]/40 text-[10px] tracking-[0.4em] uppercase mb-0.5">
                  Waktu
                </p>
                <p className="text-[#3d405b] text-sm font-medium">{event.time}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <MapPin className="w-4 h-4 text-[#3d405b]/40 mt-0.5 shrink-0" />
              <div>
                <p className="text-[#3d405b]/40 text-[10px] tracking-[0.4em] uppercase mb-0.5">
                  Tempat
                </p>
                <p className="text-[#3d405b] text-sm font-medium">{event.venue}</p>
                <p className="text-[#3d405b]/50 text-xs mt-1 leading-relaxed">
                  {event.address}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export default function EventSection({ data }: Props) {
  return (
    <section className="py-24 px-6 bg-[#f4f1de] overflow-hidden">
      <motion.div
        className="max-w-4xl mx-auto"
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0 }}
      >
        {/* Header */}
        <motion.div variants={fadeUp} transition={{ duration: 0.7, ease: "easeOut" }} className="text-center mb-14">
          <p className="text-[#3d405b]/40 text-[10px] tracking-[0.6em] uppercase mb-3">
            Rangkaian Acara
          </p>
          <h2 className="font-bright-dusty text-5xl md:text-6xl text-[#3d405b]">
            Waktu & Tempat
          </h2>
          <div className="flex items-center gap-3 justify-center mt-5">
            <div className="h-px w-12 bg-[#3d405b]/15" />
            <div className="w-1 h-1 rounded-full bg-[#3d405b]/30" />
            <div className="h-px w-24 bg-[#3d405b]/15" />
            <div className="w-1 h-1 rounded-full bg-[#3d405b]/30" />
            <div className="h-px w-12 bg-[#3d405b]/15" />
          </div>
        </motion.div>

        {/* Event Cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <EventCard
            type="Akad Nikah"
            event={data.akad}
            icon={
              <svg width="28" height="28" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="11" cy="16" r="7" />
                <circle cx="21" cy="16" r="7" />
              </svg>
            }
          />
          <EventCard
            type="Resepsi"
            event={data.resepsi}
            icon={
              <svg width="28" height="28" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M16 4 L19 13 L28 13 L21 19 L24 28 L16 22 L8 28 L11 19 L4 13 L13 13 Z" />
              </svg>
            }
          />
        </div>

        {/* Map */}
        <motion.div variants={fadeUp} transition={{ duration: 0.7, ease: "easeOut" }} className="rounded-2xl overflow-hidden border border-[#3d405b]/10 shadow-sm mb-12">
          <iframe
            src={data.googleMapsEmbed}
            width="100%"
            height="400"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full"
          />
          <div className="bg-white/60 backdrop-blur-sm px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#3d405b]/50" />
              <p className="text-[#3d405b]/60 text-xs tracking-wide">
                {data.akad.venue} — {data.akad.address}
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="border-[#3d405b]/20 text-[#3d405b]/60 hover:text-[#3d405b] hover:border-[#3d405b]/40 bg-transparent rounded-full text-xs tracking-widest gap-2"
              onClick={() => window.open(data.googleMapsUrl, "_blank")}
            >
              Buka Maps
              <ExternalLink className="w-3 h-3" />
            </Button>
          </div>
        </motion.div>

        {/* Parking Section */}
        <motion.div variants={fadeUp} transition={{ duration: 0.7, ease: "easeOut" }} className="space-y-6">
          <div className="text-center space-y-2">
            <div className="flex items-center justify-center gap-2 text-[#3d405b]/40">
              <Car className="w-4 h-4" />
              <p className="text-[10px] tracking-[0.5em] uppercase">Rekomendasi Parkir</p>
            </div>
            <p className="text-[#3d405b]/40 text-xs">
              Beberapa pilihan area parkir terdekat dari lokasi acara
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {parkingSpots.map((spot) => (
              <Card
                key={spot.name}
                className="bg-transparent border-[#3d405b]/15 rounded-2xl shadow-none hover:border-[#3d405b]/30 transition-colors duration-200"
              >
                <CardContent className="p-6 flex flex-col gap-4 relative">
                  <div className="absolute top-2 left-2 w-4 h-4 border-t border-l border-[#3d405b]/15" />
                  <div className="absolute top-2 right-2 w-4 h-4 border-t border-r border-[#3d405b]/15" />
                  <div className="absolute bottom-2 left-2 w-4 h-4 border-b border-l border-[#3d405b]/15" />
                  <div className="absolute bottom-2 right-2 w-4 h-4 border-b border-r border-[#3d405b]/15" />

                  <div className="flex justify-center text-[#3d405b]/30">
                    <Car className="w-6 h-6" />
                  </div>

                  <div className="text-center space-y-1">
                    <p className="text-[#3d405b] text-sm font-medium leading-snug">
                      {spot.name}
                    </p>
                    <p className="text-[#3d405b]/45 text-[11px] leading-relaxed">
                      {spot.note}
                    </p>
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    className="border-[#3d405b]/20 text-[#3d405b]/60 hover:text-[#3d405b] hover:border-[#3d405b]/40 bg-transparent rounded-full text-[10px] tracking-widest gap-1.5 w-full"
                    onClick={() => window.open(spot.mapsUrl, "_blank")}
                  >
                    <MapPin className="w-3 h-3" />
                    Lihat Lokasi
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.div>

      </motion.div>
    </section>
  );
}