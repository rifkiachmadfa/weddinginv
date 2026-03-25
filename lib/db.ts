import { PrismaClient } from "@/app/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";



const adapter = new PrismaPg({
    connectionString: process.env.DATABASE_URL!,
})

const prismaCLientsingleton = () => {
    return new PrismaClient({adapter});
}

declare const globalThis: {
    prismaglobal?: ReturnType<typeof prismaCLientsingleton>;
} & typeof global;
const prisma = globalThis.prismaglobal ?? prismaCLientsingleton();

export default prisma;
if(process.env.NODE_ENV !== "production") {
    globalThis.prismaglobal = prisma;
}