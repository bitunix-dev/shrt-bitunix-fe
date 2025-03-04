import { NextRequest, NextResponse } from "next/server";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://api.bitunixads.com/api"; // Ganti dengan API eksternal Anda

/**
 * Proxy untuk metode GET
 * Contoh penggunaan: /api/proxy?endpoint=users
 */
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const endpoint = searchParams.get("endpoint"); // Misal: /users

    if (!endpoint) {
      return NextResponse.json({ error: "Endpoint is required" }, { status: 400 });
    }

    const externalApiUrl = `${API_BASE_URL}/${endpoint}`;
    console.log("Proxying GET to:", externalApiUrl);

    const response = await fetch(externalApiUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.API_KEY}`, // Jika butuh autentikasi
      },
    });

    if (!response.ok) {
      return NextResponse.json({ error: "Failed to fetch data" }, { status: response.status });
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Proxy GET Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

/**
 * Proxy untuk metode POST
 * Contoh penggunaan: Fetch dari frontend dengan method POST ke /api/proxy?endpoint=create-user
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { searchParams } = new URL(req.url);
    const endpoint = searchParams.get("endpoint");

    if (!endpoint) {
      return NextResponse.json({ error: "Endpoint is required" }, { status: 400 });
    }

    const externalApiUrl = `${API_BASE_URL}/${endpoint}`;
    console.log("Proxying POST to:", externalApiUrl);

    const response = await fetch(externalApiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.API_KEY}`,
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      return NextResponse.json({ error: "Failed to post data" }, { status: response.status });
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Proxy POST Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

/**
 * Proxy untuk metode PUT
 * Contoh penggunaan: Fetch dari frontend dengan method PUT ke /api/proxy?endpoint=update-user
 */
export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const { searchParams } = new URL(req.url);
    const endpoint = searchParams.get("endpoint");

    if (!endpoint) {
      return NextResponse.json({ error: "Endpoint is required" }, { status: 400 });
    }

    const externalApiUrl = `${API_BASE_URL}/${endpoint}`;
    console.log("Proxying PUT to:", externalApiUrl);

    const response = await fetch(externalApiUrl, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.API_KEY}`,
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      return NextResponse.json({ error: "Failed to update data" }, { status: response.status });
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Proxy PUT Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

/**
 * Proxy untuk metode DELETE
 * Contoh penggunaan: Fetch dari frontend dengan method DELETE ke /api/proxy?endpoint=delete-user
 */
export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const endpoint = searchParams.get("endpoint");

    if (!endpoint) {
      return NextResponse.json({ error: "Endpoint is required" }, { status: 400 });
    }

    const externalApiUrl = `${API_BASE_URL}/${endpoint}`;
    console.log("Proxying DELETE to:", externalApiUrl);

    const response = await fetch(externalApiUrl, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.API_KEY}`,
      },
    });

    if (!response.ok) {
      return NextResponse.json({ error: "Failed to delete data" }, { status: response.status });
    }

    return NextResponse.json({ message: "Successfully deleted" });
  } catch (error) {
    console.error("Proxy DELETE Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
