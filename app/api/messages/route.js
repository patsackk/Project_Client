import { PrismaClient } from '@prisma/client';
import { getT } from '@/lib/i18n-server';
import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

// The signed-in user's own contact messages and any admin replies. Messages
// are linked to a user by email, since ContactForm has no userId.
export async function GET(req) {
  const t = await getT();

  try {
    const authHeader = req.headers.get('authorization') || '';
    const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;

    if (!token) {
      return NextResponse.json({ message: t('Not authenticated.', 'กรุณาเข้าสู่ระบบ') }, { status: 401 });
    }

    let payload;
    try {
      payload = jwt.verify(token, process.env.JWT_SECRET || 'default_secret_key');
    } catch {
      return NextResponse.json({ message: t('Invalid or expired session.', 'เซสชันไม่ถูกต้องหรือหมดอายุ กรุณาเข้าสู่ระบบใหม่') }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { id: payload.userId },
      select: { name: true, email: true, phone: true },
    });

    if (!user) {
      return NextResponse.json({ message: t('User not found.', 'ไม่พบผู้ใช้') }, { status: 404 });
    }

    const messages = await prisma.contactForm.findMany({
      where: { email: user.email },
      orderBy: { createdAt: 'desc' },
      select: { id: true, message: true, createdAt: true, reply: true, repliedAt: true },
    });

    return NextResponse.json({ user, messages });
  } catch (error) {
    console.error('Error fetching messages:', error);
    return NextResponse.json({ message: t('An error occurred.', 'เกิดข้อผิดพลาด'), error: error.message }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
