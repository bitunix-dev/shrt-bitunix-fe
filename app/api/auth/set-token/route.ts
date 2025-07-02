// app/api/auth/set-token/route.ts
import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

// Encryption settings - create exact 32-byte key
const rawKey = process.env.TOKEN_ENCRYPTION_KEY  || '' 
// Ensure key is exactly 32 bytes using SHA-256 hash
const ENCRYPTION_KEY = crypto.createHash('sha256').update(rawKey).digest();
const ALGORITHM = 'aes-256-gcm';

// Simplified encrypt token function
function encryptToken(token: string): string {
  try {
    // Create a random initialization vector
    const iv = crypto.randomBytes(16);
    
    // Create cipher with key and iv
    const cipher = crypto.createCipheriv(ALGORITHM, ENCRYPTION_KEY, iv);
    
    // Encrypt the token
    let encrypted = cipher.update(token, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    
    // Get the auth tag (for GCM mode authentication)
    const authTag = cipher.getAuthTag();
    
    // Combine IV, authTag, and encrypted token for storage (removed salt for simplicity)
    return `${iv.toString('hex')}:${authTag.toString('hex')}:${encrypted}`;
  } catch (error) {
    console.error('Encryption error details:', error);
    throw error;
  }
}

// Decrypt token function
function decryptToken(encryptedData: string): string {
  try {
    // Split the stored data to get the components
    const [ivHex, authTagHex, encryptedToken] = encryptedData.split(':');
    
    // Convert hex strings back to Buffers
    const iv = Buffer.from(ivHex, 'hex');
    const authTag = Buffer.from(authTagHex, 'hex');
    
    // Create decipher
    const decipher = crypto.createDecipheriv(ALGORITHM, ENCRYPTION_KEY, iv);
    decipher.setAuthTag(authTag);
    
    // Decrypt the token
    let decrypted = decipher.update(encryptedToken, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    
    return decrypted;
  } catch (error) {
    console.error('Decryption error:', error);
    throw error;
  }
}

// Handler for POST requests
export async function POST(request: NextRequest) {
  try {
    console.log('Received request to set token');
    
    // Parsing body
    let body;
    try {
      body = await request.json();
      console.log('Request body parsed successfully');
    } catch (parseError) {
      console.error('Failed to parse request body:', parseError);
      return NextResponse.json(
        { message: 'Invalid JSON in request body' },
        { status: 400 }
      );
    }
    
    const { token } = body;
    
    if (!token) {
      console.log('Token missing in request');
      return NextResponse.json(
        { message: 'Token is required' },
        { status: 400 }
      );
    }
    
    console.log('Token received, proceeding to encrypt');
    
    // Encrypt the token before storing in cookie
    let encryptedToken;
    try {
      encryptedToken = encryptToken(token);
      console.log('Token encrypted successfully');
    } catch (encryptError) {
      console.error('Error encrypting token:', encryptError);
      return NextResponse.json(
        { message: 'Error encrypting token' },
        { status: 500 }
      );
    }

    // Membuat response dengan cookie
    const response = NextResponse.json(
      { message: 'Token set securely' },
      { status: 200 }
    );
    
    // Set cookie pada response
    response.cookies.set({
      name: 'token',
      value: encryptedToken,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60, // 1 week
      path: '/',
    });
    
    return response;
  } catch (error) {
    console.error('Error setting token:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Menangani request OPTIONS (untuk CORS)
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}