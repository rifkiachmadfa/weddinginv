"use client";

import { useScrollReveal } from "../hooks/useScrollReveal";

interface Props {
  data: {
    groom: { name: string };
    bride: { name: string };
    closing: { quote: string; quoteSource: string; message: string };
  };
}

export default function ClosingSection({ data }: Props) {
  const { ref, inView } = useScrollReveal();

  return (
    <section className="relative py-24 px-6 bg-[#3d405b] overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0"
          style={{
            backgroundImage: "radial-gradient(circle at 2px 2px, #f2cc8f 1px, transparent 0)",
            backgroundSize: "32px 32px",
          }}
        />
      </div>
      {/* Top border line */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#f2cc8f] to-transparent opacity-30" />

      <div
        ref={ref}
        className={`relative z-10 max-w-xl mx-auto text-center transition-all duration-1000 ${
          inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        {/* Floral ornament */}
        <div className="flex justify-center mb-8">
          <svg width="100" height="100" viewBox="0 0 100 100" fill="none">
            {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg, i) => (
              <ellipse
                key={i}
                cx="50"
                cy="50"
                rx="3"
                ry="18"
                fill="#f2cc8f"
                opacity={i % 2 === 0 ? "0.6" : "0.3"}
                transform={`rotate(${deg} 50 50) translate(0, -20)`}
              />
            ))}
            <circle cx="50" cy="50" r="6" fill="#f2cc8f" opacity="0.8" />
          </svg>
        </div>

        {/* Ayat */}
        <blockquote className="mb-8">
          <p className="text-[#f4f1de] text-sm leading-loose opacity-70 italic mb-3 font-light">
            "{data.closing.quote}"
          </p>
          <cite className="text-[#f2cc8f] text-xs tracking-widest not-italic">
            {data.closing.quoteSource}
          </cite>
        </blockquote>

        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="h-px w-12 bg-[#f2cc8f] opacity-40" />
          <div className="w-1 h-1 rounded-full bg-[#f2cc8f] opacity-40" />
          <div className="h-px w-12 bg-[#f2cc8f] opacity-40" />
        </div>

        <p className="text-[#f4f1de] text-sm leading-relaxed opacity-60 mb-10">
          {data.closing.message}
        </p>

        {/* Wassalam */}
        <p className="text-[#f2cc8f] text-sm tracking-[0.3em] uppercase mb-6 opacity-80">
          Wassalamu'alaikum Warahmatullahi Wabarakatuh
        </p>

        <div className="mb-8">
          <p className="text-[#f4f1de] opacity-50 text-xs mb-3 tracking-widest uppercase">
            Dengan Penuh Cinta
          </p>
          <h2 className="font-bright-dusty text-5xl text-[#f4f1de]">
            {data.groom.name}
          </h2>
          <p className="text-[#f2cc8f] text-xl my-1">&</p>
          <h2 className="font-bright-dusty text-5xl text-[#f4f1de]">
            {data.bride.name}
          </h2>
        </div>

        {/* Footer */}
        <div className="mt-12 pt-8 border-t border-[#f2cc8f] border-opacity-15">
          <p className="text-[#f4f1de] opacity-25 text-xs tracking-widest">
            Made with ♥ · 2025
          </p>
        </div>
      </div>
    </section>
  );
}