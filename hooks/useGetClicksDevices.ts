import { useQuery } from "@tanstack/react-query";
import { clientApiRequest } from "@/services/clientApiRequest";
import { ApiResponse } from "@/app/Get/dataTypes";

const fetchClicksDevices = async (): Promise<ApiResponse> => {
  try {
    return await clientApiRequest<ApiResponse>({
      method: "GET",
      endpoint: "analytics/devices",
    });
  } catch (error) {
    console.error("Error fetching URLs:", error);
    throw new Error("Failed to fetch URLs");
  }
};

// ✅ Hook React Query untuk mengambil URL + Link Preview
export const useGetClicksDevices = () => {
  return useQuery<ApiResponse>({
    queryKey: ["analytics/devices"], // Key unik untuk caching
    queryFn: fetchClicksDevices,
    staleTime: 1000 * 60 * 5, // Data akan dianggap fresh selama 5 menit
    refetchOnWindowFocus: false, // Tidak auto-refresh saat pindah tab
  });
};
