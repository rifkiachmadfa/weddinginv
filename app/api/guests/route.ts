import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function GET() {
  try {
    const guests = await prisma.guest.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(guests);
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { name, phone } = await req.json();

    if (!name?.trim() || !phone?.trim()) {
      return NextResponse.json({ error: "name and phone are required" }, { status: 400 });
    }

    // Auto-generate slug dari nama
    const baseSlug = name
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "");

    // Pastikan slug unik
    let slug = baseSlug;
    let count = 1;
    while (await prisma.guest.findUnique({ where: { slug } })) {
      slug = `${baseSlug}-${count++}`;
    }

    const guest = await prisma.guest.create({
      data: { name, phone, slug },
    });

    return NextResponse.json(guest, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}