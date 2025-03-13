// app/api/proxy/handlers/get.ts
import { NextRequest, NextResponse } from "next/server";
import { getAuthToken } from "@/utils/auth";
import { API_BASE_URL, handleApiError, handleInternalError } from "@/utils/api";

/**
 * Handler untuk metode GET
 */
export async function handleGet(req: NextRequest) {
  try {
    // Dapatkan token otentikasi
    const token = await getAuthToken(req);
    
    // Dapatkan endpoint dari query params
    const { searchParams } = new URL(req.url);
    const endpoint = searchParams.get("endpoint");

    if (!endpoint) {
      return NextResponse.json({ error: "Endpoint diperlukan" }, { status: 400 });
    }

    // Buat URL API eksternal
    const externalApiUrl = `${API_BASE_URL}/${endpoint}`;
    console.log("Proxying GET to:", externalApiUrl);

    // Kirim request ke API eksternal
    const response = await fetch(externalApiUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    });

    // Handle respons error
    if (!response.ok) {
      return handleApiError(response, "Gagal mengambil data");
    }

    // Kembalikan data ke client
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return handleInternalError(error, "Proxy GET");
  }
}