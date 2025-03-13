// app/api/proxy/route.ts
import { NextRequest, NextResponse } from "next/server";
import { handleGet } from "./handlers/get";
import { handlePost } from "./handlers/post";
import { handlePut } from "./handlers/put";
import { handleDelete } from "./handlers/delete";

/**
 * Proxy untuk metode GET
 */
export async function GET(req: NextRequest) {
  return handleGet(req);
}

/**
 * Proxy untuk metode POST
 */
export async function POST(req: NextRequest) {
  return handlePost(req);
}

/**
 * Proxy untuk metode PUT
 */
export async function PUT(req: NextRequest) {
  return handlePut(req);
}

/**
 * Proxy untuk metode DELETE
 */
export async function DELETE(req: NextRequest) {
  return handleDelete(req);
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