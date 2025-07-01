// File: app/api/user/route.ts
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

// API untuk mendapatkan data user dari cookies
export async function GET() {
  const cookieStore = cookies();
  const userName = (await cookieStore).get('userName')?.value || '';
  const avatar = (await cookieStore).get('avatar')?.value || '';

  return NextResponse.json({ 
    userName, 
    avatar 
  });
}

// API untuk menyimpan data user ke cookies
export async function POST(request: NextRequest) {
  const cookieStore = cookies();
  const data = await request.json();
  
  // Set cookies dengan data dari request
  if (data.userName) {
    (await cookieStore).set('userName', data.userName, { 
      path: '/',
      maxAge: 60 * 60 * 24 * 1, // 30 days
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict'
    });
  }
  
  if (data.avatar) {
    (await cookieStore).set('avatar', data.avatar, {
      path: '/',
      maxAge: 60 * 60 * 24 * 1, // 1 day
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict'
    });
  }

  return NextResponse.json({ 
    success: true, 
    message: 'User data saved to cookies' 
  });
}