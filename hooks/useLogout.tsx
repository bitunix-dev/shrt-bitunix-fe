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
    },
    onSuccess: () => {
      // Clear local storage and cookies
      clearLocalStorage();

      // Invalidate / reset all cache
      queryClient.resetQueries();
    },
    onError: () => {
      // Even if API call fails, clear local storage
      clearLocalStorage();
    },
  });
}
