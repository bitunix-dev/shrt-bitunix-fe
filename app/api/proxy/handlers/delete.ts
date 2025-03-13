// app/api/proxy/handlers/delete.ts
import { NextRequest, NextResponse } from "next/server";
import { getAuthToken } from "@/utils/auth";
import { API_BASE_URL, handleApiError, handleInternalError } from "@/utils/api";

/**
 * Handler untuk metode DELETE
 */
export async function handleDelete(req: NextRequest) {
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
    console.log("Proxying DELETE to:", externalApiUrl);

    // Kirim request ke API eksternal
    const response = await fetch(externalApiUrl, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    });

    // Handle respons error
    if (!response.ok) {
      return handleApiError(response, "Gagal menghapus data");
    }

    // Kembalikan respons sukses
    return NextResponse.json({ message: "Berhasil dihapus" });
  } catch (error) {
    return handleInternalError(error, "Proxy DELETE");
  }
}