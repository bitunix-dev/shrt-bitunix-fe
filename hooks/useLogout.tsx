import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export function useLogout() {
  const queryClient = useQueryClient();

  const clearLocalStorage = () => {
    // Clear authentication-related localStorage items
    localStorage.removeItem("auth_token");
    localStorage.removeItem("user_data");

    // Clear cookies
    const clearCookie = (name: string) => {
      document.cookie = `${name}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Strict`;
    };

    clearCookie("token");
    clearCookie("userName");
    clearCookie("avatar");
  };

  return useMutation<void, Error, void>({
    mutationFn: async () => {
      // Get token before clearing storage
      const token = localStorage.getItem("auth_token");

      // Call external logout API with Bearer token first
      if (token) {
        try {
          const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://api.bitunixads.com/api";
          const response = await fetch(`${API_BASE_URL}/logout`, {
            method: "POST",
            headers: {
              "Authorization": `Bearer ${token}`,
              "Accept": "application/json",
              "Content-Type": "application/json",
            },
          });

          if (response.ok) {
            console.log("External logout API succeeded");
          } else {
            console.error("External logout API failed:", response.status);
          }
        } catch (error) {
          console.error("External logout API call failed:", error);
        }
      }

      // Clear local storage and cookies after API call
      clearLocalStorage();

      // Also call internal API to clear HttpOnly cookies
      try {
        await fetch("/api/auth/logout", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        });
      } catch (error) {
        console.error("Internal logout API call failed:", error);
      }

      // Reset query cache
      queryClient.resetQueries();

      // Then redirect to login with force reload
      window.location.replace("/login");
    },
    onSuccess: () => {
      // Already redirected in mutationFn
    },
    onError: () => {
      // Even if anything fails, ensure redirect to login
      window.location.replace("/login");
    },
  });
}
