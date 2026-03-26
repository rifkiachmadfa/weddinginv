"use client";

import { useState } from "react";
import { motion, type Variants } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Copy, Check, Gift } from "lucide-react";

interface Props {
  data: {
    gift: {
      address: string;
      bankAccounts: { bank: string; accountNumber: string; accountName: string }[];
    };
  };
}

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

function BankCard({ account }: { account: { bank: string; accountNumber: string; accountName: string } }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(account.accountNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div variants={fadeUp} transition={{ duration: 0.7, ease: "easeOut" }}>
      <Card className="bg-[#f4f1de]/5 border-[#f4f1de]/10 rounded-2xl shadow-none">
        <CardContent className="p-6">
          <div className="flex items-center justify-between gap-4">
            <div className="flex flex-col gap-1">
              <p className="text-[#f2cc8f] text-xs tracking-[0.4em] uppercase">
                {account.bank}
              </p>
              <p className="text-[#f4f1de]/50 text-xs">{account.accountName}</p>
              <p className="text-[#f4f1de] font-mono text-xl tracking-widest mt-1">
                {account.accountNumber}
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={handleCopy}
              className={`shrink-0 rounded-full border transition-all duration-300 gap-2 text-xs tracking-widest ${
                copied
                  ? "bg-[#f2cc8f] border-[#f2cc8f] text-[#3d405b] hover:bg-[#f2cc8f]"
                  : "bg-transparent border-[#f4f1de]/20 text-[#f4f1de]/60 hover:bg-[#f4f1de]/10 hover:text-[#f4f1de] hover:border-[#f4f1de]/40"
              }`}
            >
              {copied ? (
                <>
                  <Check className="w-3 h-3" />
                  Tersalin
                </>
              ) : (
                <>
                  <Copy className="w-3 h-3" />
                  Salin
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export default function GiftSection({ data }: Props) {
  const [addressCopied, setAddressCopied] = useState(false);

  const handleCopyAddress = async () => {
    await navigator.clipboard.writeText(data.gift.address);
    setAddressCopied(true);
    setTimeout(() => setAddressCopied(false), 2000);
  };

  return (
    <section className="py-24 px-6 bg-[#3d405b] overflow-hidden">
      <motion.div
        className="max-w-2xl mx-auto"
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0 }}
      >
        {/* Header */}
        <motion.div variants={fadeUp} transition={{ duration: 0.7, ease: "easeOut" }} className="text-center mb-14">
          <p className="text-[#f2cc8f]/60 text-[10px] tracking-[0.6em] uppercase mb-3">
            Hadiah & Kado
          </p>
          <h2 className="font-bright-dusty text-5xl md:text-6xl text-[#f4f1de]">
            Tanda Kasih
          </h2>
          <div className="flex items-center gap-3 justify-center mt-5">
            <div className="h-px w-12 bg-[#f4f1de]/15" />
            <div className="w-1 h-1 rounded-full bg-[#f2cc8f]/40" />
            <div className="h-px w-24 bg-[#f4f1de]/15" />
            <div className="w-1 h-1 rounded-full bg-[#f2cc8f]/40" />
            <div className="h-px w-12 bg-[#f4f1de]/15" />
          </div>
          <p className="text-[#f4f1de]/40 text-sm mt-6 max-w-sm mx-auto leading-relaxed">
            Doa dan kehadiran Anda sudah merupakan hadiah terbaik bagi kami. Namun jika berkenan, silakan kirimkan melalui:
          </p>
        </motion.div>

        {/* Alamat kado */}
        <motion.div variants={fadeUp} transition={{ duration: 0.7, ease: "easeOut" }} className="mb-6">
          <Card className="bg-[#f4f1de]/5 border-[#f4f1de]/10 rounded-2xl shadow-none">
            <CardContent className="p-6">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-4 flex-1 min-w-0">
                  <div className="w-8 h-8 rounded-full bg-[#f2cc8f]/10 flex items-center justify-center shrink-0 mt-0.5">
                    <Gift className="w-4 h-4 text-[#f2cc8f]/70" />
                  </div>
                  <div className="flex flex-col gap-1 min-w-0">
                    <p className="text-[#f2cc8f]/60 text-[10px] tracking-[0.4em] uppercase">
                      Alamat Pengiriman Kado
                    </p>
                    <p className="text-[#f4f1de]/70 text-sm leading-relaxed mt-1">
                      {data.gift.address}
                    </p>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleCopyAddress}
                  className={`shrink-0 rounded-full border transition-all duration-300 gap-2 text-xs tracking-widest self-center ${
                    addressCopied
                      ? "bg-[#f2cc8f] border-[#f2cc8f] text-[#3d405b] hover:bg-[#f2cc8f]"
                      : "bg-transparent border-[#f4f1de]/20 text-[#f4f1de]/60 hover:bg-[#f4f1de]/10 hover:text-[#f4f1de] hover:border-[#f4f1de]/40"
                  }`}
                >
                  {addressCopied ? (
                    <>
                      <Check className="w-3 h-3" />
                      Tersalin
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      Salin
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Divider */}
        <motion.div variants={fadeUp} transition={{ duration: 0.7, ease: "easeOut" }} className="flex items-center gap-4 my-8">
          <Separator className="bg-[#f4f1de]/10 flex-1" />
          <p className="text-[#f4f1de]/30 text-[10px] tracking-[0.4em] uppercase shrink-0">
            atau transfer via
          </p>
          <Separator className="bg-[#f4f1de]/10 flex-1" />
        </motion.div>

        {/* Bank accounts */}
        <div className="flex flex-col gap-4">
          {data.gift.bankAccounts.map((acc) => (
            <BankCard key={acc.bank} account={acc} />
          ))}
        </div>

      </motion.div>
    </section>
  );
}