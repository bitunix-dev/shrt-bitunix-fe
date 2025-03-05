import { useQuery } from "@tanstack/react-query";
import { clientApiRequest } from "@/services/clientApiRequest";
import { ApiResponse } from "@/app/Get/dataTypes";

const fetchUrls = async (): Promise<ApiResponse> => {
  try {
    return await clientApiRequest<ApiResponse>({
      method: "GET",
      endpoint: "urls",
    });
  } catch (error) {
    console.error("Error fetching URLs:", error);
    throw new Error("Failed to fetch URLs");
  }
};

// ✅ Hook React Query untuk mengambil URL + Link Preview
export const useGetUrls = () => {
  return useQuery<ApiResponse>({
    queryKey: ["urls"], // Key unik untuk caching
    queryFn: fetchUrls,
    staleTime: 1000 * 60 * 5, // Data akan dianggap fresh selama 5 menit
    refetchOnWindowFocus: false, // Tidak auto-refresh saat pindah tab
  });
};
