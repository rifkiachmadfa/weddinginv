import prisma from "@/lib/db";

export interface CreateWishInput {
  senderName: string;
  message: string;
  attendance: string;
}

export const wishRepository = {
  async create(data: CreateWishInput) {
    return prisma.wish.create({ data });
  },

  async findAll() {
    return prisma.wish.findMany({
      orderBy: { createdAt: "desc" },
    });
  },

  async count() {
    return prisma.wish.count();
  },
};