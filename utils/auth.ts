// utils/auth.ts
import { NextRequest } from "next/server";

const APP_URL = process.env.NEXT_PUBLIC_API_URL_INTERNAL || '';

/**
 * Fungsi untuk mendapatkan token otentikasi dari API get-token
 * dengan meneruskan cookie dari request asli
 */
export async function getAuthToken(req: NextRequest) {
  try {
    console.log("Mengambil token otentikasi...");
    
    // Ambil cookie dari request asli
    const cookieHeader = req.headers.get('cookie') || '';
    
    // Buat request ke endpoint get-token dengan meneruskan cookie
    const tokenResponse = await fetch(`${APP_URL}/api/auth/get-token`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Cookie": cookieHeader // Teruskan cookie dari request asli
      },
      cache: "no-store"
    });

    if (!tokenResponse.ok) {
      const errorText = await tokenResponse.text();
      console.error(`Gagal mendapatkan token. Status: ${tokenResponse.status}, Response: ${errorText}`);
      throw new Error(`Gagal mendapatkan token otentikasi: ${tokenResponse.status}`);
    }

    const tokenData = await tokenResponse.json();
    
    // Periksa apakah token valid
    if (!tokenData.token) {
      console.error("Token tidak ditemukan dalam respons:", tokenData);
      throw new Error("Token otentikasi tidak valid");
    }

    console.log("Token berhasil diambil");
    return tokenData.token;
  } catch (error) {
    console.error("Error mendapatkan token otentikasi:", error);
    throw error;
  }
}