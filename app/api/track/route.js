import { PrismaClient } from '@prisma/client';
import { getT } from '@/lib/i18n-server';
import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

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

    const client = await prisma.client.findUnique({
      where: { userId: payload.userId },
      include: {
        project: true,
        statusUpdates: {
          where: { isDraft: false },
          orderBy: { createdAt: 'desc' },
          take: 1,
        },
      },
    });

    if (!client) {
      return NextResponse.json({ hasClient: false });
    }

    const latest = client.statusUpdates[0] || null;

    return NextResponse.json({
      hasClient: true,
      project: client.project ? { name: client.project.name, location: client.project.location } : null,
      update: latest
        ? {
            status: latest.status,
            percentComplete: latest.percentComplete,
            notes: latest.notes,
            photos: latest.photos,
            createdAt: latest.createdAt,
          }
        : null,
    });
  } catch (error) {
    console.error('Error fetching track status:', error);
    return NextResponse.json({ message: t('An error occurred.', 'เกิดข้อผิดพลาด'), error: error.message }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
