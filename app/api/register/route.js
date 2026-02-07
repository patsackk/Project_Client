import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export async function POST(req) {
  try {
    // Log request information for debugging
    console.log('Incoming POST request');

    // Parse the JSON body
    const { name, email, password } = await req.json();

    // Basic validation
    if (!name || !email || !password) {
      return new Response(
        JSON.stringify({ message: 'All fields are required.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Validate email format
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      return new Response(
        JSON.stringify({ message: 'Invalid email format.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Check if the email already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return new Response(
        JSON.stringify({ message: 'Email is already taken.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user in the database
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    // Respond with success
    console.log('User created successfully:', user);
    return new Response(
      JSON.stringify({ message: 'User registered successfully!', user }),
      { status: 201, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error during registration:', error);
    return new Response(
      JSON.stringify({
        message: 'An error occurred while registering the user.',
        error: error.message,
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  } finally {
    // Disconnect Prisma client
    await prisma.$disconnect();
  }
}
