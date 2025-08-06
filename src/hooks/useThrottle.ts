import { useRef } from "react";

export function useThrottle(callback: () => void, delay: number) {
  const lastRun = useRef<number>(Date.now());
  return () => {
    const timeElapsed = Date.now() - lastRun.current;
    if (timeElapsed >= delay) {
      callback();
      lastRun.current = Date.now();
    }
  };
}
