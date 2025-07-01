// hooks/useActivityTimeout.ts
import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useLogout } from "./useLogout";

export const useActivityTimeout = (timeoutMinutes = 15) => {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const mutation = useLogout();
  const router = useRouter();

  const resetTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(async () => {
      try {
        await mutation.mutateAsync();
        router.push("/login");
      } catch (error) {
        console.error("Activity timeout logout error:", error);
        router.push("/login");
      }
    }, timeoutMinutes * 60 * 1000);
  };

  useEffect(() => {
    const events = [
      "mousedown",
      "mousemove",
      "keypress",
      "scroll",
      "touchstart",
    ];

    const resetTimer = () => resetTimeout();

    events.forEach((event) => {
      document.addEventListener(event, resetTimer, true);
    });

    resetTimeout(); // Start initial timeout

    return () => {
      events.forEach((event) => {
        document.removeEventListener(event, resetTimer, true);
      });
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);
};
