"use client";

import { useState } from "react";
import { useScrollReveal } from "../hooks/useScrollReveal";

interface Props {
  data: {
    gift: {
      address: string;
      contactPerson: string;
      contactPhone: string;
      bankAccounts: { bank: string; accountNumber: string; accountName: string }[];
    };
  };
}

export default function GiftSection({ data }: Props) {
  const { ref, inView } = useScrollReveal();

  return (
    <section className="py-20 px-6 bg-[#3d405b]">
      <div
        ref={ref}
        className={`max-w-3xl mx-auto transition-all duration-1000 ${
          inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <div className="text-center mb-12">
          <p className="text-[#f2cc8f] text-xs tracking-[0.4em] uppercase opacity-80 mb-3">
            Hadiah & Kado
          </p>
          <h2 className="font-bright-dusty text-4xl md:text-5xl text-[#f4f1de] mb-4">
            Tanda Kasih
          </h2>
          <div className="flex items-center justify-center gap-3">
            <div className="h-px w-16 bg-[#f2cc8f] opacity-60" />
            <div className="w-1.5 h-1.5 rounded-full bg-[#f2cc8f] opacity-60" />
            <div className="h-px w-16 bg-[#f2cc8f] opacity-60" />
          </div>
          <p className="text-[#f4f1de] opacity-50 text-sm mt-4 max-w-sm mx-auto">
            Doa dan kehadiran Anda sudah merupakan hadiah terbaik bagi kami. Namun jika berkenan, silakan kirimkan melalui:
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Alamat kado */}
          <div className="border border-[#f2cc8f] border-opacity-20 p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="text-[#f2cc8f]">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <h3 className="text-[#f2cc8f] text-xs tracking-widest uppercase font-medium">Alamat Kado</h3>
            </div>
            <p className="text-[#f4f1de] text-sm leading-relaxed opacity-80 mb-4">{data.gift.address}</p>
            <div className="border-t border-[#f2cc8f] border-opacity-20 pt-4">
              <p className="text-[#f4f1de] opacity-50 text-xs">Contact Person</p>
              <p className="text-[#f4f1de] opacity-80 text-sm">{data.gift.contactPerson}</p>
              <p className="text-[#f2cc8f] text-sm">{data.gift.contactPhone}</p>
            </div>
          </div>

          {/* Bank accounts */}
          <div className="space-y-4">
            {data.gift.bankAccounts.map((acc) => (
              <BankCard key={acc.bank} account={acc} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function BankCard({
  account,
}: {
  account: { bank: string; accountNumber: string; accountName: string };
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(account.accountNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="border border-[#f2cc8f] border-opacity-20 p-5 hover:border-opacity-40 transition-all duration-300">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-[#f2cc8f] font-bold text-lg tracking-widest mb-1">{account.bank}</p>
          <p className="text-[#f4f1de] text-sm opacity-60 mb-2">{account.accountName}</p>
          <p className="text-[#f4f1de] font-mono text-xl tracking-widest">{account.accountNumber}</p>
        </div>
        <button
          onClick={handleCopy}
          className={`flex items-center gap-2 px-3 py-2 text-xs tracking-widest uppercase transition-all duration-300 ${
            copied
              ? "bg-[#f2cc8f] text-[#3d405b]"
              : "border border-[#f2cc8f] border-opacity-40 text-[#f2cc8f] hover:bg-[#f2cc8f] hover:text-[#3d405b]"
          }`}
        >
          {copied ? (
            <>
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              Tersalin!
            </>
          ) : (
            <>
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              Salin
            </>
          )}
        </button>
      </div>
    </div>
  );
}