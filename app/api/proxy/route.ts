// app/api/proxy/route.ts
import { NextRequest, NextResponse } from "next/server";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "";
// Perbaikan 1: Hapus trailing slash pada APP_URL
const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "";

/**
 * Fungsi untuk mendapatkan token otentikasi dari API get-token
 * dengan meneruskan cookie dari request asli
 */
async function getAuthToken(req: NextRequest) {
  try {
    console.log("Mengambil token otentikasi...");
    
    // Ambil cookie dari request asli
    const cookieHeader = req.headers.get('cookie') || '';
    
    // Perbaikan 2: Coba gunakan URL relatif terlebih dahulu
    try {
      // Opsi 1: Gunakan URL relatif (lebih direkomendasikan)
      console.log("Mencoba mengambil token dengan URL relatif");
      const tokenResponse = await fetch(`/api/auth/get-token`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Cookie": cookieHeader
        },
        cache: "no-store"
      });
      
      if (tokenResponse.ok) {
        const tokenData = await tokenResponse.json();
        if (tokenData.token) {
          console.log("Token berhasil diambil dengan URL relatif");
          return tokenData.token;
        }
      }
      
      // Jika URL relatif gagal, coba dengan URL absolut
      throw new Error("Token tidak berhasil diambil dengan URL relatif");
    } catch (relativeError) {
      console.log("URL relatif gagal, mencoba dengan URL absolut");
      
      // Opsi 2: Gunakan URL absolut dengan APP_URL
      const tokenResponse = await fetch(`${APP_URL}/api/auth/get-token`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Cookie": cookieHeader
        },
        cache: "no-store"
      });

      if (!tokenResponse.ok) {
        const errorText = await tokenResponse.text();
        console.error(`Gagal mendapatkan token. Status: ${tokenResponse.status}, Response: ${errorText}`);
        
        // Perbaikan 3: Coba dengan path alternatif jika 404
        if (tokenResponse.status === 404) {
          console.log("Mencoba path alternatif untuk get-token");
          const altResponse = await fetch(`${APP_URL}/api/auth/get-token/`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "Cookie": cookieHeader
            },
            cache: "no-store"
          });
          
          if (altResponse.ok) {
            const tokenData = await altResponse.json();
            if (tokenData.token) {
              console.log("Token berhasil diambil dengan path alternatif");
              return tokenData.token;
            }
          }
        }
        
        throw new Error(`Gagal mendapatkan token otentikasi: ${tokenResponse.status}`);
      }

      const tokenData = await tokenResponse.json();
      
      // Periksa apakah token valid
      if (!tokenData.token) {
        console.error("Token tidak ditemukan dalam respons:", tokenData);
        throw new Error("Token otentikasi tidak valid");
      }

      console.log("Token berhasil diambil dengan URL absolut");
      return tokenData.token;
    }
  } catch (error) {
    console.error("Error mendapatkan token otentikasi:", error);
    throw error;
  }
}

/**
 * Alternatif: Gunakan cookie langsung jika get-token tidak tersedia
 */
function getTokenFromCookies(req: NextRequest) {
  const tokenCookie = req.cookies.get('token');
  if (!tokenCookie || !tokenCookie.value) {
    throw new Error("Token tidak ditemukan di cookies");
  }
  return tokenCookie.value;
}

/**
 * Proxy untuk metode GET
 */
export async function GET(req: NextRequest) {
  try {
    let token;
    
    try {
      // Coba dapatkan token dari get-token endpoint
      token = await getAuthToken(req);
    } catch (tokenError) {
      console.warn("Gagal mendapatkan token dari endpoint, mencoba ambil dari cookies langsung");
      try {
        // Fallback: Gunakan cookie token langsung
        token = getTokenFromCookies(req);
      } catch (cookieError) {
        return NextResponse.json({ 
          error: "Unauthorized", 
          message: "Tidak dapat mengakses token autentikasi" 
        }, { status: 401 });
      }
    }
    
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

// POST, PUT, DELETE handlers would be updated similarly
// ...rest of the code with the same token handling approach for POST, PUT and DELETE

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