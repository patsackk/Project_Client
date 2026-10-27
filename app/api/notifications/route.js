import { PrismaClient } from '@prisma/client';
import { getT } from '@/lib/i18n-server';
import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

const LIMIT = 10;

const STATUS_TH = {
  'Not Started': 'ยังไม่เริ่ม',
  'In Progress': 'กำลังดำเนินการ',
  Completed: 'เสร็จสมบูรณ์',
};

// Client notifications: published status updates for the signed-in user's
// project, plus admin replies to contact messages sent from their email.
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
      include: {
        client: {
          include: {
            statusUpdates: {
              where: { isDraft: false },
              orderBy: { createdAt: 'desc' },
              take: LIMIT,
            },
          },
        },
      },
    });

    if (!user) {
      return NextResponse.json({ message: t('User not found.', 'ไม่พบผู้ใช้') }, { status: 404 });
    }

    const replies = await prisma.contactForm.findMany({
      where: { email: user.email, reply: { not: null } },
      orderBy: { repliedAt: 'desc' },
      take: LIMIT,
    });

    const notifications = [
      ...(user.client?.statusUpdates ?? []).map((u) => ({
        id: `status-${u.id}`,
        type: 'status',
        title: t(
          `Project update: ${u.status} (${u.percentComplete}%)`,
          `อัปเดตโครงการ: ${STATUS_TH[u.status] ?? u.status} (${u.percentComplete}%)`
        ),
        body: u.notes,
        href: '/track',
        createdAt: u.createdAt,
      })),
      ...replies.map((m) => ({
        id: `reply-${m.id}`,
        type: 'reply',
        title: t('Admin replied to your message', 'ผู้ดูแลตอบกลับข้อความของคุณ'),
        body: m.reply,
        href: `/messages#message-${m.id}`,
        createdAt: m.repliedAt ?? m.createdAt,
      })),
    ]
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, LIMIT);

    return NextResponse.json({ notifications });
  } catch (error) {
    console.error('Error fetching notifications:', error);
    return NextResponse.json({ message: t('An error occurred.', 'เกิดข้อผิดพลาด'), error: error.message }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
