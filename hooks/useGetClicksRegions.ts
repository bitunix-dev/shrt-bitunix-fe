import { useQuery } from "@tanstack/react-query";
import { clientApiRequest } from "@/services/clientApiRequest";
import { ApiResponse, ClickLocationData } from "@/app/Get/dataTypes";

// Define specific type for region data
interface RegionData extends ClickLocationData {
  region: string;
  country_flag: string;
  total_clicks: number;
}

// Function to get date 2 weeks ago in Dubai timezone
const getTwoWeeksAgoInDubai = (): string => {
  const now = new Date();
  const twoWeeksAgo = new Date(now.getTime() - (14 * 24 * 60 * 60 * 1000));
  
  // Convert to Dubai timezone (UTC+4)
  const dubaiTime = new Date(twoWeeksAgo.toLocaleString("en-US", {
    timeZone: "Asia/Dubai"
  }));
  
  // Format as YYYY-MM-DD
  return dubaiTime.toISOString().split('T')[0];
};

// Function to get current date in Dubai timezone
const getCurrentDateInDubai = (): string => {
  const now = new Date();
  
  // Convert to Dubai timezone (UTC+4)
  const dubaiTime = new Date(now.toLocaleString("en-US", {
    timeZone: "Asia/Dubai"
  }));
  
  // Format as YYYY-MM-DD
  return dubaiTime.toISOString().split('T')[0];
};

const fetchClicksRegions = async (): Promise<ApiResponse<RegionData>> => {
  try {
    const startDate = getTwoWeeksAgoInDubai();
    const endDate = getCurrentDateInDubai();
    
    return await clientApiRequest<ApiResponse<RegionData>>({
      method: "GET",
      endpoint: "analytics/regions",
      params: { 
        page: 1,
        start_date: startDate,
        end_date: endDate
      }
    });
  } catch (error) {
    console.error("Error fetching region data:", error);
    throw new Error("Failed to fetch region data");
  }
};

// Hook React Query untuk mengambil data klik berdasarkan region
export const useGetClicksRegions = () => {
  return useQuery<ApiResponse<RegionData>>({
    queryKey: ["analytics/regions"], // Key unik untuk caching
    queryFn: fetchClicksRegions,
    staleTime: 1000 * 60 * 5, // Data akan dianggap fresh selama 5 menit
    refetchOnWindowFocus: false, // Tidak auto-refresh saat pindah tab
  });
};