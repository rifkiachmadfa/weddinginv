"use client";

import { useRef } from "react";
import { motion, useInView, type Variants } from "framer-motion";
import Image from "next/image";

interface CoupleData {
  groom: {
    fullName: string;
    father: string;
    mother: string;
  };
  bride: {
    fullName: string;
    father: string;
    mother: string;
  };
}

interface Props {
  data: CoupleData;
}

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

const DiagonalPhoto = ({
  src,
  alt,
  direction,
}: {
  src: string;
  alt: string;
  direction: "left" | "right";
}) => {
  const clipLeft = "polygon(0 0, 90% 0, 100% 100%, 0% 100%)";
  const clipRight = "polygon(10% 0, 100% 0, 100% 100%, 0% 100%)";

  return (
    <motion.div
      className="relative w-full overflow-hidden flex justify-center"
      style={{ clipPath: direction === "left" ? clipLeft : clipRight }}
      initial={{ opacity: 0, x: direction === "left" ? -60 : 60 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.9, ease: "easeOut" }}
    >
      <Image
        src={src}
        alt={alt}
        width={600}
        height={800}
        className="w-auto h-auto max-h-95 md:max-h-115 object-contain"
        style={{ display: "block" }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            direction === "left"
              ? "linear-gradient(to right, rgba(61,64,91,0.1), rgba(61,64,91,0.5))"
              : "linear-gradient(to left, rgba(61,64,91,0.1), rgba(61,64,91,0.5))",
        }}
      />
    </motion.div>
  );
};

const PersonCard = ({
  fullName,
  father,
  mother,
  title,
  direction,
}: {
  fullName: string;
  father: string;
  mother: string;
  title: string;
  direction: "left" | "right";
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <motion.div
      ref={ref}
      className={`flex flex-col justify-center gap-5 px-8 md:px-12 py-10 ${
        direction === "left" ? "items-start text-left" : "items-end text-right"
      }`}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      <motion.p
        variants={itemVariants}
        className="text-[#f4f1de]/40 text-[10px] tracking-[0.5em] uppercase"
      >
        {title}
      </motion.p>

      <motion.div
        variants={itemVariants}
        className={`h-px w-12 bg-[#f4f1de]/20 ${direction === "right" ? "self-end" : ""}`}
      />

      <motion.h2
        variants={itemVariants}
        className="font-bright-dusty text-4xl md:text-5xl lg:text-6xl text-[#f4f1de] leading-tight"
      >
        {fullName}
      </motion.h2>

      <motion.div variants={itemVariants} className="space-y-1">
        <p className="text-[#f4f1de]/50 text-[10px] tracking-[0.4em] uppercase mb-2">
          Putra/Putri dari
        </p>
        <p className="text-[#f4f1de]/80 text-sm font-light">{father}</p>
        <p className="text-[#f4f1de]/80 text-sm font-light">{mother}</p>
      </motion.div>

      <motion.div
        variants={itemVariants}
        className={`h-px w-12 bg-[#f4f1de]/20 ${direction === "right" ? "self-end" : ""}`}
      />
    </motion.div>
  );
};

export default function CoupleSection({ data }: Props) {
  return (
    <section className="bg-[#3d405b] overflow-hidden">

      <motion.div
        className="w-full h-px bg-[#f4f1de]/10"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        style={{ transformOrigin: "left" }}
      />

      <motion.div
        className="text-center py-16"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <p className="text-[#f4f1de]/30 text-[10px] tracking-[0.6em] uppercase mb-3">
          Yang Berbahagia
        </p>
        <h2 className="font-bright-dusty text-5xl md:text-6xl text-[#f4f1de]">
          The Couple
        </h2>
        <div className="flex items-center gap-3 justify-center mt-6">
          <div className="h-px w-12 bg-[#f4f1de]/15" />
          <div className="w-1 h-1 rounded-full bg-[#f4f1de]/30" />
          <div className="h-px w-24 bg-[#f4f1de]/15" />
          <div className="w-1 h-1 rounded-full bg-[#f4f1de]/30" />
          <div className="h-px w-12 bg-[#f4f1de]/15" />
        </div>
      </motion.div>

      {/* Bride — foto kiri, text kanan */}
      <div className="grid grid-cols-1 md:grid-cols-2 mb-2 items-center">
        <DiagonalPhoto src="/wanita.png" alt="Bride" direction="left" />
        <PersonCard
          fullName={data.bride.fullName}
          father={data.bride.father}
          mother={data.bride.mother}
          title="The Bride"
          direction="left"
        />
      </div>

      {/* Ampersand divider */}
      <motion.div
        className="text-center py-10"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <div className="flex items-center gap-3 justify-center">
          <div className="h-px w-12 bg-[#f4f1de]/15" />
          <p className="font-bright-dusty text-3xl text-[#f4f1de]/30">&amp;</p>
          <div className="h-px w-12 bg-[#f4f1de]/15" />
        </div>
      </motion.div>

      {/* Groom — text kiri, foto kanan */}
      <div className="grid grid-cols-1 md:grid-cols-2 mt-2 items-center">
        <PersonCard
          fullName={data.groom.fullName}
          father={data.groom.father}
          mother={data.groom.mother}
          title="The Groom"
          direction="right"
        />
        <DiagonalPhoto src="/pria.png" alt="Groom" direction="right" />
      </div>

    </section>
  );
}