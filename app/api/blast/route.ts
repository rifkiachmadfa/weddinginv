import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const { guestId } = await req.json();

    const guest = await prisma.guest.findUnique({
      where: { id: Number(guestId) },
    });

    if (!guest) {
      return NextResponse.json({ error: "Guest not found" }, { status: 404 });
    }

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000";
    const invitationUrl = `${baseUrl}/invitation/${guest.slug}`;

    const message =
    `*Assalamu'alaikum Wr. Wb.*\n\n` +
    `Kepada Yth.\n*${guest.name}*\n\n` +
    `_Kami percaya bahwa setiap pertemuan adalah takdir, dan setiap pasangan adalah amanah. Dengan ridha-Nya, kami memulai perjalanan ini, dalam ikatan suci yang penuh keberkahan.🕊️_\n\n` +
    `Dengan memohon rahmat dan ridho Allah Subhanahuwata'ala, kami bermaksud mengundang *${guest.name}* untuk menghadiri acara pernikahan kami.\n\n` +
    `*Berikut link undangan digital untuk ${guest.name}:*\n` +
    `${invitationUrl}\n\n` +
    `Merupakan suatu kehormatan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir dan memberikan doa restu.\n\n` +
    `*Wassalamu'alaikum Wr. Wb.*\n` +
    `Rifki & Ayu 💍`;

    const phone = guest.phone
      .replace(/\D/g, "")
      .replace(/^0/, "62");
      console.log("TOKEN:", process.env.FONNTE_TOKEN);
    const res = await fetch("https://api.fonnte.com/send", {
      method: "POST",
      headers: {
        "Authorization": process.env.FONNTE_TOKEN!,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        target: phone,
        message,
        countryCode: "62",
      }),
    });

    const data = await res.json();

    if (!res.ok || !data.status) {
      console.error("Fonnte error:", data);
      return NextResponse.json({ error: data.reason ?? "Gagal kirim pesan" }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}