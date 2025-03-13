// app/api/public/route.ts
import { NextRequest, NextResponse } from "next/server";
import { API_BASE_URL, handleApiError, handleInternalError } from "@/utils/api";

/**
 * Proxy untuk endpoint publik yang tidak memerlukan token (login, register, dll)
 */
export async function POST(req: NextRequest) {
  try {
    // Parse body request
    const body = await req.json();
    
    // Dapatkan endpoint dari query params
    const { searchParams } = new URL(req.url);
    const endpoint = searchParams.get("endpoint");

    if (!endpoint) {
      return NextResponse.json({ error: "Endpoint diperlukan" }, { status: 400 });
    }

    // Buat URL API eksternal
    const externalApiUrl = `${API_BASE_URL}/${endpoint}`;
    
    // Kirim request ke API eksternal tanpa token
    const response = await fetch(externalApiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body),
    });

    // Handle respons error
    if (!response.ok) {
      return handleApiError(response, "Gagal mengirim data");
    }

    // Kembalikan data ke client
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return handleInternalError(error, "Public Proxy");
  }
}

/**
 * Handler untuk OPTIONS requests (CORS)
 */
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}