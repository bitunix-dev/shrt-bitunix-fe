import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const urlPath = req.nextUrl.pathname; // ✅ Ambil seluruh path dari request
    const slug = urlPath.split("/").pop(); // ✅ Ambil slug dari URL

    if (!slug) {
        return NextResponse.json({ error: "Slug is missing" }, { status: 400 });
    }

    // ✅ Ambil base URL dari environment variable
    const baseUrl = process.env.NEXT_PUBLIC_REDIRECT_URL || "https://api.bitunixads.com";
    
    // ✅ Buat URL tujuan untuk redirect
    const targetUrl = `${baseUrl}/${slug}`;

    return NextResponse.redirect(targetUrl, 301); // 301 = Permanent Redirect
}