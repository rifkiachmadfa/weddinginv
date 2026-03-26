"use client";

import { useScrollReveal } from "../hooks/useScrollReveal.ts";

interface Props {
  data: {
    dressCode: {
      theme: string;
      description: string;
      avoidColors: string[];
      male: string;
      female: string;
    };
  };
}

const COLOR_SWATCHES = [
  { name: "Slate Grey", hex: "#8a9199" },
  { name: "Warm Ivory", hex: "#f5f0e8" },
  { name: "Soft Beige", hex: "#e0d5c5" },
  { name: "Ash", hex: "#b0b8bf" },
  { name: "Cream", hex: "#ede8de" },
];

export default function DressCodeSection({ data }: Props) {
  const { ref, inView } = useScrollReveal();

  return (
    <>
      <style>{`
        /* Stagger reveal for dresscode */
        .dc-stagger {
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.8s ease, transform 0.8s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .dc-in .dc-stagger-1 { transition-delay: 0.05s; opacity: 1; transform: translateY(0); }
        .dc-in .dc-stagger-2 { transition-delay: 0.18s; opacity: 1; transform: translateY(0); }
        .dc-in .dc-stagger-3 { transition-delay: 0.30s; opacity: 1; transform: translateY(0); }
        .dc-in .dc-stagger-4 { transition-delay: 0.44s; opacity: 1; transform: translateY(0); }
        .dc-in .dc-stagger-5 { transition-delay: 0.58s; opacity: 1; transform: translateY(0); }
        .dc-in .dc-stagger-6 { transition-delay: 0.72s; opacity: 1; transform: translateY(0); }

        /* Divider grow — same as HeroSection */
        @keyframes dc-lineGrow {
          from { transform: scaleX(0); }
          to   { transform: scaleX(1); }
        }
        .dc-in .dc-divider {
          animation: dc-lineGrow 1s ease forwards;
          animation-delay: 0.4s;
        }
        .dc-divider {
          transform: scaleX(0);
          transform-origin: center;
        }

        /* Swatch hover lift */
        .dc-swatch-item {
          transition: transform 0.3s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .dc-swatch-item:hover {
          transform: translateY(-4px);
        }

        /* Subtle pulse for avoid badge */
        .dc-avoid-badge {
          border: 1px solid rgba(61,64,91,0.25);
          color: rgba(61,64,91,0.65);
          font-size: 10px;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          padding: 4px 14px;
          border-radius: 9999px;
          background: transparent;
          transition: border-color 0.3s, color 0.3s;
        }
        .dc-avoid-badge:hover {
          border-color: rgba(61,64,91,0.55);
          color: rgba(61,64,91,0.9);
        }

        /* Gender card */
        .dc-gender-card {
          border: 1px solid rgba(61,64,91,0.12);
          border-radius: 2px;
          background: rgba(61,64,91,0.03);
          transition: background 0.3s, border-color 0.3s;
        }
        .dc-gender-card:hover {
          background: rgba(61,64,91,0.06);
          border-color: rgba(61,64,91,0.22);
        }
      `}</style>

      <section className="relative py-28 px-6 overflow-hidden bg-[#f4f1de]">

        {/* Top & bottom hairline dividers — same as HeroSection rhythm */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-px bg-[#3d405b] opacity-20" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-16 h-px bg-[#3d405b] opacity-20" />

        {/* Decorative corner diamond — echoes HeroSection's subtle ornaments */}
        <svg
          className="absolute top-10 left-10 opacity-[0.07] pointer-events-none"
          width="80" height="80" viewBox="0 0 80 80" fill="none"
        >
          <rect x="40" y="2" width="54" height="54" rx="1" transform="rotate(45 40 40)" stroke="#3d405b" strokeWidth="1"/>
          <rect x="40" y="12" width="38" height="38" rx="1" transform="rotate(45 40 40)" stroke="#3d405b" strokeWidth="0.5"/>
        </svg>
        <svg
          className="absolute bottom-10 right-10 opacity-[0.07] pointer-events-none"
          width="60" height="60" viewBox="0 0 60 60" fill="none"
        >
          <rect x="30" y="2" width="40" height="40" rx="1" transform="rotate(45 30 30)" stroke="#3d405b" strokeWidth="1"/>
        </svg>

        {/* Main content */}
        <div
          ref={ref}
          className={`dc-in-trigger relative z-10 max-w-2xl mx-auto text-center ${inView ? "dc-in" : ""}`}
        >

          {/* Label — same micro-typography as HeroSection */}
          <p className="dc-stagger dc-stagger-1 text-[#3d405b] text-[10px] tracking-[0.5em] uppercase mb-4 opacity-60">
            Dress Code
          </p>

          {/* Theme title — font-bright-dusty, same scale as HeroSection names */}
          <h2 className="dc-stagger dc-stagger-2 font-bright-dusty text-6xl md:text-7xl text-[#3d405b] leading-none mb-6">
            {data.dressCode.theme}
          </h2>

          {/* Divider — identical to HeroSection */}
          <div className="dc-divider dc-stagger dc-stagger-3 w-16 h-px bg-[#3d405b] opacity-30 mx-auto mb-6" />

          {/* Description */}
          <p className="dc-stagger dc-stagger-3 text-[#3d405b] opacity-60 text-sm leading-relaxed max-w-md mx-auto mb-14">
            {data.dressCode.description}
          </p>

          {/* Color swatches */}
          <div className="dc-stagger dc-stagger-4 flex justify-center gap-6 mb-10 flex-wrap">
            {COLOR_SWATCHES.map((color) => (
              <div key={color.name} className="dc-swatch-item flex flex-col items-center gap-2.5">
                <div
                  className="w-9 h-9 rounded-full shadow-sm"
                  style={{ backgroundColor: color.hex, border: "1px solid rgba(61,64,91,0.1)" }}
                />
                <p className="text-[#3d405b] opacity-50 text-[9px] tracking-[0.2em] uppercase w-14 text-center leading-tight">
                  {color.name}
                </p>
              </div>
            ))}
          </div>

          {/* Divider */}
          <div className="dc-divider dc-stagger dc-stagger-4 w-16 h-px bg-[#3d405b] opacity-30 mx-auto mb-10" />

          {/* Avoid colors */}
          <div className="dc-stagger dc-stagger-5 mb-14">
            <p className="text-[#3d405b] text-[10px] tracking-[0.5em] uppercase mb-5 opacity-60">
              Mohon Hindari Warna
            </p>
            <div className="flex justify-center gap-2 flex-wrap">
              {data.dressCode.avoidColors.map((c) => (
                <span key={c} className="dc-avoid-badge">{c}</span>
              ))}
            </div>
          </div>

        </div>
      </section>
    </>
  );
}