import { prisma } from '@/lib/prisma';
import { getT } from '@/lib/i18n-server';
import { getUserId } from '@/lib/auth';
import { NextResponse } from 'next/server';

export async function GET(req) {
  const t = await getT();

  try {
    const userId = getUserId(req);
    if (!userId) {
      return NextResponse.json({ message: t('Invalid or expired session.', 'เซสชันไม่ถูกต้องหรือหมดอายุ กรุณาเข้าสู่ระบบใหม่') }, { status: 401 });
    }

    const client = await prisma.client.findUnique({
      where: { userId },
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
    return NextResponse.json({ message: t('An error occurred.', 'เกิดข้อผิดพลาด'), }, { status: 500 });
  }
}
