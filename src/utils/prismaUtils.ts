import { PrismaClient } from "@prisma/client";
import { PrismaClientOptions } from "@prisma/client/runtime";

let prisma: PrismaClient<PrismaClientOptions>;

export const getPrisma = () => {
  if (!prisma) {
    prisma = new PrismaClient();
  }

  return prisma;
};
