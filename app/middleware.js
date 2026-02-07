import { NextResponse } from 'next/server';

export function middleware(req) {
  const token = req.cookies.get('admin-token');

  if (!token || token !== process.env.NEXT_PUBLIC_ADMIN_TOKEN) {
    // Redirect to admin login if not authenticated
    return NextResponse.redirect(new URL('/admin/login', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/properties/:path*'], // Apply middleware to admin properties
};
