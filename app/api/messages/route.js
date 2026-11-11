import { prisma } from '@/lib/prisma';
import { getT } from '@/lib/i18n-server';
import { getUserId } from '@/lib/auth';
import { NextResponse } from 'next/server';

// The signed-in user's own contact messages and any admin replies. Messages
// are linked to a user by email, since ContactForm has no userId.
export async function GET(req) {
  const t = await getT();

  try {
    const userId = getUserId(req);
    if (!userId) {
      return NextResponse.json({ message: t('Invalid or expired session.', 'เซสชันไม่ถูกต้องหรือหมดอายุ กรุณาเข้าสู่ระบบใหม่') }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
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
    return NextResponse.json({ message: t('An error occurred.', 'เกิดข้อผิดพลาด'), }, { status: 500 });
  }
}
