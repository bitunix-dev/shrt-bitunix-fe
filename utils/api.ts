// utils/api.ts
import { NextResponse } from "next/server";

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "";

/**
 * Fungsi untuk menangani error dari respons API
 */
export async function handleApiError(response: Response, errorMessage: string) {
  let errorBody;
  try {
    errorBody = await response.text();
  } catch (e) {
    errorBody = "Tidak dapat membaca detail error";
  }
  
  console.error(`API Error: ${response.status} - ${errorBody}`);
  
  return NextResponse.json(
    { error: errorMessage, details: errorBody }, 
    { status: response.status }
  );
}

/**
 * Fungsi untuk menangani error internal
 */
export function handleInternalError(error: unknown, errorSource: string) {
  console.error(`${errorSource} Error:`, error);
  return NextResponse.json(
    { 
      error: "Internal Server Error", 
      message: error instanceof Error ? error.message : String(error) 
    }, 
    { status: 500 }
  );
}