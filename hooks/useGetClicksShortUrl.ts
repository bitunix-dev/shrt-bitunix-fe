import { useQuery } from "@tanstack/react-query";
import { clientApiRequest } from "@/services/clientApiRequest";
import { ApiResponse } from "@/components/chart/dataTypes";

const fetchAnalytics = async (): Promise<ApiResponse> => {
  try {
    return await clientApiRequest<ApiResponse>({
      method: "GET",
      endpoint: "analytics/urls",
    });
  } catch (error) {
    console.error("Error fetching URLs:", error);
    throw new Error("Failed to fetch URLs");
  }
};

// ✅ Hook React Query untuk mengambil URL + Link Preview
export const useGetClicksShortUrl = () => {
  return useQuery<ApiResponse>({
    queryKey: ["analytics/urls"], // Key unik untuk caching
    queryFn: fetchAnalytics,
    staleTime: 1000 * 60 * 5, // Data akan dianggap fresh selama 5 menit
    refetchOnWindowFocus: false, // Tidak auto-refresh saat pindah tab
  });
};
