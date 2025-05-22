import { useQuery } from "@tanstack/react-query";
import { clientApiRequest } from "@/services/clientApiRequest";
import { ApiResponse, VipCodeData } from "@/app/Get/dataTypes";

const fetchUrls = async (): Promise<ApiResponse<VipCodeData>> => {
  try {
    return await clientApiRequest<ApiResponse<VipCodeData>>({
      method: "GET",
      endpoint: "vip-codes",
      // params: { page: 1 } // Start with page 1 by default
    });
  } catch (error) {
    console.error("Error fetching URLs:", error);
    throw new Error("Failed to fetch URLs");
  }
};

// Hook to fetch URL data
export const useGetUrls = () => {
  return useQuery<ApiResponse<VipCodeData>, Error>({
    queryKey: ["vip-codes"], // Unique key for caching
    queryFn: fetchUrls,
    staleTime: 1000 * 60 * 5, // Data is fresh for 5 minutes
    refetchOnWindowFocus: false, // Don't auto-refresh when tab focus changes
  });
};