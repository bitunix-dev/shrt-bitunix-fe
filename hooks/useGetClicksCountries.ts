import { useQuery } from "@tanstack/react-query";
import { clientApiRequest } from "@/services/clientApiRequest";
import { ApiResponse, ClickLocationData } from "@/app/Get/dataTypes";

// Define specific type for country data
interface CountryData extends ClickLocationData {
  country: string;
  country_flag: string;
  total_clicks: number;
}

const fetchClicksCountries = async (): Promise<ApiResponse<CountryData>> => {
  try {
    return await clientApiRequest<ApiResponse<CountryData>>({
      method: "GET",
      endpoint: "analytics/countries",
      params: { page: 1 } // Start with page 1 by default
    });
  } catch (error) {
    console.error("Error fetching country data:", error);
    throw new Error("Failed to fetch country data");
  }
};

// Hook React Query untuk mengambil data klik berdasarkan negara
export const useGetClicksCountries = () => {
  return useQuery<ApiResponse<CountryData>>({
    queryKey: ["analytics/countries"], // Key unik untuk caching
    queryFn: fetchClicksCountries,
    staleTime: 1000 * 60 * 5, // Data akan dianggap fresh selama 5 menit
    refetchOnWindowFocus: false, // Tidak auto-refresh saat pindah tab
  });
};