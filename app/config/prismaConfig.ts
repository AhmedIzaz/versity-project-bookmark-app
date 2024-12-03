import { PrismaClient } from "@prisma/client";

const globalPrisma = new PrismaClient();
export default globalPrisma;
