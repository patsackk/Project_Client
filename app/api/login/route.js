import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'; // Optional for token-based authentication
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function POST(req) {
  try {
    // Parse the request body
    const { email, password } = await req.json();

    // Validate the input
    if (!email || !password) {
      return NextResponse.json(
        { message: 'Email and password are required.' },
        { status: 400 }
      );
    }

    // Find the user by email
    const user = await prisma.user.findUnique({
      where: { email },
    });

    // Check if the user exists
    if (!user) {
      return NextResponse.json(
        { message: 'Invalid email or password.' },
        { status: 401 }
      );
    }

    // Compare the provided password with the hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return NextResponse.json(
        { message: 'Invalid email or password.' },
        { status: 401 }
      );
    }

    // Optional: Generate a JWT token
    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET || 'default_secret_key',
      { expiresIn: '1h' }
    );

    // Return success response with the token
    return NextResponse.json(
      { message: 'Login successful!', token, user },
      { status: 200 }
    );
    
  } catch (error) {
    console.error('Error during login:', error);
    return NextResponse.json(
      { message: 'An error occurred during login.', error: error.message },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect(); // Disconnect Prisma client after the operation
  }
}