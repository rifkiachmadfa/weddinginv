"use client";

import { useRef, useState } from "react";

interface Props {
  guestName: string;
  onOpen: () => void;
}

export default function EnvelopeOpener({ guestName, onOpen }: Props) {
  const [phase, setPhase] = useState<"idle" | "breaking" | "opening" | "rising" | "done">("idle");
  const [particles, setParticles] = useState<{ id: number; x: number; y: number; angle: number; size: number; delay: number }[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleSealClick = () => {
    if (phase !== "idle") return;

    // Generate particles for wax seal burst
    const newParticles = Array.from({ length: 18 }, (_, i) => ({
      id: i,
      x: 50 + Math.cos((i / 18) * Math.PI * 2) * (20 + Math.random() * 30),
      y: 50 + Math.sin((i / 18) * Math.PI * 2) * (20 + Math.random() * 30),
      angle: (i / 18) * 360,
      size: 3 + Math.random() * 5,
      delay: Math.random() * 0.2,
    }));
    setParticles(newParticles);

    setPhase("breaking");
    setTimeout(() => setPhase("opening"), 600);
    setTimeout(() => setPhase("rising"), 1400);
    setTimeout(() => {
      setPhase("done");
      setTimeout(onOpen, 800);
    }, 2600);
  };

  return (
    <>
      <style>{`
        .env-root {
          position: fixed;
          inset: 0;
          z-index: 9999;
          background: #f4f1de;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          perspective: 1200px;
        }

        /* Grain texture overlay */
        .env-root::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E");
          pointer-events: none;
          opacity: 0.5;
        }

        /* Radial vignette */
        .env-root::after {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse at center, transparent 40%, rgba(61,64,91,0.08) 100%);
          pointer-events: none;
        }

        /* ---- Corner ornaments ---- */
        .corner {
          position: absolute;
          width: 80px;
          height: 80px;
          opacity: 0.18;
        }
        .corner-tl { top: 32px; left: 32px; }
        .corner-tr { top: 32px; right: 32px; transform: scaleX(-1); }
        .corner-bl { bottom: 32px; left: 32px; transform: scaleY(-1); }
        .corner-br { bottom: 32px; right: 32px; transform: scale(-1); }

        /* ---- Envelope wrapper ---- */
        .envelope-wrap {
          position: relative;
          width: min(420px, 88vw);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 28px;
        }

        /* Greeting text above envelope */
        .greeting-text {
          text-align: center;
          opacity: 0;
          transform: translateY(-16px);
          animation: greetIn 1s cubic-bezier(0.22,1,0.36,1) 0.3s forwards;
        }
        @keyframes greetIn {
          to { opacity: 1; transform: translateY(0); }
        }

        .greeting-text .label {
          font-family: var(--font-amiri), serif;
          font-size: 13px;
          letter-spacing: 0.35em;
          text-transform: uppercase;
          color: #3d405b;
          opacity: 0.75;
          margin-bottom: 8px;
        }
        .greeting-text .name {
          font-size: clamp(28px, 6vw, 44px);
          font-style: italic;
          color: #3d405b;
          opacity: 1;
          letter-spacing: 0.03em;
        }

        /* ---- The Envelope ---- */
        .envelope {
          position: relative;
          width: 100%;
          aspect-ratio: 1.618 / 1;
          filter: drop-shadow(0 24px 48px rgba(61,64,91,0.14)) drop-shadow(0 4px 12px rgba(61,64,91,0.08));
          transform-style: preserve-3d;
          transition: transform 0.4s cubic-bezier(0.22,1,0.36,1);
          opacity: 0;
          animation: envIn 1.2s cubic-bezier(0.22,1,0.36,1) 0.1s forwards;
        }
        @keyframes envIn {
          from { opacity: 0; transform: translateY(32px) scale(0.96); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        .envelope.opening {
          animation: envOpen 1s cubic-bezier(0.22,1,0.36,1) forwards;
        }
        @keyframes envOpen {
          0%   { transform: translateY(0) rotateX(0deg); }
          40%  { transform: translateY(-8px) rotateX(6deg); }
          100% { transform: translateY(0) rotateX(0deg); }
        }
        .envelope.done {
          animation: envFade 0.7s ease forwards;
        }
        @keyframes envFade {
          to { opacity: 0; transform: scale(0.92) translateY(20px); }
        }

        /* Envelope body */
        .env-body {
          position: absolute;
          inset: 0;
          border-radius: 4px;
          overflow: hidden;
        }

        /* Back face of envelope (parchment texture) */
        .env-back {
          position: absolute;
          inset: 0;
          background:
            linear-gradient(135deg, #ede8d0 0%, #e8e0c8 50%, #ddd5b8 100%);
          border-radius: 4px;
          border: 1px solid rgba(61,64,91,0.12);
        }

        /* Diagonal fold lines on envelope */
        .env-back::before {
          content: '';
          position: absolute;
          inset: 0;
          background:
            linear-gradient(to bottom right, transparent calc(50% - 0.5px), rgba(61,64,91,0.08) calc(50% - 0.5px), rgba(61,64,91,0.08) calc(50% + 0.5px), transparent calc(50% + 0.5px)),
            linear-gradient(to bottom left, transparent calc(50% - 0.5px), rgba(61,64,91,0.08) calc(50% - 0.5px), rgba(61,64,91,0.08) calc(50% + 0.5px), transparent calc(50% + 0.5px));
        }

        /* Bottom flap triangle */
        .env-flap-bottom {
          position: absolute;
          bottom: 0; left: 0; right: 0;
          height: 52%;
          background: linear-gradient(160deg, #e5dfc8 0%, #dbd3ba 100%);
          clip-path: polygon(0% 100%, 50% 0%, 100% 100%);
          border-radius: 0 0 4px 4px;
        }

        /* Left flap */
        .env-flap-left {
          position: absolute;
          top: 0; left: 0; bottom: 0;
          width: 52%;
          background: linear-gradient(120deg, #e8e2cb 0%, #ddd6bf 100%);
          clip-path: polygon(0% 0%, 100% 50%, 0% 100%);
        }

        /* Right flap */
        .env-flap-right {
          position: absolute;
          top: 0; right: 0; bottom: 0;
          width: 52%;
          background: linear-gradient(240deg, #e8e2cb 0%, #ddd6bf 100%);
          clip-path: polygon(100% 0%, 0% 50%, 100% 100%);
        }

        /* Top flap — this opens */
        .env-flap-top {
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 52%;
          background: linear-gradient(200deg, #ede8d2 0%, #e3dcc4 100%);
          clip-path: polygon(0% 0%, 50% 100%, 100% 0%);
          transform-origin: top center;
          transform-style: preserve-3d;
          transition: transform 0.9s cubic-bezier(0.34, 1.3, 0.64, 1);
          border-radius: 4px 4px 0 0;
          z-index: 10;
        }
        .env-flap-top.opened {
          transform: rotateX(-185deg);
        }

        /* Inner envelope (darker, slightly visible when open) */
        .env-inner {
          position: absolute;
          inset: 4px;
          background: linear-gradient(160deg, #d8d1b8 0%, #cfc8af 100%);
          border-radius: 2px;
          z-index: 1;
        }

        /* ---- Letter rising from envelope ---- */
        .letter {
          position: absolute;
          bottom: 5%;
          left: 8%;
          right: 8%;
          height: 88%;
          background: #f9f7ef;
          border-radius: 2px;
          border: 1px solid rgba(61,64,91,0.08);
          box-shadow: 0 2px 16px rgba(61,64,91,0.10);
          z-index: 5;
          transform: translateY(0%);
          transition: transform 0s;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 16px;
        }
        .letter.rising {
          transition: transform 1.2s cubic-bezier(0.22, 1, 0.36, 1);
          transform: translateY(-60%);
        }
        .letter-line {
          width: 60%;
          height: 1px;
          background: rgba(61,64,91,0.15);
          border-radius: 1px;
        }
        .letter-line.short { width: 40%; }
        .letter-dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          background: rgba(61,64,91,0.2);
        }

        /* ---- Wax Seal ---- */
        .seal-wrap {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          z-index: 20;
          cursor: pointer;
        }
        .seal-wrap.broken {
          animation: sealBreak 0.5s cubic-bezier(0.36, 0.07, 0.19, 0.97) forwards;
        }
        @keyframes sealBreak {
          0%   { transform: translate(-50%, -50%) scale(1) rotate(0deg); }
          20%  { transform: translate(-50%, -50%) scale(1.15) rotate(-3deg); }
          40%  { transform: translate(-50%, -50%) scale(0.9) rotate(4deg); }
          60%  { transform: translate(-50%, -50%) scale(1.05) rotate(-2deg); }
          80%  { transform: translate(-50%, -50%) scale(0.4) rotate(8deg); opacity: 0.6; }
          100% { transform: translate(-50%, -50%) scale(0) rotate(15deg); opacity: 0; }
        }

        .seal-svg {
          width: 72px;
          height: 72px;
          filter: drop-shadow(0 4px 12px rgba(61,64,91,0.25));
          transition: transform 0.6s cubic-bezier(0.22,1,0.36,1), filter 0.3s ease;
        }
        .seal-wrap:hover .seal-svg {
          filter: drop-shadow(0 6px 20px rgba(61,64,91,0.35));
          transform: scale(1.07) rotate(5deg);
        }

        @keyframes sealPulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.04); }
        }
        .seal-svg {
          animation: sealPulse 3s ease-in-out infinite;
        }
        .seal-wrap:hover .seal-svg {
          animation: none;
        }

        /* ---- Particles ---- */
        .particle {
          position: absolute;
          border-radius: 50%;
          background: #3d405b;
          pointer-events: none;
          transform-origin: center;
          opacity: 0;
        }
        .particle.burst {
          animation: particleBurst 0.8s cubic-bezier(0.22,1,0.36,1) forwards;
        }
        @keyframes particleBurst {
          0%   { opacity: 0.9; transform: translate(0,0) scale(1); }
          100% { opacity: 0; transform: translate(var(--tx), var(--ty)) scale(0.2); }
        }

        /* ---- Hint text ---- */
        .hint {
          font-family: var(--font-amiri), serif;
          font-size: 13px;
          letter-spacing: 0.35em;
          text-transform: uppercase;
          color: #3d405b;
          opacity: 0;
          animation: hintIn 1s ease 1.2s forwards;
        }
        @keyframes hintIn {
          to { opacity: 0.65; }
        }
        .hint.hidden {
          opacity: 0 !important;
          transition: opacity 0.3s;
        }

        /* ---- Whole thing fades out ---- */
        .env-root.done-exit {
          animation: rootExit 0.8s ease 0.1s forwards;
        }
        @keyframes rootExit {
          to { opacity: 0; pointer-events: none; }
        }

        /* Thin decorative border inside page */
        .page-border {
          position: absolute;
          inset: 24px;
          border: 1px solid rgba(61,64,91,0.1);
          border-radius: 2px;
          pointer-events: none;
        }
      `}</style>

      <div ref={containerRef} className={`env-root${phase === "done" ? " done-exit" : ""}`}>

        {/* Page border */}
        <div className="page-border" />

        {/* Corner ornaments */}
        {[
          "corner corner-tl",
          "corner corner-tr",
          "corner corner-bl",
          "corner corner-br",
        ].map((cls, i) => (
          <svg key={i} className={cls} viewBox="0 0 80 80" fill="none">
            <path d="M4 4 L4 32" stroke="#3d405b" strokeWidth="0.8" strokeLinecap="round"/>
            <path d="M4 4 L32 4" stroke="#3d405b" strokeWidth="0.8" strokeLinecap="round"/>
            <circle cx="4" cy="4" r="2" fill="#3d405b"/>
            <path d="M16 16 Q40 4 40 40 Q4 40 16 16Z" stroke="#3d405b" strokeWidth="0.6" fill="none" opacity="0.5"/>
          </svg>
        ))}

        <div className="envelope-wrap">
          {/* Greeting */}
          <div className="greeting-text">
            <p className="label">Undangan Pernikahan · Untuk</p>
            <p className="name">{guestName}</p>
          </div>

          {/* Envelope */}
          <div className={`envelope${phase === "opening" || phase === "rising" ? " opening" : ""}${phase === "done" ? " done" : ""}`}>
            <div className="env-body">
              <div className="env-back" />
              <div className="env-inner" />
              <div className="env-flap-bottom" />
              <div className="env-flap-left" />
              <div className="env-flap-right" />

              {/* Letter inside */}
              <div className={`letter${phase === "rising" || phase === "done" ? " rising" : ""}`}>
                <div className="letter-dot" />
                <div className="letter-line" />
                <div className="letter-line short" />
                <div className="letter-line" />
                <div className="letter-line short" style={{ width: "30%" }} />
                <div className="letter-line" />
              </div>

              {/* Top flap */}
              <div className={`env-flap-top${phase === "opening" || phase === "rising" || phase === "done" ? " opened" : ""}`} />
            </div>

            {/* Wax seal */}
            {phase !== "opening" && phase !== "rising" && phase !== "done" && (
              <div
                className={`seal-wrap${phase === "breaking" ? " broken" : ""}`}
                onClick={handleSealClick}
              >
                {/* Particles */}
                {particles.map((p) => (
                  <div
                    key={p.id}
                    className={`particle${phase === "breaking" ? " burst" : ""}`}
                    style={{
                      left: `${p.x}%`,
                      top: `${p.y}%`,
                      width: `${p.size}px`,
                      height: `${p.size}px`,
                      // @ts-expect-error -- CSS custom properties not in CSSProperties type
                      "--tx": `${(p.x - 50) * 1.4}px`,
                      "--ty": `${(p.y - 50) * 1.4}px`,
                      animationDelay: `${p.delay}s`,
                    }}
                  />
                ))}

                <svg className="seal-svg" viewBox="0 0 100 100" fill="none">
                  {/* Outer burst ring */}
                  {Array.from({ length: 16 }, (_, i) => {
                    const angle = (i / 16) * Math.PI * 2;
                    const r1 = 44, r2 = 48;
                    const x1 = 50 + Math.cos(angle) * r1;
                    const y1 = 50 + Math.sin(angle) * r1;
                    const x2 = 50 + Math.cos(angle) * r2;
                    const y2 = 50 + Math.sin(angle) * r2;
                    return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#3d405b" strokeWidth="1.5" strokeLinecap="round" />;
                  })}
                  {/* Outer circle */}
                  <circle cx="50" cy="50" r="38" fill="#3d405b" />
                  {/* Inner lighter circle */}
                  <circle cx="50" cy="50" r="33" fill="#4a4e72" />
                  {/* Monogram or ornament */}
                  {/* Simple botanical cross */}
                  <circle cx="50" cy="50" r="18" fill="none" stroke="#f4f1de" strokeWidth="0.8" opacity="0.6" />
                  <path d="M50 35 L50 65 M35 50 L65 50" stroke="#f4f1de" strokeWidth="1" strokeLinecap="round" opacity="0.7" />
                  <path d="M50 35 C54 38 54 46 50 50 C46 46 46 38 50 35Z" fill="#f4f1de" opacity="0.5" />
                  <path d="M65 50 C62 54 54 54 50 50 C54 46 62 46 65 50Z" fill="#f4f1de" opacity="0.5" />
                  <path d="M50 65 C46 62 46 54 50 50 C54 54 54 62 50 65Z" fill="#f4f1de" opacity="0.5" />
                  <path d="M35 50 C38 46 46 46 50 50 C46 54 38 54 35 50Z" fill="#f4f1de" opacity="0.5" />
                  <circle cx="50" cy="50" r="3.5" fill="#f4f1de" opacity="0.9" />
                  {/* Small dots at cardinal points of inner ring */}
                  <circle cx="50" cy="32" r="1.2" fill="#f4f1de" opacity="0.5" />
                  <circle cx="50" cy="68" r="1.2" fill="#f4f1de" opacity="0.5" />
                  <circle cx="32" cy="50" r="1.2" fill="#f4f1de" opacity="0.5" />
                  <circle cx="68" cy="50" r="1.2" fill="#f4f1de" opacity="0.5" />
                </svg>
              </div>
            )}
          </div>

          {/* Hint */}
          <p className={`hint${phase !== "idle" ? " hidden" : ""}`}>
            Sentuh segel untuk membuka
          </p>
        </div>
      </div>
    </>
  );
}