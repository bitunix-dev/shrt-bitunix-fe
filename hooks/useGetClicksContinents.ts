import { useQuery } from "@tanstack/react-query";
import { clientApiRequest } from "@/services/clientApiRequest";
import { ApiResponse, ClickLocationData } from "@/app/Get/dataTypes";

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

const fetchClicksContinents = async (): Promise<ApiResponse<ClickLocationData>> => {
  try {
    const startDate = getTwoWeeksAgoInDubai();
    const endDate = getCurrentDateInDubai();
    
    return await clientApiRequest<ApiResponse<ClickLocationData>>({
      method: "GET",
      endpoint: "analytics/continents",
      params: { 
        page: 1,
        start_date: startDate,
        end_date: endDate
      }
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