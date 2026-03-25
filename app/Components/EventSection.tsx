"use client";

import { useScrollReveal } from "../hooks/useScrollReveal";

interface Props {
  data: {
    akad: { day: string; date: string; time: string; venue: string; address: string };
    resepsi: { day: string; date: string; time: string; venue: string; address: string };
  };
}

export default function EventSection({ data }: Props) {
  const { ref, inView } = useScrollReveal();

  return (
    <section className="py-20 px-6 bg-[#f4f1de]">
      <div
        ref={ref}
        className={`max-w-3xl mx-auto transition-all duration-1000 ${
          inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <div className="text-center mb-14">
          <p className="text-[#3d405b] text-xs tracking-[0.4em] uppercase opacity-60 mb-3">
            Rangkaian Acara
          </p>
          <h2 className="font-bright-dusty text-4xl md:text-5xl text-[#3d405b]">
            Waktu & Tempat
          </h2>
          <div className="flex items-center justify-center gap-3 mt-4">
            <div className="h-px w-16 bg-[#f2cc8f]" />
            <LotusIcon />
            <div className="h-px w-16 bg-[#f2cc8f]" />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <EventCard
            type="Akad Nikah"
            icon={<RingIcon />}
            event={data.akad}
            delay={0}
            inView={inView}
          />
          <EventCard
            type="Resepsi"
            icon={<CelebrationIcon />}
            event={data.resepsi}
            delay={150}
            inView={inView}
          />
        </div>
      </div>
    </section>
  );
}

function EventCard({
  type,
  icon,
  event,
  delay,
  inView,
}: {
  type: string;
  icon: React.ReactNode;
  event: { day: string; date: string; time: string; venue: string; address: string };
  delay: number;
  inView: boolean;
}) {
  return (
    <div
      className={`relative border border-[#3d405b] border-opacity-15 p-8 text-center transition-all duration-1000 group hover:shadow-lg hover:-translate-y-1`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {/* Corner decorations */}
      <div className="absolute top-2 left-2 w-4 h-4 border-t border-l border-[#f2cc8f] opacity-60" />
      <div className="absolute top-2 right-2 w-4 h-4 border-t border-r border-[#f2cc8f] opacity-60" />
      <div className="absolute bottom-2 left-2 w-4 h-4 border-b border-l border-[#f2cc8f] opacity-60" />
      <div className="absolute bottom-2 right-2 w-4 h-4 border-b border-r border-[#f2cc8f] opacity-60" />

      <div className="flex justify-center mb-4 text-[#f2cc8f]">{icon}</div>

      <h3 className="font-bright-dusty text-2xl text-[#3d405b] mb-5">{type}</h3>

      <div className="space-y-3">
        <div>
          <p className="text-[#3d405b] text-xs tracking-widest uppercase opacity-50 mb-1">Hari & Tanggal</p>
          <p className="text-[#3d405b] font-medium">
            {event.day}, {event.date}
          </p>
        </div>
        <div className="w-8 h-px bg-[#f2cc8f] mx-auto opacity-60" />
        <div>
          <p className="text-[#3d405b] text-xs tracking-widest uppercase opacity-50 mb-1">Waktu</p>
          <p className="text-[#3d405b] font-medium">{event.time}</p>
        </div>
        <div className="w-8 h-px bg-[#f2cc8f] mx-auto opacity-60" />
        <div>
          <p className="text-[#3d405b] text-xs tracking-widest uppercase opacity-50 mb-1">Tempat</p>
          <p className="text-[#3d405b] font-medium">{event.venue}</p>
          <p className="text-[#3d405b] text-sm opacity-60 mt-1">{event.address}</p>
        </div>
      </div>
    </div>
  );
}

function LotusIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <circle cx="8" cy="8" r="2" fill="#f2cc8f" />
      {[0, 45, 90, 135, 180, 225, 270, 315].map((deg, i) => (
        <ellipse
          key={i}
          cx="8"
          cy="8"
          rx="1"
          ry="4"
          fill="#f2cc8f"
          opacity="0.7"
          transform={`rotate(${deg} 8 8) translate(0, -5)`}
        />
      ))}
    </svg>
  );
}

function RingIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="11" cy="16" r="7" />
      <circle cx="21" cy="16" r="7" />
    </svg>
  );
}

function CelebrationIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M16 4 L19 13 L28 13 L21 19 L24 28 L16 22 L8 28 L11 19 L4 13 L13 13 Z" />
    </svg>
  );
}