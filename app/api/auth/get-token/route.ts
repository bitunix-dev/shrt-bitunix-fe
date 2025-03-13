// app/api/auth/get-token/route.ts
import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

// Encryption settings - harus sama dengan yang digunakan di set-token.ts
const rawKey = process.env.TOKEN_ENCRYPTION_KEY || '3qF#8jK!p2L@7zX$5vC*9bN^6mT&1dR%0sY4wE-8gH+3aP';
// Ensure key is exactly 32 bytes using SHA-256 hash
const ENCRYPTION_KEY = crypto.createHash('sha256').update(rawKey).digest();
const ALGORITHM = 'aes-256-gcm';

// Fungsi untuk mendekripsi token
function decryptToken(encryptedData: string): string {
  try {
    // Memecah data terenkripsi untuk mendapatkan komponen-komponennya
    // Format: iv:authTag:encryptedToken
    const [ivHex, authTagHex, encryptedToken] = encryptedData.split(':');
    
    // Mengkonversi string hex kembali menjadi Buffer
    const iv = Buffer.from(ivHex, 'hex');
    const authTag = Buffer.from(authTagHex, 'hex');
    
    // Membuat decipher
    const decipher = crypto.createDecipheriv(ALGORITHM, ENCRYPTION_KEY, iv);
    decipher.setAuthTag(authTag);
    
    // Mendekripsi token
    let decrypted = decipher.update(encryptedToken, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    
    return decrypted;
  } catch (error) {
    // Jika terjadi kesalahan pada proses dekripsi
    console.error('Kesalahan saat mendekripsi token:', error);
    throw new Error('Token decryption failed');
  }
}

export async function GET(request: NextRequest) {
  try {
    console.log('Received request to get token');
    
    // Mengakses token dari cookies
    const encryptedToken = request.cookies.get('token')?.value;
    
    if (!encryptedToken) {
      console.log('No token found in cookies');
      return NextResponse.json({ 
        error: 'Tidak terautentikasi' 
      }, { status: 401 });
    }
    
    try {
      // Mendekripsi token
      const decryptedToken = decryptToken(encryptedToken);
      console.log('Token decrypted successfully');
      
      // Anda bisa memverifikasi token JWT di sini jika perlu
      // const verifiedToken = verifyJWT(decryptedToken);
      
      // Mengembalikan informasi yang aman (sebaiknya jangan mengembalikan token asli)
      return NextResponse.json({ 
        authenticated: true,
        // Data tambahan yang aman untuk dikembalikan
        // userId: verifiedToken.userId,
        // role: verifiedToken.role,
        token: decryptedToken, // Hanya untuk keperluan debugging - hapus di produksi
      }, { status: 200 });
    } catch (decryptError) {
      console.error('Failed to decrypt token:', decryptError);
      return NextResponse.json({ 
        error: 'Token tidak valid' 
      }, { status: 401 });
    }
  } catch (error) {
    console.error('Error processing token request:', error);
    return NextResponse.json({ 
      error: 'Kesalahan server internal' 
    }, { status: 500 });
  }
}

// Menangani request OPTIONS (untuk CORS)
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}