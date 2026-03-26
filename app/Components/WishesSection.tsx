"use client";

import { useEffect, useRef, useState } from "react";
import { StaticImageData } from "next/image";
import Image from "next/image";

interface Wish {
  id: number;
  senderName: string;
  message: string;
  attendance: string;
  createdAt: string;
}

interface Props {
  data: {
    heroImage: string | StaticImageData;
    groom: { name: string };
    bride: { name: string };
  };
  guestName?: string;
}

const ATTENDANCE_OPTIONS = [
  { value: "hadir", label: "Insya Allah Hadir", icon: "✓" },
  { value: "tidak_hadir", label: "Tidak Hadir", icon: "✗" },
  { value: "mungkin", label: "Masih Belum Pasti", icon: "?" },
];

const ATTENDANCE_LABEL: Record<string, { label: string; color: string }> = {
  hadir: { label: "Hadir", color: "rgba(61,64,91,0.7)" },
  tidak_hadir: { label: "Tidak Hadir", color: "rgba(61,64,91,0.35)" },
  mungkin: { label: "Mungkin Hadir", color: "rgba(61,64,91,0.5)" },
};

export default function WishesSection({ data, guestName }: Props) {
  const sectionRef = useRef<HTMLElement>(null);
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    senderName: guestName && guestName !== "Tamu Undangan" ? guestName : "",
    message: "",
    attendance: "hadir",
  });

  // Intersection observer for staggered entrance
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll(".wsh-reveal").forEach((el, i) => {
              setTimeout(() => {
                (el as HTMLElement).classList.add("wsh-in");
              }, i * 110);
            });
          }
        });
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // Fetch wishes
  const fetchWishes = async () => {
    try {
      const res = await fetch("/api/wishes");
      const json = await res.json();
      if (json.success) setWishes(json.data);
    } catch {
      // silent fail — list tetap kosong
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWishes();
  }, []);

  const handleSubmit = async () => {
    setError("");
    if (!form.senderName.trim() || form.senderName.trim().length < 2) {
      setError("Nama minimal 2 karakter.");
      return;
    }
    if (!form.message.trim() || form.message.trim().length < 5) {
      setError("Pesan ucapan minimal 5 karakter.");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/wishes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const json = await res.json();
      if (!json.success) throw new Error(json.message);

      setSubmitted(true);
      setWishes((prev) => [json.data, ...prev]);
      setForm((f) => ({ ...f, message: "" }));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Terjadi kesalahan.");
    } finally {
      setSubmitting(false);
    }
  };

  const formatDate = (iso: string) => {
    return new Date(iso).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <>
      <style>{`
        /* Reveal animation */
        .wsh-reveal {
          opacity: 0;
          transform: translateY(24px);
          transition: opacity 0.85s cubic-bezier(0.22, 1, 0.36, 1),
                      transform 0.85s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .wsh-reveal.wsh-in {
          opacity: 1;
          transform: translateY(0);
        }

        /* Divider line grow */
        .wsh-line {
          transform: scaleX(0);
          transform-origin: center;
          transition: transform 1s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .wsh-reveal.wsh-in .wsh-line { transform: scaleX(1); }

        /* Floating images */
        @keyframes wshFloat {
          0%, 100% { translate: 0 0; }
          50% { translate: 0 -14px; }
        }
        .wsh-float { animation: wshFloat 7s ease-in-out infinite; }

        /* Grain */
        .wsh-section::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E");
          pointer-events: none;
          opacity: 0.4;
        }

        /* Form input / textarea */
        .wsh-input {
          width: 100%;
          background: rgba(61,64,91,0.04);
          border: 1px solid rgba(61,64,91,0.18);
          border-radius: 4px;
          padding: 12px 16px;
          color: #3d405b;
          font-family: var(--font-amiri), serif;
          font-size: 14px;
          outline: none;
          transition: border-color 0.3s ease, background 0.3s ease;
          resize: none;
        }
        .wsh-input::placeholder {
          color: rgba(61,64,91,0.35);
        }
        .wsh-input:focus {
          border-color: rgba(61,64,91,0.45);
          background: rgba(61,64,91,0.06);
        }

        /* Attendance pill button */
        .wsh-pill {
          flex: 1;
          padding: 9px 4px;
          border: 1px solid rgba(61,64,91,0.2);
          border-radius: 9999px;
          background: transparent;
          color: #3d405b;
          font-family: var(--font-amiri), serif;
          font-size: 11px;
          letter-spacing: 0.05em;
          cursor: pointer;
          transition: background 0.25s ease, border-color 0.25s ease, color 0.25s ease;
          text-align: center;
          white-space: nowrap;
        }
        .wsh-pill.active {
          background: #3d405b;
          border-color: #3d405b;
          color: #f4f1de;
        }

        /* Submit button */
        .wsh-submit {
          position: relative;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          width: 100%;
          padding: 13px 32px;
          border: 1px solid rgba(61,64,91,0.4);
          border-radius: 9999px;
          background: transparent;
          color: #3d405b;
          font-family: var(--font-amiri), serif;
          font-size: 12px;
          letter-spacing: 0.35em;
          text-transform: uppercase;
          cursor: pointer;
          overflow: hidden;
          transition: color 0.3s ease, border-color 0.3s ease;
        }
        .wsh-submit::before {
          content: '';
          position: absolute;
          inset: 0;
          background: #3d405b;
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.4s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .wsh-submit:hover::before,
        .wsh-submit:focus::before { transform: scaleX(1); }
        .wsh-submit:hover, .wsh-submit:focus { color: #f4f1de; border-color: #3d405b; }
        .wsh-submit span { position: relative; z-index: 1; }
        .wsh-submit:disabled { opacity: 0.5; cursor: not-allowed; }
        .wsh-submit:disabled::before { transform: scaleX(0) !important; }

        /* Wish card */
        .wsh-card {
          border: 1px solid rgba(61,64,91,0.1);
          border-radius: 4px;
          padding: 18px 20px;
          background: rgba(61,64,91,0.025);
          text-align: left;
          animation: wshCardIn 0.6s cubic-bezier(0.22, 1, 0.36, 1) both;
        }
        @keyframes wshCardIn {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        /* Success checkmark */
        @keyframes wshCheck {
          from { transform: scale(0.5); opacity: 0; }
          to   { transform: scale(1); opacity: 1; }
        }
        .wsh-check { animation: wshCheck 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) both; }

        /* Scroll container wishes list */
        .wsh-list {
          max-height: 440px;
          overflow-y: auto;
          scrollbar-width: thin;
          scrollbar-color: rgba(61,64,91,0.2) transparent;
        }
        .wsh-list::-webkit-scrollbar { width: 4px; }
        .wsh-list::-webkit-scrollbar-track { background: transparent; }
        .wsh-list::-webkit-scrollbar-thumb {
          background: rgba(61,64,91,0.2);
          border-radius: 2px;
        }
      `}</style>

      <section
        ref={sectionRef}
        className="wsh-section relative bg-[#f4f1de] overflow-hidden px-6 py-24"
      >
        {/* Vignette */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse at center, transparent 40%, rgba(61,64,91,0.06) 100%)" }}
        />

        {/* Decorative image top-right */}
        <div className="absolute -top-8 right-4 md:right-20 w-32 md:w-52 opacity-25 mix-blend-multiply -rotate-90">
          <div className="wsh-float">
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
          <svg key={i} className={`${cls} w-14 h-14 opacity-12`} viewBox="0 0 80 80" fill="none">
            <path d="M4 4 L4 28" stroke="#3d405b" strokeWidth="0.8" strokeLinecap="round" />
            <path d="M4 4 L28 4" stroke="#3d405b" strokeWidth="0.8" strokeLinecap="round" />
            <circle cx="4" cy="4" r="2" fill="#3d405b" />
            <path d="M14 14 Q38 4 38 38 Q4 38 14 14Z" stroke="#3d405b" strokeWidth="0.6" fill="none" opacity="0.5" />
          </svg>
        ))}

        <div className="relative z-10 max-w-2xl mx-auto flex flex-col gap-12">

          {/* ── Header ── */}
          <div className="flex flex-col items-center text-center gap-5">
            <div className="wsh-reveal">
              <p
                className="text-[#3d405b] opacity-50 tracking-[0.45em] uppercase"
                style={{ fontFamily: "var(--font-amiri), serif", fontSize: "11px" }}
              >
                Ucapan & Doa
              </p>
            </div>

            <div className="wsh-reveal w-full flex items-center gap-4">
              <div className="wsh-line flex-1 h-px bg-[#3d405b] opacity-20" />
              <svg className="w-3 h-3 opacity-25 shrink-0" viewBox="0 0 12 12" fill="#3d405b">
                <path d="M6 0 L7.5 4.5 L12 6 L7.5 7.5 L6 12 L4.5 7.5 L0 6 L4.5 4.5Z" />
              </svg>
              <div className="wsh-line flex-1 h-px bg-[#3d405b] opacity-20" />
            </div>

            <div className="wsh-reveal">
              <h2
                className="text-[#3d405b] italic leading-tight"
                style={{ fontSize: "clamp(26px, 6vw, 40px)" }}
              >
                Sampaikan Doamu
              </h2>
              <p
                className="text-[#3d405b] opacity-50 mt-2 leading-relaxed"
                style={{ fontFamily: "var(--font-amiri), serif", fontSize: "13px" }}
              >
                Setiap doa dan ucapan dari Anda adalah hadiah terindah bagi kami.
              </p>
            </div>
          </div>
          {/* ── Wishes list ── */}
          <div className="wsh-reveal">
            {loading ? (
              <div className="flex justify-center py-10">
                <svg className="w-6 h-6 animate-spin opacity-30" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" stroke="#3d405b" strokeWidth="1.5" strokeDasharray="31.4" strokeDashoffset="10" />
                </svg>
              </div>
            ) : wishes.length === 0 ? (
              <p
                className="text-center text-[#3d405b] opacity-30 py-8 italic"
                style={{ fontFamily: "var(--font-amiri), serif", fontSize: "14px" }}
              >
                Belum ada ucapan. Jadilah yang pertama!
              </p>
            ) : (
              <div className="wsh-list flex flex-col gap-3">
                {wishes.map((wish) => (
                  <div key={wish.id} className="wsh-card">
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <div className="flex items-center gap-2">
                        {/* Avatar initials */}
                        <div
                          className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
                          style={{ background: "rgba(61,64,91,0.08)", color: "#3d405b" }}
                        >
                          <span style={{ fontSize: "12px", fontFamily: "var(--font-amiri), serif" }}>
                            {wish.senderName.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <div>
                          <p
                            className="text-[#3d405b] font-medium"
                            style={{ fontSize: "13px" }}
                          >
                            {wish.senderName}
                          </p>
                          <p
                            className="text-[#3d405b] opacity-35"
                            style={{ fontFamily: "var(--font-amiri), serif", fontSize: "10px" }}
                          >
                            {formatDate(wish.createdAt)}
                          </p>
                        </div>
                      </div>

                      {/* Attendance badge */}
                      {ATTENDANCE_LABEL[wish.attendance] && (
                        <span
                          className="shrink-0 tracking-[0.2em] uppercase"
                          style={{
                            fontFamily: "var(--font-amiri), serif",
                            fontSize: "9px",
                            color: ATTENDANCE_LABEL[wish.attendance].color,
                          }}
                        >
                          {ATTENDANCE_LABEL[wish.attendance].label}
                        </span>
                      )}
                    </div>

                    <p
                      className="text-[#3d405b] opacity-70 leading-relaxed italic"
                      style={{ fontFamily: "var(--font-amiri), serif", fontSize: "13px" }}
                    >
                      &ldquo;{wish.message}&rdquo;
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* ── Form ── */}
          <div className="wsh-reveal flex flex-col gap-4">
            {submitted ? (
              /* Success state */
              <div className="wsh-check flex flex-col items-center gap-4 py-8">
                <svg className="w-12 h-12" viewBox="0 0 48 48" fill="none">
                  <circle cx="24" cy="24" r="22" stroke="#3d405b" strokeWidth="1" opacity="0.3" />
                  <path d="M14 24 L21 31 L34 17" stroke="#3d405b" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <p
                  className="text-[#3d405b] italic text-center"
                  style={{ fontFamily: "var(--font-amiri), serif", fontSize: "16px" }}
                >
                ucapan Anda telah tersampaikan.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="text-[#3d405b] opacity-40 hover:opacity-70 transition-opacity"
                  style={{ fontFamily: "var(--font-amiri), serif", fontSize: "11px", letterSpacing: "0.3em" }}
                >
                  KIRIM LAGI
                </button>
              </div>
            ) : (
              <>
                {/* Name */}
                <input
                  type="text"
                  className="wsh-input"
                  placeholder="Nama Anda"
                  value={form.senderName}
                  onChange={(e) => setForm((f) => ({ ...f, senderName: e.target.value }))}
                  maxLength={60}
                />

                {/* Message */}
                <textarea
                  className="wsh-input"
                  placeholder="Tuliskan ucapan dan doa untuk kedua mempelai..."
                  rows={4}
                  value={form.message}
                  onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                  maxLength={500}
                />

                {/* Attendance */}
                <div>
                  <p
                    className="text-[#3d405b] opacity-40 mb-2 tracking-[0.3em] uppercase"
                    style={{ fontFamily: "var(--font-amiri), serif", fontSize: "10px" }}
                  >
                    Konfirmasi Kehadiran
                  </p>
                  <div className="flex gap-2">
                    {ATTENDANCE_OPTIONS.map((opt) => (
                      <button
                        key={opt.value}
                        className={`wsh-pill${form.attendance === opt.value ? " active" : ""}`}
                        onClick={() => setForm((f) => ({ ...f, attendance: opt.value }))}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Error */}
                {error && (
                  <p
                    className="text-[#3d405b] opacity-60"
                    style={{ fontFamily: "var(--font-amiri), serif", fontSize: "12px" }}
                  >
                    ⚠ {error}
                  </p>
                )}

                {/* Submit */}
                <button
                  className="wsh-submit"
                  onClick={handleSubmit}
                  disabled={submitting}
                >
                  <span>{submitting ? "Mengirim..." : "Kirim Ucapan"}</span>
                </button>
              </>
            )}
          </div>

          {/* ── Divider ── */}
          <div className="wsh-reveal flex items-center gap-4">
            <div className="wsh-line flex-1 h-px bg-[#3d405b] opacity-15" />
            <p
              className="text-[#3d405b] opacity-35 tracking-[0.35em] uppercase shrink-0"
              style={{ fontFamily: "var(--font-amiri), serif", fontSize: "10px" }}
            >
              {loading ? "..." : `${wishes.length} Ucapan`}
            </p>
            <div className="wsh-line flex-1 h-px bg-[#3d405b] opacity-15" />
          </div>

          

        </div>
      </section>
    </>
  );
}