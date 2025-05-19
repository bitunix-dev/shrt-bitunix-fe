interface ApiClientParams {
  endpoint: string; // Path dari API eksternal
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  body?: unknown;
  params?: Record<string, string | number | boolean>; // Opsional: Parameter query
  usePublicRoute?: boolean; // Opsi baru untuk menggunakan route publik
}

export const clientApiRequest = async <T>({
  endpoint,
  method,
  body,
  params,
  usePublicRoute = false, // Default: false (menggunakan route terautentikasi)
}: ApiClientParams): Promise<T> => {
  try {
    // Tentukan route berdasarkan usePublicRoute
    const routePath = usePublicRoute ? "public" : "proxy";
    
    // Buat base URL dengan endpoint
    const baseUrl = `${process.env.NEXT_PUBLIC_API_URL_INTERNAL}/api/${routePath}`;
    
    // Buat URLSearchParams untuk menangani query string dengan benar
    const searchParams = new URLSearchParams();
    
    // Tambahkan endpoint sebagai parameter
    searchParams.append('endpoint', endpoint);
    
    // Tambahkan params jika ada
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        searchParams.append(key, String(value));
      });
    }
    
    // Buat URL lengkap dengan query string
    const fullUrl = `${baseUrl}?${searchParams.toString()}`;

    console.log(`Fetching (${usePublicRoute ? "public" : "authenticated"} route):`, fullUrl); // Debug URL

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

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error in clientApiRequest:", error);
    throw error;
  }
};