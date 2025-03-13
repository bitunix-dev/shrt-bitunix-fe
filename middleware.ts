import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
    const url = req.nextUrl;
    const path = url.pathname.slice(1); // Ambil slug setelah "/"

    // Ambil token dari cookie
    const token = req.cookies.get('token');
    const isAuthenticated = !!token; // Cek apakah pengguna terautentikasi

    // Daftar rute publik dan autentikasi
    const authRoutes = ['login', 'register'];
    const protectedRoutes = ['/', 'analytics',]; // Tambahkan rute terproteksi lainnya

    // Cek rute autentikasi (login/register)
    if (authRoutes.includes(path)) {
        // Jika sudah login dan mencoba akses login/register, redirect ke dashboard
        if (isAuthenticated) {
            return NextResponse.redirect(new URL('/', req.url));
        }
        // Jika belum login, biarkan akses ke login/register
        return NextResponse.next();
    }

    // Cek rute terproteksi (dashboard, dll)
    if (protectedRoutes.some(route => path.startsWith(route))) {
        // Jika belum login dan mencoba akses rute terproteksi, redirect ke login
        if (!isAuthenticated) {
            return NextResponse.redirect(new URL('/login', req.url));
        }
        // Jika sudah login, biarkan akses ke rute terproteksi
        return NextResponse.next();
    }

    // Cek apakah path merupakan slug yang valid (random string)
    const isSlug = /^[a-zA-Z0-9]+$/.test(path) && 
                   !authRoutes.includes(path) && 
                   !protectedRoutes.includes(path) && 
                   path !== "analytics";

    if (isSlug) {
        // Redirect ke API route untuk diproses
        return NextResponse.rewrite(new URL(`/api/redirect/${path}`, req.url));
    }

    // Lanjutkan request jika tidak cocok dengan kriteria di atas
    return NextResponse.next();
}

// Tentukan URL yang perlu dicek middleware
export const config = {
    matcher: "/:path*", // Middleware akan dijalankan untuk setiap path
};