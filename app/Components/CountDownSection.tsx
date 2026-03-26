"use client";

import { useEffect, useState } from "react";
import { useScrollReveal } from "../hooks/useScrollReveal.ts";

interface Props {
  targetDate: string;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function calcTimeLeft(target: string): TimeLeft {
  const diff = new Date(target).getTime() - Date.now();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / 1000 / 60) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

export default function CountdownSection({ targetDate }: Props) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calcTimeLeft(targetDate));
  const { ref, inView } = useScrollReveal();

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(calcTimeLeft(targetDate));
    }, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  const units = [
    { label: "Hari", value: timeLeft.days },
    { label: "Jam", value: timeLeft.hours },
    { label: "Menit", value: timeLeft.minutes },
    { label: "Detik", value: timeLeft.seconds },
  ];

  return (
    <section className="py-16 bg-[#f4f1de] relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-linear-r from-transparent via-[#f2cc8f] to-transparent opacity-30" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-linear-to-r from-transparent via-[#f2cc8f] to-transparent opacity-30" />

      <div
        ref={ref}
        className={`max-w-2xl mx-auto px-6 text-center transition-all duration-1000 ${
          inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <p className="text-[#3d405b] text-xs tracking-[0.4em] uppercase mb-8 opacity-80">
          Menuju Hari Bahagia
        </p>

        <div className="grid grid-cols-4 gap-4">
          {units.map(({ label, value }, i) => (
            <div key={label} className="relative">
              <div
                className="py-4 px-2"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <span className="block font-bright-dusty text-4xl md:text-5xl text-[#3d405b] leading-none tabular-nums">
                  {String(value).padStart(2, "0")}
                </span>
              </div>
              <p className="text-[#3d405b] text-xs tracking-widest uppercase mt-2 opacity-60">
                {label}
              </p>
              {i < 3 && (
                <span className="absolute top-4 -right-2 text-[#3d405b] opacity-40 font-light text-xl">
                  :
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}