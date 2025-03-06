interface ApiClientParams {
    endpoint: string; // Path dari API eksternal
    method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
    body?: unknown;
    params?: Record<string, string | number | boolean>; // Opsional: Parameter query
  }
  
  export const clientApiRequest = async <T>({
    endpoint,
    method,
    body,
    params,
  }: ApiClientParams): Promise<T> => {
    try {
      // Buat query string dari params (jika ada)
      const queryString = params
        ? "?" + new URLSearchParams(params as Record<string, string>).toString()
        : "";
  
      // Buat URL ke API Proxy di Next.js
      const fullUrl = `${process.env.NEXT_PUBLIC_API_URL}proxy?endpoint=${endpoint}${queryString}`;
  
      console.log("Fetching:", fullUrl); // Debug URL yang digunakan
  
      const response = await fetch(fullUrl, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`, // Opsional: Tambahkan jika butuh autentikasi
        },
        body: method !== "GET" ? JSON.stringify(body) : undefined, // Body hanya dikirim jika bukan GET
      });
  
      if (!response.ok) {
        console.error(`API request failed: ${response.status} ${response.statusText}`);
        throw new Error(`API request failed with status ${response.status}`);
      }
  
      const data: T = await response.json();
      return data;
    } catch (error) {
      console.error("Error in clientApiRequest:", error);
      throw error;
    }
  };
  