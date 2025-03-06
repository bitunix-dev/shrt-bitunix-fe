import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
    const url = req.nextUrl;
    const path = url.pathname.slice(1); // ✅ Ambil slug setelah "/"

    // ✅ Cek apakah path merupakan slug yang valid (random string), dan bukan "analytics"
    const isSlug = /^[a-zA-Z0-9]+$/.test(path) && path !== "analytics";

    if (isSlug) {
        // ✅ Redirect ke API route untuk diproses
        return NextResponse.rewrite(new URL(`/api/redirect/${path}`, req.url));
    }

    return NextResponse.next(); // Lanjutkan request jika tidak cocok
}

// ✅ Tentukan URL yang perlu dicek middleware
export const config = {
    matcher: "/:path*", // Middleware akan dijalankan untuk setiap path
};