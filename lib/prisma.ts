import { PrismaClient } from '@prisma/client';

// One shared client for the whole app (pages and API routes). Password
// hashes are left out of every query by default, so nothing can send one to
// the browser; the login route asks for it with `omit: { password: false }`.
const createClient = () => new PrismaClient({ omit: { user: { password: true } } });

const globalForPrisma = global as unknown as { prisma?: ReturnType<typeof createClient> };

export const prisma = globalForPrisma.prisma ?? createClient();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
