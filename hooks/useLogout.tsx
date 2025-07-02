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
      // Clear local storage and cookies first
      clearLocalStorage();

      // Reset query cache
      queryClient.resetQueries();

      // Call internal logout API to clear HttpOnly cookies first
      try {
        const response = await fetch("/api/auth/logout", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          console.error("Logout API failed:", response.status);
        }
      } catch (error) {
        console.error("Logout API call failed:", error);
      }

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
