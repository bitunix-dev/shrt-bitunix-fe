import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
    const url = req.nextUrl;
    const pathname = url.pathname;
    const path = pathname.slice(1); // Ambil slug setelah "/"

    // Ambil token dari cookie
    const token = req.cookies.get('token');
    const isAuthenticated = !!token; // Cek apakah pengguna terautentikasi

    console.log(`Path: ${pathname}, Auth: ${isAuthenticated}`); // Debug

    // Daftar rute publik dan autentikasi
    const authRoutes = ['login', 'register'];
    // Pastikan semua rute terproteksi tercantum di sini (tanpa slash di awal)
    const protectedRoutes = ['', 'analytics']; 
    
    // Cek rute autentikasi (login/register)
    if (authRoutes.includes(path)) {
        // Jika sudah login dan mencoba akses login/register, redirect ke home
        if (isAuthenticated) {
            console.log(`Redirecting authenticated user from ${path} to /`);
            return NextResponse.redirect(new URL('/', req.url));
        }
        // Jika belum login, biarkan akses ke login/register
        return NextResponse.next();
    }

    // Cek rute terproteksi
    // Root path akan menjadi string kosong setelah slice, jadi kita perlu memeriksa kosong juga
    if (protectedRoutes.includes(path) || pathname === '/') {
        // Jika belum login dan mencoba akses rute terproteksi, redirect ke login
        if (!isAuthenticated) {
            console.log(`Redirecting unauthenticated user from ${pathname} to /login`);
            return NextResponse.redirect(new URL('/login', req.url));
        }
        // Jika sudah login, biarkan akses ke rute terproteksi
        return NextResponse.next();
    }
    
    // Periksa juga subfolder/subpath dari rute terproteksi
    // Misalnya, '/dashboard/analytics' juga harus terproteksi
    for (const route of protectedRoutes) {
        if (route && path.startsWith(route + '/')) {
            if (!isAuthenticated) {
                console.log(`Redirecting unauthenticated user from subfolder ${pathname} to /login`);
                return NextResponse.redirect(new URL('/login', req.url));
            }
            return NextResponse.next();
        }
    }

    // Cek apakah path merupakan slug yang valid (random string)
    const isSlug = /^[a-zA-Z0-9]+$/.test(path) && 
                   !authRoutes.includes(path) && 
                   !protectedRoutes.includes(path);

    if (isSlug) {
        console.log(`Rewriting ${path} to /api/redirect/${path}`);
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