import { prisma } from '@/lib/prisma';
import { getT } from '@/lib/i18n-server';
import { NextResponse } from 'next/server';

// The public contact form. Admins read and reply on the admin site.
export async function POST(req) {
  const t = await getT();

  try {
    const { name, email, phone, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { message: t('All fields are required.', 'กรุณากรอกข้อมูลให้ครบทุกช่อง') },
        { status: 400 }
      );
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      return NextResponse.json(
        { message: t('Invalid email format.', 'รูปแบบอีเมลไม่ถูกต้อง') },
        { status: 400 }
      );
    }

    const contactForm = await prisma.contactForm.create({
      data: { name, email, phone: phone || null, message },
      select: { id: true },
    });

    return NextResponse.json(contactForm, { status: 201 });
  } catch (error) {
    console.error('Error creating contact form:', error);
    return NextResponse.json(
      { message: t('An error occurred while submitting the form.', 'เกิดข้อผิดพลาดระหว่างการส่งข้อความ') },
      { status: 500 }
    );
  }
}
