// app/api/proxy/handlers/put.ts
import { NextRequest, NextResponse } from "next/server";
import { getAuthToken } from "@/utils/auth";
import { API_BASE_URL, handleApiError, handleInternalError } from "@/utils/api";

/**
 * Handler untuk metode PUT
 */
export async function handlePut(req: NextRequest) {
  try {
    // Dapatkan token otentikasi
    const token = await getAuthToken(req);
    
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
    console.log("Proxying PUT to:", externalApiUrl);

    // Kirim request ke API eksternal
    const response = await fetch(externalApiUrl, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });

    // Handle respons error
    if (!response.ok) {
      return handleApiError(response, "Gagal memperbarui data");
    }

    // Kembalikan data ke client
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return handleInternalError(error, "Proxy PUT");
  }
}