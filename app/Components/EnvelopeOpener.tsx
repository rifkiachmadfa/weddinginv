"use client";

import { useScrollReveal } from "../hooks/useScrollReveal";

interface Props {
  data: {
    groom: { name: string; fullName: string; photo: string; father: string; mother: string; instagram: string };
    bride: { name: string; fullName: string; photo: string; father: string; mother: string; instagram: string };
    coupleImage: string;
  };
}

export default function CoupleSection({ data }: Props) {
  const { ref, inView } = useScrollReveal();

  return (
    <section className="py-20 px-6 bg-[#f4f1de] relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <PatternBg />
      </div>

      <div
        ref={ref}
        className={`max-w-4xl mx-auto transition-all duration-1000 ${
          inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        {/* Section title */}
        <div className="text-center mb-16">
          <p className="text-[#3d405b] text-xs tracking-[0.4em] uppercase opacity-60 mb-3">
            Bismillahirrahmanirrahim
          </p>
          <h2 className="font-bright-dusty text-4xl md:text-5xl text-[#3d405b] mb-4">
            Bersatu dalam Ikatan Suci
          </h2>
          <div className="flex items-center justify-center gap-3">
            <div className="h-px w-16 bg-[#f2cc8f]" />
            <div className="w-1.5 h-1.5 rounded-full bg-[#f2cc8f]" />
            <div className="h-px w-16 bg-[#f2cc8f]" />
          </div>
        </div>

        {/* Couple photo */}
        <div className="flex justify-center mb-16">
          <div className="relative">
            <div className="w-64 h-80 md:w-80 md:h-96 overflow-hidden rounded-sm border-4 border-[#f4f1de] shadow-2xl">
              <img
                src={data.coupleImage}
                alt="Couple"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
            {/* Gold frame decoration */}
            <div className="absolute -top-3 -left-3 w-full h-full border border-[#f2cc8f] rounded-sm opacity-60" />
            <div className="absolute -bottom-3 -right-3 w-full h-full border border-[#f2cc8f] rounded-sm opacity-30" />
          </div>
        </div>

        {/* Groom & Bride */}
        <div className="grid md:grid-cols-3 gap-8 items-center">
          {/* Groom */}
          <PersonCard person={data.groom} side="right" />

          {/* Ampersand */}
          <div className="text-center">
            <p className="font-bright-dusty text-8xl text-[#f2cc8f] leading-none">&</p>
          </div>

          {/* Bride */}
          <PersonCard person={data.bride} side="left" />
        </div>
      </div>
    </section>
  );
}

function PersonCard({
  person,
  side,
}: {
  person: { name: string; fullName: string; photo: string; father: string; mother: string; instagram: string };
  side: "left" | "right";
}) {
  return (
    <div className={`text-center ${side === "right" ? "md:text-right" : "md:text-left"}`}>
      <div className="flex justify-center mb-4">
        <div className="w-28 h-28 rounded-full overflow-hidden border-2 border-[#f2cc8f] shadow-lg">
          <img src={person.photo} alt={person.name} className="w-full h-full object-cover" />
        </div>
      </div>
      <h3 className="font-bright-dusty text-3xl text-[#3d405b] mb-1">{person.name}</h3>
      <p className="text-[#3d405b] text-xs opacity-60 mb-3 tracking-wide">{person.fullName}</p>
      <div className="space-y-1">
        <p className="text-[#3d405b] text-sm opacity-70">Putra/Putri dari</p>
        <p className="text-[#3d405b] text-sm font-medium">{person.father}</p>
        <p className="text-[#3d405b] text-sm font-medium">{person.mother}</p>
      </div>
      <p className="text-[#f2cc8f] text-xs mt-3 opacity-80">{person.instagram}</p>
    </div>
  );
}

function PatternBg() {
  return (
    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="floral" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
          <circle cx="30" cy="30" r="1" fill="#3d405b" />
          {[0, 60, 120, 180, 240, 300].map((deg, i) => (
            <ellipse
              key={i}
              cx="30"
              cy="30"
              rx="1"
              ry="5"
              fill="#3d405b"
              transform={`rotate(${deg} 30 30) translate(0, -7)`}
            />
          ))}
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#floral)" />
    </svg>
  );
}