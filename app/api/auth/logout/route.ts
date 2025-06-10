// app/api/auth/logout/route.ts
import { NextRequest, NextResponse } from "next/server";
/**
 * Handler untuk proses logout dengan menghapus token dari cookie
 */
export async function POST(request: NextRequest) {
  try {
    console.log("Proses logout: Menghapus token dan data user dari cookie");
    
    // Buat respons JSON
    const response = NextResponse.json(
      { message: "Logout berhasil" },
      { status: 200 }
    );
    
    // Hapus cookie token
    response.cookies.set({
      name: "token",
      value: "",
      expires: new Date(0),
      path: "/",
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    // Hapus cookie userName
    response.cookies.set({
      name: "userName",
      value: "",
      expires: new Date(0),
      path: "/",
      httpOnly: false,           // sesuaikan dengan setelan awal
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    });

    // Hapus cookie avatar
    response.cookies.set({
      name: "avatar",
      value: "",
      expires: new Date(0),
      path: "/",
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    });

    
    
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