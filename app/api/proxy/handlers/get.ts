// app/api/proxy/handlers/get.ts
import { NextRequest, NextResponse } from "next/server";
import { getAuthToken } from "@/utils/auth";
import { API_BASE_URL, handleApiError, handleInternalError } from "@/utils/api";

/**
 * Handler untuk metode GET
 */
export async function handleGet(req: NextRequest) {
  try {
    // Dapatkan endpoint dari query params
    const { searchParams } = new URL(req.url);
    const endpoint = searchParams.get("endpoint");
    
    // Debug: Log endpoint
    console.log("Requested endpoint:", endpoint);
    
    // Validasi endpoint
    if (!endpoint) {
      console.log("Error: No endpoint provided");
      return NextResponse.json({ error: "Endpoint diperlukan" }, { status: 400 });
    }
    
    // Dapatkan token otentikasi
    const token = await getAuthToken(req);
    console.log("Authentication token obtained successfully");
    
    // Buat URL API eksternal dan tambahkan query params lainnya
    let externalApiUrl = `${API_BASE_URL}/${endpoint}`;
    
    // Teruskan parameter query lainnya (kecuali endpoint)
    searchParams.forEach((value, key) => {
      if (key !== "endpoint") {
        // Jika URL sudah mengandung parameter, tambahkan dengan & selain ?
        if (externalApiUrl.includes("?")) {
          externalApiUrl += `&${key}=${value}`;
        } else {
          externalApiUrl += `?${key}=${value}`;
        }
      }
    });
    
    console.log("Proxying GET to:", externalApiUrl);
    
    // Kirim request ke API eksternal
    const response = await fetch(externalApiUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    });
    
    // Debug: Log response status
    console.log("API response status:", response.status);
    
    // Handle respons error
    if (!response.ok) {
      console.log("API error response:", response.status, response.statusText);
      return handleApiError(response, "Gagal mengambil data");
    }
    
    // Kembalikan data ke client
    const data = await response.json();
    console.log("API request successful. Data rows:", data?.data?.data?.length || "N/A");
    return NextResponse.json(data);
  } catch (error) {
    console.error("Proxy error:", error);
    return handleInternalError(error, "Proxy GET");
  }
}