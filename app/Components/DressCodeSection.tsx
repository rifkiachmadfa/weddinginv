"use client";

import { useScrollReveal } from "../hooks/useScrollReveal";

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
  { name: "Sage Green", hex: "#b2bfa8" },
  { name: "Dusty Rose", hex: "#d4a5a5" },
  { name: "Soft Beige", hex: "#e8d5b7" },
  { name: "Warm Taupe", hex: "#c4a882" },
  { name: "Muted Lavender", hex: "#b8afc8" },
];

export default function DressCodeSection({ data }: Props) {
  const { ref, inView } = useScrollReveal();

  return (
    <section className="py-20 px-6 bg-[#f4f1de] relative overflow-hidden">
      <div
        ref={ref}
        className={`max-w-3xl mx-auto transition-all duration-1000 ${
          inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <div className="text-center mb-12">
          <p className="text-[#3d405b] text-xs tracking-[0.4em] uppercase opacity-60 mb-3">
            Dress Code
          </p>
          <h2 className="font-bright-dusty text-4xl md:text-5xl text-[#3d405b] mb-2">
            {data.dressCode.theme}
          </h2>
          <div className="flex items-center justify-center gap-3 mt-4 mb-6">
            <div className="h-px w-16 bg-[#f2cc8f]" />
            <div className="w-1.5 h-1.5 rounded-full bg-[#f2cc8f]" />
            <div className="h-px w-16 bg-[#f2cc8f]" />
          </div>
          <p className="text-[#3d405b] opacity-70 text-sm max-w-md mx-auto leading-relaxed">
            {data.dressCode.description}
          </p>
        </div>

        {/* Color swatches */}
        <div className="flex justify-center gap-3 mb-12 flex-wrap">
          {COLOR_SWATCHES.map((color) => (
            <div key={color.name} className="flex flex-col items-center gap-2 group">
              <div
                className="w-10 h-10 rounded-full border-2 border-white shadow-md group-hover:scale-110 transition-transform duration-300"
                style={{ backgroundColor: color.hex }}
              />
              <p className="text-[#3d405b] text-xs opacity-60 w-16 text-center leading-tight">
                {color.name}
              </p>
            </div>
          ))}
        </div>

        {/* Male & Female */}
        <div className="grid md:grid-cols-2 gap-6 mb-10">
          <DressCard
            gender="Pria"
            icon={
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            }
            description={data.dressCode.male}
          />
          <DressCard
            gender="Wanita"
            icon={
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 2C10.343 2 9 3.343 9 5s1.343 3 3 3 3-1.343 3-3-1.343-3-3-3zm0 8c-2.21 0-4 1.79-4 4v2h2l1 6h2l1-6h2v-2c0-2.21-1.79-4-4-4z" />
              </svg>
            }
            description={data.dressCode.female}
          />
        </div>

        {/* Avoid colors */}
        <div className="text-center p-5 border border-dashed border-[#3d405b] border-opacity-20">
          <p className="text-[#3d405b] text-xs tracking-widest uppercase opacity-60 mb-2">
            Mohon Hindari Warna
          </p>
          <div className="flex justify-center gap-3 flex-wrap">
            {data.dressCode.avoidColors.map((c) => (
              <span
                key={c}
                className="px-3 py-1 bg-[#3d405b] bg-opacity-10 text-[#3d405b] text-xs rounded-sm opacity-70"
              >
                {c}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function DressCard({
  gender,
  icon,
  description,
}: {
  gender: string;
  icon: React.ReactNode;
  description: string;
}) {
  return (
    <div className="text-center p-6 bg-white bg-opacity-50 border border-[#3d405b] border-opacity-10 hover:border-opacity-20 transition-all duration-300">
      <div className="flex justify-center text-[#3d405b] opacity-60 mb-3">{icon}</div>
      <h4 className="font-medium text-[#3d405b] mb-2 text-sm tracking-widest uppercase opacity-70">
        {gender}
      </h4>
      <p className="text-[#3d405b] text-sm opacity-60 leading-relaxed">{description}</p>
    </div>
  );
}