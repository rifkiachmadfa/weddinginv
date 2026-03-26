"use client";

import { useEffect, useRef, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

const ARABIC =
  "سُبْحَانَ الَّذِي خَلَقَ الْأَزْوَاجَ كُلَّهَا مِمَّا تُنبِتُ الْأَرْضُ وَمِنْ أَنفُسِهِمْ وَمِمَّا لَا يَعْلَمُونَ";

const INDONESIAN =
  "\u201cMahasuci (Allah) yang telah menciptakan semuanya berpasang-pasangan, baik dari apa yang ditumbuhkan oleh bumi dan dari diri mereka sendiri maupun dari apa yang tidak mereka ketahui.\u201d";

const FloralCorner = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M10 110 Q30 70 60 50 Q80 35 110 10" stroke="#3d405b" strokeWidth="0.8" strokeOpacity="0.25" fill="none" />
    <path d="M10 110 Q20 80 40 65 Q60 50 90 20" stroke="#3d405b" strokeWidth="0.5" strokeOpacity="0.15" fill="none" />
    <ellipse cx="35" cy="72" rx="10" ry="5" transform="rotate(-40 35 72)" fill="#3d405b" fillOpacity="0.1" />
    <ellipse cx="55" cy="52" rx="10" ry="5" transform="rotate(-50 55 52)" fill="#3d405b" fillOpacity="0.1" />
    <ellipse cx="78" cy="34" rx="9" ry="4" transform="rotate(-55 78 34)" fill="#3d405b" fillOpacity="0.1" />
    <circle cx="62" cy="48" r="4" fill="#3d405b" fillOpacity="0.12" />
    <circle cx="62" cy="42" r="2.5" fill="#3d405b" fillOpacity="0.1" />
    <circle cx="67" cy="46" r="2.5" fill="#3d405b" fillOpacity="0.1" />
    <circle cx="57" cy="46" r="2.5" fill="#3d405b" fillOpacity="0.1" />
    <circle cx="62" cy="48" r="1.5" fill="#3d405b" fillOpacity="0.2" />
    <circle cx="88" cy="26" r="3.5" fill="#3d405b" fillOpacity="0.12" />
    <circle cx="88" cy="21" r="2" fill="#3d405b" fillOpacity="0.1" />
    <circle cx="92" cy="24" r="2" fill="#3d405b" fillOpacity="0.1" />
    <circle cx="84" cy="24" r="2" fill="#3d405b" fillOpacity="0.1" />
    <circle cx="88" cy="26" r="1.2" fill="#3d405b" fillOpacity="0.2" />
    <circle cx="108" cy="12" r="3" fill="#3d405b" fillOpacity="0.1" />
    <circle cx="108" cy="8" r="1.8" fill="#3d405b" fillOpacity="0.08" />
    <circle cx="112" cy="11" r="1.8" fill="#3d405b" fillOpacity="0.08" />
    <circle cx="104" cy="11" r="1.8" fill="#3d405b" fillOpacity="0.08" />
    <circle cx="25" cy="88" r="1" fill="#3d405b" fillOpacity="0.2" />
    <circle cx="45" cy="63" r="1" fill="#3d405b" fillOpacity="0.2" />
    <circle cx="70" cy="42" r="1" fill="#3d405b" fillOpacity="0.15" />
    <circle cx="98" cy="18" r="1" fill="#3d405b" fillOpacity="0.15" />
  </svg>
);

