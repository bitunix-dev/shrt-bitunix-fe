import { useQuery } from "@tanstack/react-query";
import { clientApiRequest } from "@/services/clientApiRequest";
import { ApiResponse } from "@/components/Combobox/tagsType";

const fetchTags = async (): Promise<ApiResponse> => {
  try {
    return await clientApiRequest<ApiResponse>({
      method: "GET",
      endpoint: "tags",
    });
  } catch (error) {
    console.error("Error fetching URLs:", error);
    throw new Error("Failed to fetch URLs");
  }
};

export const useGetTags = () => {
  return useQuery<ApiResponse>({
    queryKey: ["tags"], // Key unik untuk caching
    queryFn: fetchTags,
    staleTime: 1000 * 60 * 5, // Data akan dianggap fresh selama 5 menit
    refetchOnWindowFocus: false, // Tidak auto-refresh saat pindah tab
  });
};
