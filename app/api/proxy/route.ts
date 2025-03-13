// app/api/proxy/route.ts
import { NextRequest, NextResponse } from "next/server";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "";
const APP_URL = process.env.NEXT_PUBLIC_API_URL_INTERNAL || '';

/**
 * Fungsi untuk mendapatkan token otentikasi dari API get-token
 * dengan meneruskan cookie dari request asli
 */
async function getAuthToken(req: NextRequest) {
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

/**
 * Proxy untuk metode GET
 */
export async function GET(req: NextRequest) {
  try {
    // Dapatkan token otentikasi terlebih dahulu dengan meneruskan cookie
    const token = await getAuthToken(req);
    
    const { searchParams } = new URL(req.url);
    const endpoint = searchParams.get("endpoint");

    if (!endpoint) {
      return NextResponse.json({ error: "Endpoint diperlukan" }, { status: 400 });
    }

    const externalApiUrl = `${API_BASE_URL}/${endpoint}`;
    console.log("Proxying GET to:", externalApiUrl);

    // Gunakan token yang diperoleh dalam header Authorization
    const response = await fetch(externalApiUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorBody = await response.text();
      console.error(`API Error: ${response.status} - ${errorBody}`);
      return NextResponse.json(
        { error: "Gagal mengambil data", details: errorBody }, 
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Proxy GET Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error", message: error instanceof Error ? error.message : String(error) }, 
      { status: 500 }
    );
  }
}

/**
 * Proxy untuk metode POST
 */
export async function POST(req: NextRequest) {
  try {
    // Dapatkan token otentikasi terlebih dahulu dengan meneruskan cookie
    const token = await getAuthToken(req);
    
    const body = await req.json();
    const { searchParams } = new URL(req.url);
    const endpoint = searchParams.get("endpoint");

    if (!endpoint) {
      return NextResponse.json({ error: "Endpoint diperlukan" }, { status: 400 });
    }

    const externalApiUrl = `${API_BASE_URL}/${endpoint}`;
    console.log("Proxying POST to:", externalApiUrl);

    const response = await fetch(externalApiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errorBody = await response.text();
      console.error(`API Error: ${response.status} - ${errorBody}`);
      return NextResponse.json(
        { error: "Gagal mengirim data", details: errorBody }, 
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Proxy POST Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error", message: error instanceof Error ? error.message : String(error) }, 
      { status: 500 }
    );
  }
}

/**
 * Proxy untuk metode PUT
 */
export async function PUT(req: NextRequest) {
  try {
    // Dapatkan token otentikasi terlebih dahulu dengan meneruskan cookie
    const token = await getAuthToken(req);
    
    const body = await req.json();
    const { searchParams } = new URL(req.url);
    const endpoint = searchParams.get("endpoint");

    if (!endpoint) {
      return NextResponse.json({ error: "Endpoint diperlukan" }, { status: 400 });
    }

    const externalApiUrl = `${API_BASE_URL}/${endpoint}`;
    console.log("Proxying PUT to:", externalApiUrl);

    const response = await fetch(externalApiUrl, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errorBody = await response.text();
      console.error(`API Error: ${response.status} - ${errorBody}`);
      return NextResponse.json(
        { error: "Gagal memperbarui data", details: errorBody }, 
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Proxy PUT Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error", message: error instanceof Error ? error.message : String(error) }, 
      { status: 500 }
    );
  }
}

/**
 * Proxy untuk metode DELETE
 */
export async function DELETE(req: NextRequest) {
  try {
    // Dapatkan token otentikasi terlebih dahulu dengan meneruskan cookie
    const token = await getAuthToken(req);
    
    const { searchParams } = new URL(req.url);
    const endpoint = searchParams.get("endpoint");

    if (!endpoint) {
      return NextResponse.json({ error: "Endpoint diperlukan" }, { status: 400 });
    }

    const externalApiUrl = `${API_BASE_URL}/${endpoint}`;
    console.log("Proxying DELETE to:", externalApiUrl);

    const response = await fetch(externalApiUrl, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorBody = await response.text();
      console.error(`API Error: ${response.status} - ${errorBody}`);
      return NextResponse.json(
        { error: "Gagal menghapus data", details: errorBody }, 
        { status: response.status }
      );
    }

    return NextResponse.json({ message: "Berhasil dihapus" });
  } catch (error) {
    console.error("Proxy DELETE Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error", message: error instanceof Error ? error.message : String(error) }, 
      { status: 500 }
    );
  }
}

/**
 * Handler untuk OPTIONS requests (CORS)
 */
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  });
}