import { NextRequest, NextResponse } from "next/server";
import { wishService } from "@/services/Wish.service";

// GET /api/wishes — ambil semua ucapan
export async function GET() {
  try {
    const wishes = await wishService.getAllWishes();
    return NextResponse.json({ success: true, data: wishes });
  } catch (error) {
    console.error("[GET /api/wishes]", error);
    return NextResponse.json(
      { success: false, message: "Gagal mengambil data ucapan." },
      { status: 500 }
    );
  }
}

// POST /api/wishes — kirim ucapan baru
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { senderName, message, attendance } = body;

    const wish = await wishService.addWish({ senderName, message, attendance });
    return NextResponse.json({ success: true, data: wish }, { status: 201 });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Gagal menyimpan ucapan.";
    return NextResponse.json({ success: false, message }, { status: 400 });
  }
}