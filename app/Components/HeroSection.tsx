"use client";

import { useEffect, useRef } from "react";
import { StaticImageData } from "next/image";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

interface Props {
  guestName: string;
  data: {
    heroImage: string | StaticImageData;
    groom: { name: string };
    bride: { name: string };
    akad: { date: string };
  };
}

export default function HeroSection({ guestName, data }: Props) {
  const contentRef = useRef<HTMLDivElement>(null);
  const topImageRef = useRef<HTMLDivElement>(null);
  const bottomImageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Reveal content on mount with staggered animation
    const el = contentRef.current;
    const topImg = topImageRef.current;
    const bottomImg = bottomImageRef.current;

    if (!el || !topImg || !bottomImg) return;

    // Trigger entrance animations after a short delay
    const timeout = setTimeout(() => {
      topImg.classList.add("image-in");
      bottomImg.classList.add("image-in");

      setTimeout(() => {
        el.classList.add("content-in");
      }, 300);
    }, 100);

    return () => clearTimeout(timeout);
  }, []);

  // Parallax effect on scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const topImg = topImageRef.current;
      const bottomImg = bottomImageRef.current;
      if (topImg) topImg.style.transform = `rotate(-90deg) translateY(${scrollY * 0.15}px)`;
      if (bottomImg) bottomImg.style.transform = `rotate(85deg) translateY(${-scrollY * 0.15}px)`;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScrollDown = () => {
    window.scrollTo({ top: window.innerHeight, behavior: "smooth" });
  };

  return (
    <>
      <style>{`
        /* Image entrance */
        .hero-image-wrap {
          opacity: 0;
          transition: opacity 1.2s ease, transform 1.4s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .hero-image-wrap.image-in {
          opacity: 1;
        }

        /* Floating animation for images */
        @keyframes floatTop {
          0%, 100% { translate: 0 0; }
          50% { translate: 0 -18px; }
        }
        @keyframes floatBottom {
          0%, 100% { translate: 0 0; }
          50% { translate: 0 18px; }
        }
        .hero-image-wrap.image-in .inner-float-top {
          animation: floatTop 6s ease-in-out infinite;
        }
        .hero-image-wrap.image-in .inner-float-bottom {
          animation: floatBottom 6s ease-in-out infinite;
        }

        /* Slow spin for image */
        @keyframes slowSpin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        /* Content entrance */
        .hero-content {
          opacity: 0;
          transform: translateY(32px);
          transition: opacity 1s ease, transform 1s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .hero-content.content-in {
          opacity: 1;
          transform: translateY(0);
        }

        /* Staggered children */
        .hero-content.content-in .stagger-1 { transition-delay: 0.05s; opacity: 1; transform: translateY(0); }
        .hero-content.content-in .stagger-2 { transition-delay: 0.15s; opacity: 1; transform: translateY(0); }
        .hero-content.content-in .stagger-3 { transition-delay: 0.3s; opacity: 1; transform: translateY(0); }
        .hero-content.content-in .stagger-4 { transition-delay: 0.45s; opacity: 1; transform: translateY(0); }
        .hero-content.content-in .stagger-5 { transition-delay: 0.6s; opacity: 1; transform: translateY(0); }

        .stagger-1, .stagger-2, .stagger-3, .stagger-4, .stagger-5 {
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.8s ease, transform 0.8s cubic-bezier(0.22, 1, 0.36, 1);
        }

        /* Divider line animation */
        @keyframes lineGrow {
          from { transform: scaleX(0); }
          to { transform: scaleX(1); }
        }
        .hero-content.content-in .divider-line {
          animation: lineGrow 1s ease forwards;
          animation-delay: 0.5s;
        }
        .divider-line {
          transform: scaleX(0);
          transform-origin: center;
        }

        /* Scroll button pulse */
        @keyframes pulseSoft {
          0%, 100% { box-shadow: 0 0 0 0 rgba(61, 64, 91, 0.15); }
          50% { box-shadow: 0 0 0 10px rgba(61, 64, 91, 0); }
        }
        .scroll-btn {
          animation: pulseSoft 2.5s ease-in-out infinite;
        }
      `}</style>

      <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-[#f4f1de]">

        {/* Top decorative image */}
        <div
          ref={topImageRef}
          className="hero-image-wrap absolute -top-10 left-4 md:left-40 w-40 md:w-64 lg:w-80 rotate-[-90deg]"
        >
          <div className="inner-float-top">
            <Image
              src={data.heroImage}
              alt=""
              width={500}
              height={500}
              className="scale-[2] opacity-40 mix-blend-multiply"
            />
          </div>
        </div>

        {/* Bottom decorative image */}
        <div
          ref={bottomImageRef}
          className="hero-image-wrap absolute -bottom-10 right-4 md:right-40 w-40 md:w-64 lg:w-80 rotate-[85deg]"
        >
          <div className="inner-float-bottom">
            <Image
              src={data.heroImage}
              alt=""
              width={500}
              height={500}
              className="scale-[2] opacity-40 mix-blend-multiply"
            />
          </div>
        </div>

        {/* Main content */}
        <div ref={contentRef} className="hero-content relative z-10 text-center px-6">

          {/* Kepada Yth */}
          <div className="stagger-1 mb-8">
            <p className="text-[#3d405b] text-[10px] tracking-[0.5em] uppercase mb-2 opacity-60">
              Kepada Yth.
            </p>
            <p className="text-[#3d405b] text-xl font-light tracking-wide">{guestName}</p>
          </div>

          {/* Thin divider */}
          <div className="divider-line stagger-2 w-16 h-px bg-[#3d405b] opacity-30 mx-auto mb-8" />

          {/* The Wedding of */}
          <p className="stagger-2 text-[#3d405b] text-[10px] tracking-[0.5em] uppercase mb-6 opacity-60 font-bright-dusty">
            The Wedding of
          </p>

          {/* Bride name */}
          <h1 className="stagger-3 font-bright-dusty text-6xl md:text-8xl text-[#3d405b] leading-none mb-1">
            {data.bride.name}
          </h1>

          {/* Ampersand */}
          <p className="stagger-4 text-[#3d405b] text-2xl my-2 font-light opacity-50">&</p>

          {/* Groom name */}
          <h1 className="stagger-4 font-bright-dusty text-6xl md:text-8xl text-[#3d405b] leading-none mb-6">
            {data.groom.name}
          </h1>

          {/* Thin divider */}
          <div className="divider-line stagger-5 w-16 h-px bg-[#3d405b] opacity-30 mx-auto mb-6" />

          {/* Date */}
          <p className="stagger-5 text-[#3d405b] opacity-60 text-xs tracking-[0.4em] uppercase">
            {data.akad.date}
          </p>
        </div>

        {/* Scroll button — shadcn Button */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleScrollDown}
            className="scroll-btn border-[#3d405b]/30 text-[#3d405b]/60 hover:text-[#3d405b] hover:border-[#3d405b]/60 hover:bg-[#3d405b]/5 bg-transparent rounded-full px-5 text-[10px] tracking-[0.35em] uppercase gap-2 transition-all duration-300"
          >
            Scroll
            <ChevronDown className="w-3 h-3" />
          </Button>
        </div>
      </section>
    </>
  );
}