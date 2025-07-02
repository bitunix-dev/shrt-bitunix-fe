// utils/auth.ts
import { NextRequest } from "next/server";

// Get the base URL for internal API calls
function getBaseUrl(): string {
  // If environment variable is set, use it
  if (process.env.NEXT_PUBLIC_API_URL_INTERNAL) {
    return process.env.NEXT_PUBLIC_API_URL_INTERNAL;
  }
  
  // In production (Vercel), use the deployment URL
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  
  // In development, use localhost
  return 'http://localhost:3000';
}

/**
 * Fungsi untuk mendapatkan token otentikasi dari API get-token
 * dengan meneruskan cookie dari request asli
 */
export async function getAuthToken(req: NextRequest) {
  try {
    console.log("=== AUTH TOKEN DEBUG START ===");
    console.log("Mengambil token otentikasi...");
    
    // Ambil cookie dari request asli
    const cookieHeader = req.headers.get('cookie') || '';
    console.log("Cookie header found:", cookieHeader ? `Yes, length: ${cookieHeader.length}` : "No");
    console.log("Cookie preview:", cookieHeader.substring(0, 100) + "...");
    
    // Buat request ke endpoint get-token dengan meneruskan cookie
    // Use relative URL for internal API calls to avoid cross-origin issues
    const tokenResponse = await fetch(`/api/auth/get-token`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Cookie": cookieHeader // Teruskan cookie dari request asli
      },
      cache: "no-store"
    });

    console.log("Get-token response status:", tokenResponse.status);

    if (!tokenResponse.ok) {
      const errorText = await tokenResponse.text();
      console.error(`Gagal mendapatkan token. Status: ${tokenResponse.status}, Response: ${errorText}`);
      console.log("=== AUTH TOKEN DEBUG END (FAILED) ===");
      throw new Error(`Gagal mendapatkan token otentikasi: ${tokenResponse.status}`);
    }

    const tokenData = await tokenResponse.json();
    console.log("Token data received:", tokenData ? "Yes" : "No");
    
    // Periksa apakah token valid
    if (!tokenData.token) {
      console.error("Token tidak ditemukan dalam respons:", tokenData);
      console.log("=== AUTH TOKEN DEBUG END (NO TOKEN) ===");
      throw new Error("Token otentikasi tidak valid");
    }

    console.log("Token berhasil diambil, length:", tokenData.token.length);
    console.log("=== AUTH TOKEN DEBUG END (SUCCESS) ===");
    return tokenData.token;
  } catch (error) {
    console.error("Error mendapatkan token otentikasi:", error);
    console.log("=== AUTH TOKEN DEBUG END (ERROR) ===");
    throw error;
  }
}