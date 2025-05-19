import { useQuery } from "@tanstack/react-query";
import { clientApiRequest } from "@/services/clientApiRequest";
import { ApiResponse, ClickLocationData } from "@/app/Get/dataTypes";

// Define specific type for city data
interface CityData extends ClickLocationData {
  city: string;
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

const fetchClicksCities = async (): Promise<ApiResponse<CityData>> => {
  try {
    const startDate = getTwoWeeksAgoInDubai();
    const endDate = getCurrentDateInDubai();
    
    return await clientApiRequest<ApiResponse<CityData>>({
      method: "GET",
      endpoint: "analytics/cities",
      params: { 
        page: 1,
        start_date: startDate,
        end_date: endDate
      }
    });
  } catch (error) {
    console.error("Error fetching city data:", error);
    throw new Error("Failed to fetch city data");
  }
};

// Hook React Query untuk mengambil data klik berdasarkan kota
export const useGetClicksCities = () => {
  return useQuery<ApiResponse<CityData>>({
    queryKey: ["analytics/cities"], // Key unik untuk caching
    queryFn: fetchClicksCities,
    staleTime: 1000 * 60 * 5, // Data akan dianggap fresh selama 5 menit
    refetchOnWindowFocus: false, // Tidak auto-refresh saat pindah tab
  });
};