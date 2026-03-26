"use client";

import { useState } from "react";
import { useScrollReveal } from "../hooks/useScrollReveal.ts";

interface Props {
  data: { rsvpWhatsApp: string };
  guestName: string;
}

export default function RSVPSection({ data, guestName }: Props) {
  const { ref, inView } = useScrollReveal();
  const [name, setName] = useState(guestName !== "Tamu Undangan" ? guestName : "");
  const [attendance, setAttendance] = useState<"hadir" | "tidak" | "">("");
  const [guests, setGuests] = useState("1");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (!name || !attendance) return;
    const attendText = attendance === "hadir" ? `Hadir (${guests} orang)` : "Tidak dapat hadir";
    const waText = `Assalamu'alaikum,\n\nSaya *${name}* ingin mengkonfirmasi kehadiran:\n*Status:* ${attendText}${message ? `\n*Pesan:* ${message}` : ""}\n\nUntuk pernikahan Rizky & Anisa, 14 Juni 2025.`;
    const url = `https://wa.me/${data.rsvpWhatsApp}?text=${encodeURIComponent(waText)}`;
    window.open(url, "_blank");
    setSubmitted(true);
  };

  return (
    <section className="py-20 px-6 bg-[#f4f1de]">
      <div
        ref={ref}
        className={`max-w-lg mx-auto transition-all duration-1000 ${
          inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <div className="text-center mb-10">
          <p className="text-[#3d405b] text-xs tracking-[0.4em] uppercase opacity-60 mb-3">RSVP</p>
          <h2 className="font-bright-dusty text-4xl text-[#3d405b] mb-4">Konfirmasi Kehadiran</h2>
          <div className="flex items-center justify-center gap-3">
            <div className="h-px w-16 bg-[#f2cc8f]" />
            <div className="w-1.5 h-1.5 rounded-full bg-[#f2cc8f]" />
            <div className="h-px w-16 bg-[#f2cc8f]" />
          </div>
        </div>

        {submitted ? (
          <div className="text-center py-12">
            <div className="text-[#f2cc8f] flex justify-center mb-4">
              <svg className="w-16 h-16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="font-bright-dusty text-3xl text-[#3d405b] mb-2">Terima Kasih!</h3>
            <p className="text-[#3d405b] opacity-60 text-sm">Konfirmasi Anda sangat berarti bagi kami.</p>
          </div>
        ) : (
          <div className="space-y-5">
            {/* Name */}
            <div>
              <label className="block text-[#3d405b] text-xs tracking-widest uppercase opacity-60 mb-2">
                Nama Lengkap
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Masukkan nama Anda"
                className="w-full px-4 py-3 bg-transparent border border-[#3d405b] border-opacity-20 text-[#3d405b] placeholder-[#3d405b] placeholder-opacity-30 text-sm focus:outline-none focus:border-opacity-60 transition-all"
              />
            </div>

            {/* Attendance */}
            <div>
              <label className="block text-[#3d405b] text-xs tracking-widest uppercase opacity-60 mb-2">
                Konfirmasi Kehadiran
              </label>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { value: "hadir", label: "✓ Insya Allah Hadir" },
                  { value: "tidak", label: "✗ Tidak Dapat Hadir" },
                ].map(({ value, label }) => (
                  <button
                    key={value}
                    onClick={() => setAttendance(value as "hadir" | "tidak")}
                    className={`py-3 text-sm transition-all duration-300 ${
                      attendance === value
                        ? "bg-[#3d405b] text-[#f4f1de]"
                        : "border border-[#3d405b] border-opacity-20 text-[#3d405b] opacity-60 hover:opacity-100"
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {/* Guest count */}
            {attendance === "hadir" && (
              <div>
                <label className="block text-[#3d405b] text-xs tracking-widest uppercase opacity-60 mb-2">
                  Jumlah Tamu
                </label>
                <select
                  value={guests}
                  onChange={(e) => setGuests(e.target.value)}
                  className="w-full px-4 py-3 bg-transparent border border-[#3d405b] border-opacity-20 text-[#3d405b] text-sm focus:outline-none focus:border-opacity-60 transition-all appearance-none cursor-pointer"
                >
                  {["1", "2", "3", "4", "5+"].map((n) => (
                    <option key={n} value={n} className="bg-[#f4f1de]">
                      {n} orang
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Message */}
            <div>
              <label className="block text-[#3d405b] text-xs tracking-widest uppercase opacity-60 mb-2">
                Doa & Ucapan (opsional)
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Sampaikan doa dan ucapan terbaik Anda..."
                rows={3}
                className="w-full px-4 py-3 bg-transparent border border-[#3d405b] border-opacity-20 text-[#3d405b] placeholder-[#3d405b] placeholder-opacity-30 text-sm focus:outline-none focus:border-opacity-60 transition-all resize-none"
              />
            </div>

            <button
              onClick={handleSubmit}
              disabled={!name || !attendance}
              className={`w-full py-4 flex items-center justify-center gap-3 text-sm tracking-widest uppercase transition-all duration-300 ${
                name && attendance
                  ? "bg-[#3d405b] text-[#f4f1de] hover:bg-opacity-90 cursor-pointer"
                  : "bg-[#3d405b] bg-opacity-20 text-[#3d405b] opacity-30 cursor-not-allowed"
              }`}
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 16.575c-.247.696-1.457 1.334-2.017 1.416-.511.074-1.155.103-1.865-.121-.432-.134-.984-.317-1.692-.623C9.33 16.016 7.39 13.02 7.242 12.822c-.148-.198-1.207-1.606-1.207-3.063 0-1.457.764-2.173 1.034-2.469.271-.297.591-.371.788-.371.197 0 .394.002.567.01.181.008.424-.069.664.507.247.595.839 2.048.914 2.196.075.148.124.321-.024.518-.099.198-.148.321-.296.494-.148.173-.312.387-.446.52-.149.149-.303.307-.13.604.173.297.769 1.268 1.65 2.054 1.133 1.01 2.089 1.322 2.385 1.471.297.148.47.124.643-.075.173-.198.744-.866.941-1.163.198-.297.396-.248.669-.148.272.099 1.73.816 2.027.965.296.149.494.223.567.347.074.124.074.72-.173 1.412z" />
              </svg>
              Kirim via WhatsApp
            </button>
          </div>
        )}
      </div>
    </section>
  );
}