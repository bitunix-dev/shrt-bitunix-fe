import { useQuery } from "@tanstack/react-query";
import { clientApiRequest } from "@/services/clientApiRequest";
import { ApiResponse, ClickLocationData } from "@/app/Get/dataTypes";

const fetchClicksContinents = async (): Promise<ApiResponse<ClickLocationData>> => {
  try {
    return await clientApiRequest<ApiResponse<ClickLocationData>>({
      method: "GET",
      endpoint: "analytics/continents",
      params: { page: 1 } // Start with page 1 by default
    });
  } catch (error) {
    console.error("Error fetching continent data:", error);
    throw new Error("Failed to fetch continent data");
  }
};

// Hook React Query untuk mengambil data klik berdasarkan benua
export const useGetClicksContinent = () => {
  return useQuery<ApiResponse<ClickLocationData>>({
    queryKey: ["analytics/continents"], // Key unik untuk caching
    queryFn: fetchClicksContinents,
    staleTime: 1000 * 60 * 5, // Data akan dianggap fresh selama 5 menit
    refetchOnWindowFocus: false, // Tidak auto-refresh saat pindah tab
  });
};