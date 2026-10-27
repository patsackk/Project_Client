import { PrismaClient } from '@prisma/client';

// One shared client for Server Components. (The API routes still create
// their own, as they always have.)
const globalForPrisma = global as unknown as { prisma?: PrismaClient };

export const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
