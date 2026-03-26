"use client";

import { useScrollReveal } from "../hooks/useScrollReveal.ts";

interface Props {
  data: {
    googleMapsEmbed: string;
    googleMapsUrl: string;
    resepsi: { venue: string; address: string };
  };
}

export default function MapSection({ data }: Props) {
  const { ref, inView } = useScrollReveal();

  return (
    <section className="py-16 bg-[#3d405b] px-6">
      <div
        ref={ref}
        className={`max-w-3xl mx-auto transition-all duration-1000 ${
          inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <div className="text-center mb-10">
          <p className="text-[#f2cc8f] text-xs tracking-[0.4em] uppercase opacity-80 mb-3">Lokasi Acara</p>
          <h2 className="font-bright-dusty text-4xl text-[#f4f1de]">Temukan Kami Di Sini</h2>
          <p className="text-[#f4f1de] opacity-60 text-sm mt-3">{data.resepsi.address}</p>
        </div>

        {/* Map embed */}
        <div className="relative rounded-sm overflow-hidden shadow-2xl border border-[#f2cc8f] border-opacity-20">
          <iframe
            src={data.googleMapsEmbed}
            width="100%"
            height="350"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Lokasi Pernikahan"
            className="w-full"
          />
        </div>

        <div className="text-center mt-6">
          <a
            href={data.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 border border-[#f2cc8f] text-[#f2cc8f] text-sm tracking-widest uppercase hover:bg-[#f2cc8f] hover:text-[#3d405b] transition-all duration-300"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
            </svg>
            Buka di Google Maps
          </a>
        </div>
      </div>
    </section>
  );
}