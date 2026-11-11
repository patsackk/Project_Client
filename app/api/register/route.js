import { prisma } from '@/lib/prisma';
import { getT } from '@/lib/i18n-server';
import bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server';

export async function POST(req) {
  const t = await getT();

  try {
    const { name, email, phone, address, password } = await req.json();

    if (!name || !email || !phone || !address || !password) {
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

    const existingUser = await prisma.user.findUnique({ where: { email } });

    if (existingUser) {
      return NextResponse.json(
        { message: t('Email is already taken.', 'อีเมลนี้ถูกใช้งานแล้ว') },
        { status: 400 }
      );
    }

    // role is always the schema default ("client") — never taken from the form.
    const user = await prisma.user.create({
      data: {
        name,
        email,
        phone,
        address,
        password: await bcrypt.hash(password, 10),
      },
      select: { id: true, name: true, email: true },
    });

    return NextResponse.json(
      { message: t('User registered successfully!', 'สมัครสมาชิกสำเร็จ!'), user },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error during registration:', error);
    return NextResponse.json(
      { message: t('An error occurred while registering the user.', 'เกิดข้อผิดพลาดระหว่างการสมัครสมาชิก') },
      { status: 500 }
    );
  }
}
