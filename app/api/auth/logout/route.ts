// app/api/auth/logout/route.ts
import { NextRequest, NextResponse } from "next/server";

/**
 * Handler untuk proses logout dengan menghapus token dari cookie
 */
export async function POST(request: NextRequest) {
  try {
    console.log("Proses logout: Menghapus token dari cookie");
    
    // Buat respons
    const response = NextResponse.json(
      { message: "Logout berhasil" },
      { status: 200 }
    );
    
    // Hapus cookie token dengan mengatur expires ke waktu lampau
    response.cookies.set({
      name: "token",
      value: "",
      expires: new Date(0), // Waktu lampau (1970-01-01)
      path: "/",
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });
    
    console.log("Token berhasil dihapus");
    return response;
  } catch (error) {
    console.error("Error saat logout:", error);
    return NextResponse.json(
      { error: "Terjadi kesalahan saat logout" },
      { status: 500 }
    );
  }
}

/**
 * Handler untuk permintaan GET (opsional, jika Anda ingin mendukung GET /api/auth/logout)
 */
export async function GET(request: NextRequest) {
  // Redirect ke POST handler
  return POST(request);
}

/**
 * Handler untuk OPTIONS request (untuk dukungan CORS)
 */
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}