export default function QuotesSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [phase, setPhase] = useState<"idle" | "photos" | "arabic" | "divider" | "indo" | "source" | "done">("idle");
  const [arabicText, setArabicText] = useState("");
  const [indoText, setIndoText] = useState("");
  const [showDivider, setShowDivider] = useState(false);
  const [showSource, setShowSource] = useState(false);
  const [showPhotos, setShowPhotos] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && phase === "idle") {
          setPhase("photos");
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [phase]);

  useEffect(() => {
    if (phase !== "photos") return;
    setShowPhotos(true);
    setTimeout(() => setPhase("arabic"), 900);
  }, [phase]);

  useEffect(() => {
    if (phase !== "arabic") return;
    const chars = [...ARABIC];
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setArabicText(chars.slice(0, i).join(""));
      if (i >= chars.length) {
        clearInterval(interval);
        setTimeout(() => setPhase("divider"), 400);
      }
    }, 40);
    return () => clearInterval(interval);
  }, [phase]);

  useEffect(() => {
    if (phase !== "divider") return;
    setShowDivider(true);
    setTimeout(() => setPhase("indo"), 700);
  }, [phase]);

  useEffect(() => {
    if (phase !== "indo") return;
    const chars = [...INDONESIAN];
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setIndoText(chars.slice(0, i).join(""));
      if (i >= chars.length) {
        clearInterval(interval);
        setTimeout(() => setPhase("source"), 300);
      }
    }, 22);
    return () => clearInterval(interval);
  }, [phase]);

  useEffect(() => {
    if (phase !== "source") return;
    setShowSource(true);
    setTimeout(() => setPhase("done"), 400);
  }, [phase]);

  const isTypingArabic = phase === "arabic";
  const isTypingIndo = phase === "indo";

  return (
    <>
      <style>{`
        @keyframes lineGrowQ {
          from { transform: scaleX(0); }
          to { transform: scaleX(1); }
        }
        .q-divider-grow {
          animation: lineGrowQ 0.6s cubic-bezier(0.22, 1, 0.36, 1) forwards;
          transform-origin: center;
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .fade-up {
          animation: fadeUp 0.6s ease forwards;
        }

        .cursor-blink::after {
          content: '|';
          display: inline-block;
          margin-left: 2px;
          animation: blink 0.7s step-start infinite;
          opacity: 1;
        }
        @keyframes blink {
          50% { opacity: 0; }
        }

        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        .ornament-text {
          background: linear-gradient(90deg, rgba(61,64,91,0.04) 0%, rgba(61,64,91,0.10) 50%, rgba(61,64,91,0.04) 100%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: shimmer 6s linear infinite;
        }

        @keyframes floralIn {
          from { opacity: 0; transform: scale(0.85); }
          to { opacity: 1; transform: scale(1); }
        }
        .floral-corner {
          animation: floralIn 1.2s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }

        @keyframes slideInLeft {
          0% { opacity: 0; transform: translateX(-40px) rotate(-3deg); }
          100% { opacity: 1; transform: translateX(0) rotate(-3deg); }
        }
        @keyframes slideInRight {
          0% { opacity: 0; transform: translateX(40px) rotate(3deg); }
          40% { opacity: 1; transform: translateX(0) rotate(3deg); }
          100% { opacity: 1; transform: translateX(0) rotate(3deg); }
        }
        @keyframes floatLeft {
          0%, 100% { opacity: 1; transform: translateX(0) rotate(-3deg) translateY(0); }
          50% { opacity: 1; transform: translateX(0) rotate(-3deg) translateY(-6px); }
        }
        @keyframes floatRight {
          0%, 100% { opacity: 1; transform: translateX(0) rotate(3deg) translateY(0); }
          50% { opacity: 1; transform: translateX(0) rotate(3deg) translateY(-6px); }
        }
        .photo-left {
          animation: slideInLeft 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards,
                     floatLeft 4s ease-in-out 0.8s infinite;
        }
        .photo-right {
          opacity: 0;
          animation: slideInRight 0.8s cubic-bezier(0.22, 1, 0.36, 1) 0.15s forwards,
                     floatRight 4s ease-in-out 1s infinite;
        }
      `}</style>

      <section
        ref={sectionRef}
        className="relative bg-[#f4f1de] min-h-screen flex items-center justify-center px-6 py-12 overflow-hidden"
      >
        {/* Background ornament */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
          <p className="font-bright-dusty text-[22rem] leading-none ornament-text">&ldquo;</p>
        </div>

        {/* Corner decorations */}
        <div className="absolute top-8 left-8 w-16 h-16 border-t border-l border-[#3d405b]/15 rounded-tl-sm" />
        <div className="absolute top-8 right-8 w-16 h-16 border-t border-r border-[#3d405b]/15 rounded-tr-sm" />
        <div className="absolute bottom-8 left-8 w-16 h-16 border-b border-l border-[#3d405b]/15 rounded-bl-sm" />
        <div className="absolute bottom-8 right-8 w-16 h-16 border-b border-r border-[#3d405b]/15 rounded-br-sm" />

        <div className="relative z-10 w-full max-w-lg mx-auto flex flex-col items-center">

          {/* Photos — di luar card, tanpa border/shadow card */}
          {showPhotos && (
            <div className="flex items-end justify-center gap-8 mb-8 relative z-20">

              {/* Wanita — left, tilted left */}
              <div className="photo-left">
                <div className="relative w-20 h-28 md:w-24 md:h-32">
                  <Image
                    src="/wanita.png"
                    alt="Wanita"
                    fill
                    className="object-contain object-top"
                  />
                </div>
              </div>

              {/* Ampersand center */}
              <div className="fade-up pb-2 text-[#3d405b]/40 text-xl font-light self-center">&amp;</div>

              {/* Pria — right, tilted right */}
              <div className="photo-right">
                <div className="relative w-20 h-28 md:w-24 md:h-32">
                  <Image
                    src="/pria.png"
                    alt="Pria"
                    fill
                    className="object-contain object-top"
                  />
                </div>
              </div>

            </div>
          )}

          {/* Card */}
          <Card className="relative w-full bg-transparent border-[#3d405b]/20 shadow-none rounded-3xl overflow-visible pt-10">
            <CardContent className="px-10 py-14 text-center relative">

              {/* Floral corners */}
              <div className="floral-corner absolute -top-8 -left-8 w-28 h-28 pointer-events-none">
                <FloralCorner className="w-full h-full" />
              </div>
              <div className="floral-corner absolute -top-8 -right-8 w-28 h-28 pointer-events-none" style={{ transform: "scaleX(-1)" }}>
                <FloralCorner className="w-full h-full" />
              </div>
              <div className="floral-corner absolute -bottom-8 -left-8 w-28 h-28 pointer-events-none" style={{ transform: "scaleY(-1)" }}>
                <FloralCorner className="w-full h-full" />
              </div>
              <div className="floral-corner absolute -bottom-8 -right-8 w-28 h-28 pointer-events-none" style={{ transform: "scale(-1)" }}>
                <FloralCorner className="w-full h-full" />
              </div>

              {/* Arabic */}
              <p
                className={`text-[#3d405b] text-2xl md:text-3xl leading-loose mb-8 font-light font-(family-name:--font-amiri) min-h-16 ${isTypingArabic ? "cursor-blink" : ""}`}
                dir="rtl"
                lang="ar"
              >
                {arabicText}
              </p>

              {/* Divider */}
              {showDivider && (
                <div className="flex items-center gap-2 justify-center mb-8">
                  <div className="h-px w-8 bg-[#3d405b]/20 q-divider-grow" />
                  <div className="w-1 h-1 rounded-full bg-[#3d405b]/30" />
                  <div className="h-px w-8 bg-[#3d405b]/20 q-divider-grow" />
                </div>
              )}

              {/* Indonesian */}
              <p className={`text-[#3d405b]/80 text-sm md:text-base leading-relaxed tracking-wide font-light italic mb-6 min-h-20 ${isTypingIndo ? "cursor-blink" : ""}`}>
                {indoText}
              </p>

              {/* Source */}
              {showSource && (
                <p className="text-[#3d405b]/40 text-[10px] tracking-[0.5em] uppercase fade-up">
                  Q.S Yaasin : 36
                </p>
              )}

            </CardContent>
          </Card>
        </div>
      </section>
    </>
  );
}