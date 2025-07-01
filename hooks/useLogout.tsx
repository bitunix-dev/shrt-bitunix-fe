import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export function useLogout() {
  const queryClient = useQueryClient();

  const clearLocalStorage = () => {
    // Clear authentication-related localStorage items
    localStorage.removeItem("auth_token");
    localStorage.removeItem("user_data");

    // Clear cookies with multiple approaches to ensure deletion
    const clearCookie = (name: string) => {
      // Method 1: Standard cookie deletion
      document.cookie = `${name}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Strict`;
      // Method 2: Without SameSite (fallback)
      document.cookie = `${name}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
      // Method 3: With max-age
      document.cookie = `${name}=; path=/; max-age=0`;
    };

    clearCookie("token");
    clearCookie("userName");
    clearCookie("avatar");
    
    console.log("All cookies after clearing:", document.cookie);
  };

  return useMutation<void, Error, void>({
    mutationFn: async () => {
      // First call external API
      const API_BASE_URL =
        process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
      const token = localStorage.getItem("auth_token");

      await axios.post(
        `${API_BASE_URL}/logout`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      // Then call local API to clear httpOnly cookies
      await axios.post('/api/auth/logout');
    },
    onSuccess: () => {
      console.log("Logout API call successful, clearing storage...");
      // Clear local storage and cookies
      clearLocalStorage();

      // Invalidate / reset all cache
      queryClient.resetQueries();
      console.log("Storage cleared and queries reset");
    },
    onError: (error) => {
      console.error("Logout API call failed:", error);
      // Even if API call fails, clear local storage
      clearLocalStorage();
      console.log("Storage cleared despite API error");
    },
  });
}
