import { prisma } from '@/lib/prisma';
import { getT } from '@/lib/i18n-server';
import { signLoginToken } from '@/lib/auth';
import bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server';

export async function POST(req) {
  const t = await getT();

  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { message: t('Email and password are required.', 'กรุณากรอกอีเมลและรหัสผ่าน') },
        { status: 400 }
      );
    }

    // The password hash is hidden by default (lib/prisma.ts) — ask for it here only.
    const user = await prisma.user.findUnique({
      where: { email },
      omit: { password: false },
    });

    if (!user) {
      return NextResponse.json(
        { message: t('Invalid email or password.', 'อีเมลหรือรหัสผ่านไม่ถูกต้อง') },
        { status: 401 }
      );
    }

    // Contacts the team added on the admin site have no password, so they
    // can't sign in here until one is set for them.
    if (!user.password) {
      return NextResponse.json(
        {
          message: t(
            'This account was set up by our team and has no password yet. Please contact us to get access.',
            'บัญชีนี้สร้างโดยทีมงานและยังไม่มีรหัสผ่าน กรุณาติดต่อเราเพื่อขอเข้าใช้งาน'
          ),
        },
        { status: 401 }
      );
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return NextResponse.json(
        { message: t('Invalid email or password.', 'อีเมลหรือรหัสผ่านไม่ถูกต้อง') },
        { status: 401 }
      );
    }

    return NextResponse.json(
      {
        message: t('Login successful!', 'เข้าสู่ระบบสำเร็จ!'),
        token: signLoginToken(user.id),
        user: { id: user.id, name: user.name, email: user.email },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error during login:', error);
    return NextResponse.json(
      { message: t('An error occurred during login.', 'เกิดข้อผิดพลาดระหว่างการเข้าสู่ระบบ') },
      { status: 500 }
    );
  }
}
