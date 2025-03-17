interface ApiClientParams {
  endpoint: string; // Path dari API eksternal
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  body?: unknown;
  params?: Record<string, string | number | boolean>; // Opsional: Parameter query
  usePublicRoute?: boolean; // Opsi baru untuk menggunakan route publik
}

// Define a response interface to handle the expected data structure
interface ApiResponse<T> {
  data: T;
}

export const clientApiRequest = async <T>({
  endpoint,
  method,
  body,
  params,
  usePublicRoute = false, // Default: false (menggunakan route terautentikasi)
}: ApiClientParams): Promise<T> => {
  try {
    // Buat query string dari params (jika ada)
    const queryString = params
      ? Object.entries(params)
          .map(([key, value]) => `${key}=${encodeURIComponent(String(value))}`)
          .join("&")
      : "";
    
    // Tentukan route berdasarkan usePublicRoute
    const routePath = usePublicRoute ? "public" : "proxy";
    
    // Buat URL ke API route yang sesuai di Next.js
    const baseUrl = `${process.env.NEXT_PUBLIC_API_URL_INTERNAL}/api/${routePath}?endpoint=${endpoint}`;
    
    // Tambahkan query string jika ada
    const fullUrl = queryString ? `${baseUrl}&${queryString}` : baseUrl;

    // console.log(`Fetching (${usePublicRoute ? "public" : "authenticated"} route):`, fullUrl); // Debug URL

    const response = await fetch(fullUrl, {
      method,
      headers: {
        "Content-Type": "application/json",
        // Authorization header hanya jika menggunakan route terautentikasi dan API key tersedia
        ...(process.env.NEXT_PUBLIC_API_KEY && !usePublicRoute 
          ? { "Authorization": `Bearer ${process.env.NEXT_PUBLIC_API_KEY}` } 
          : {}),
      },
      // Sertakan kredensial (cookies) dalam permintaan
      credentials: 'include',
      body: method !== "GET" ? JSON.stringify(body) : undefined, // Body hanya dikirim jika bukan GET
    });

    if (!response.ok) {
      // Coba dapatkan detail error dari respons jika tersedia
      let errorDetails = '';
      try {
        const errorData = await response.json();
        errorDetails = JSON.stringify(errorData);
      } catch {
        errorDetails = `${response.status} ${response.statusText}`;
      }
      
      console.error(`API request failed: ${errorDetails}`);
      throw new Error(`API request failed with status ${response.status}${errorDetails ? `: ${errorDetails}` : ''}`);
    }

    const responseData = await response.json() as ApiResponse<T>;
    return responseData.data;
  } catch (error) {
    console.error("Error in clientApiRequest:", error);
    throw error;
  }
};