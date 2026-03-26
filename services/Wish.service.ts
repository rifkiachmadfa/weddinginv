import { wishRepository, CreateWishInput } from "@/repositories/Wish.Repository";

const VALID_ATTENDANCE = ["hadir", "tidak_hadir", "mungkin"] as const;
type Attendance = (typeof VALID_ATTENDANCE)[number];

function isValidAttendance(value: string): value is Attendance {
  return (VALID_ATTENDANCE as readonly string[]).includes(value);
}

export const wishService = {
  async addWish(data: CreateWishInput) {
    const senderName = data.senderName.trim();
    const message = data.message.trim();

    if (!senderName || senderName.length < 2) {
      throw new Error("Nama pengirim minimal 2 karakter.");
    }
    if (!message || message.length < 5) {
      throw new Error("Pesan ucapan minimal 5 karakter.");
    }
    if (!isValidAttendance(data.attendance)) {
      throw new Error("Status kehadiran tidak valid.");
    }

    return wishRepository.create({ senderName, message, attendance: data.attendance });
  },

  async getAllWishes() {
    return wishRepository.findAll();
  },
};