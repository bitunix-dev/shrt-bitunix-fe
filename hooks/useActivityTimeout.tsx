// hooks/useActivityTimeout.ts
import { useEffect, useRef } from "react";
import { useLogout } from "./useLogout";

export const useActivityTimeout = (timeoutMinutes = 15) => {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const mutation = useLogout();

  const resetTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      mutation.mutateAsync();
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
