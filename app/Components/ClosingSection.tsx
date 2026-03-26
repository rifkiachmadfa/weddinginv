"use client";

import { useEffect, useRef } from "react";
import { StaticImageData } from "next/image";
import Image from "next/image";

interface Props {
  data: {
    heroImage: string | StaticImageData;
    groom: { name: string; fullName: string };
    bride: { name: string; fullName: string };
    closing: {
      quote: string;
      quoteSource: string;
      message: string;
    };
    rsvpWhatsApp: string;
    akad: { date: string };
  };
}

export default function ClosingSection({ data }: Props) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll(".cls-reveal").forEach((el, i) => {
              setTimeout(() => {
                (el as HTMLElement).classList.add("cls-in");
              }, i * 120);
            });
          }
        });
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);


  return (
    <>
      <style>{`
        .cls-reveal {
          opacity: 0;
          transform: translateY(28px);
          transition: opacity 0.9s cubic-bezier(0.22, 1, 0.36, 1),
                      transform 0.9s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .cls-reveal.cls-in {
          opacity: 1;
          transform: translateY(0);
        }

        /* Divider line grow */
        .cls-line {
          transform: scaleX(0);
          transform-origin: center;
          transition: transform 1s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .cls-reveal.cls-in .cls-line,
        .cls-line.cls-in {
          transform: scaleX(1);
        }

        /* Floating decoration images */
        @keyframes clsFloatTop {
          0%, 100% { translate: 0 0; }
          50% { translate: 0 -16px; }
        }
        @keyframes clsFloatBottom {
          0%, 100% { translate: 0 0; }
          50% { translate: 0 16px; }
        }
        .cls-img-top { animation: clsFloatTop 7s ease-in-out infinite; }
        .cls-img-bottom { animation: clsFloatBottom 7s ease-in-out infinite; }

        /* WA button */
        .cls-wa-btn {
          position: relative;
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 14px 36px;
          border: 1px solid rgba(61,64,91,0.35);
          border-radius: 9999px;
          background: transparent;
          color: #3d405b;
          font-family: var(--font-amiri), serif;
          font-size: 12px;
          letter-spacing: 0.35em;
          text-transform: uppercase;
          cursor: pointer;
          transition: background 0.3s ease, border-color 0.3s ease, color 0.3s ease;
          text-decoration: none;
          overflow: hidden;
        }
        .cls-wa-btn::before {
          content: '';
          position: absolute;
          inset: 0;
          background: #3d405b;
          border-radius: 9999px;
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.4s cubic-bezier(0.22, 1, 0.36, 1);
          z-index: 0;
        }
        .cls-wa-btn:hover::before { transform: scaleX(1); }
        .cls-wa-btn:hover { color: #f4f1de; border-color: #3d405b; }
        .cls-wa-btn span, .cls-wa-btn svg { position: relative; z-index: 1; }

        /* Ornament ring spin */
        @keyframes clsRingSpin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .cls-ring { animation: clsRingSpin 40s linear infinite; }

        /* Grain */
        .cls-section::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E");
          pointer-events: none;
          opacity: 0.4;
        }
      `}</style>

      <section
        ref={sectionRef}
        className="cls-section relative min-h-screen bg-[#f4f1de] flex flex-col items-center justify-center overflow-hidden px-6 py-24"
      >
        {/* Vignette */}
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse at center, transparent 40%, rgba(61,64,91,0.07) 100%)" }} />

        {/* Top decorative image */}
        <div className="absolute -top-8 left-4 md:left-24 w-36 md:w-56 opacity-30 mix-blend-multiply -rotate-90">
          <div className="cls-img-top">
            <Image src={data.heroImage} alt="" width={400} height={400} className="scale-[2]" />
          </div>
        </div>

        {/* Bottom decorative image */}
        <div className="absolute -bottom-8 right-4 md:right-24 w-36 md:w-56 opacity-30 mix-blend-multiply rotate-90">
          <div className="cls-img-bottom">
            <Image src={data.heroImage} alt="" width={400} height={400} className="scale-[2]" />
          </div>
        </div>

        {/* Corner ornaments */}
        {[
          "absolute top-8 left-8",
          "absolute top-8 right-8 scale-x-[-1]",
          "absolute bottom-8 left-8 scale-y-[-1]",
          "absolute bottom-8 right-8 scale-[-1]",
        ].map((cls, i) => (
          <svg key={i} className={`${cls} w-16 h-16 opacity-15`} viewBox="0 0 80 80" fill="none">
            <path d="M4 4 L4 28" stroke="#3d405b" strokeWidth="0.8" strokeLinecap="round" />
            <path d="M4 4 L28 4" stroke="#3d405b" strokeWidth="0.8" strokeLinecap="round" />
            <circle cx="4" cy="4" r="2" fill="#3d405b" />
            <path d="M14 14 Q38 4 38 38 Q4 38 14 14Z" stroke="#3d405b" strokeWidth="0.6" fill="none" opacity="0.5" />
          </svg>
        ))}

        {/* ── Main content ── */}
        <div className="relative z-10 flex flex-col items-center text-center max-w-lg w-full gap-8">

          {/* Spinning ornament ring */}
          <div className="cls-reveal">
            <svg className="cls-ring w-14 h-14 opacity-20" viewBox="0 0 80 80" fill="none">
              <circle cx="40" cy="40" r="36" stroke="#3d405b" strokeWidth="0.7" strokeDasharray="4 6" />
              <circle cx="40" cy="40" r="28" stroke="#3d405b" strokeWidth="0.5" />
              {Array.from({ length: 12 }, (_, i) => {
                const a = (i / 12) * Math.PI * 2;
                return <circle key={i} cx={40 + Math.cos(a) * 28} cy={40 + Math.sin(a) * 28} r="1.2" fill="#3d405b" />;
              })}
            </svg>
          </div>

          {/* Label */}
          <div className="cls-reveal -mt-4">
            <p className="text-[#3d405b] opacity-55 tracking-[0.45em] uppercase"
              style={{ fontFamily: "var(--font-amiri), serif", fontSize: "11px" }}>
              Penutup
            </p>
          </div>

          {/* Divider */}
          <div className="cls-reveal w-full flex items-center gap-4">
            <div className="cls-line flex-1 h-px bg-[#3d405b] opacity-20" />
            <svg className="w-3 h-3 opacity-30 shrink-0" viewBox="0 0 12 12" fill="#3d405b">
              <path d="M6 0 L7.5 4.5 L12 6 L7.5 7.5 L6 12 L4.5 7.5 L0 6 L4.5 4.5Z" />
            </svg>
            <div className="cls-line flex-1 h-px bg-[#3d405b] opacity-20" />
          </div>

          {/* Couple names */}
          <div className="cls-reveal flex flex-col items-center gap-1">
            <p className="text-[#3d405b] opacity-45 tracking-[0.4em] uppercase"
              style={{ fontFamily: "var(--font-amiri), serif", fontSize: "11px" }}>
              Dengan penuh cinta
            </p>
            <div className="flex items-baseline gap-3 mt-2">
              <h2 className="text-[#3d405b] italic" style={{ fontSize: "clamp(32px, 8vw, 52px)", lineHeight: 1 }}>
                {data.bride.name}
              </h2>
              <span className="text-[#3d405b] opacity-35 font-light" style={{ fontSize: "clamp(20px, 5vw, 32px)" }}>&</span>
              <h2 className="text-[#3d405b] italic" style={{ fontSize: "clamp(32px, 8vw, 52px)", lineHeight: 1 }}>
                {data.groom.name}
              </h2>
            </div>
            <p className="text-[#3d405b] opacity-40 tracking-[0.3em] mt-2"
              style={{ fontFamily: "var(--font-amiri), serif", fontSize: "11px" }}>
              {data.akad.date}
            </p>
          </div>

          {/* Closing message */}
          <div className="cls-reveal px-4">
            <p
              className="text-[#3d405b] opacity-60 leading-relaxed"
              style={{ fontFamily: "var(--font-amiri), serif", fontSize: "clamp(13px, 3vw, 15px)" }}
            >
              {data.closing.message}
            </p>
          </div>

          {/* Divider */}
          <div className="cls-reveal w-full flex items-center gap-4">
            <div className="cls-line flex-1 h-px bg-[#3d405b] opacity-20" />
            <svg className="w-3 h-3 opacity-30 shrink-0" viewBox="0 0 12 12" fill="#3d405b">
              <path d="M6 0 L7.5 4.5 L12 6 L7.5 7.5 L6 12 L4.5 7.5 L0 6 L4.5 4.5Z" />
            </svg>
            <div className="cls-line flex-1 h-px bg-[#3d405b] opacity-20" />
          </div>



        </div>
      </section>
    </>
  );
}