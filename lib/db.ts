import { PrismaClient } from "@prisma/client";

// add prisma to the NodeJS global type
interface CustomNodeJsGlobal extends Global {
  prisma: PrismaClient;
}

// Prevent multiple instances of Prisma Client in development
declare const global: CustomNodeJsGlobal;

const db = global.prisma || new PrismaClient();

export default db;
