import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    await prisma.guest.delete({
      where: { id: Number(id) },
    });

    return NextResponse.json({ message: "Guest deleted" });
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}