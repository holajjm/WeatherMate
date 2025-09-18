import { useState, useEffect } from "react";

export const useScrollDirection = (threshold: number = 10) => {
  const [scrollDirection, setScrollDirection] = useState<"up" | "down">("up");
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    let ticking = false;

    const updateScrollDirection = () => {
      const scrollY = window.scrollY;
      const direction = scrollY > lastScrollY ? "down" : "up";

      // 스크롤이 충분히 움직였을 때만 방향을 업데이트
      if (
        Math.abs(scrollY - lastScrollY) > threshold &&
        (direction !== scrollDirection || scrollY < threshold)
      ) {
        setScrollDirection(direction);
      }

      // 스크롤 위치에 따른 상태 업데이트
      setIsScrolled(scrollY > threshold);

      lastScrollY = scrollY > 0 ? scrollY : 0;
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(updateScrollDirection);
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => window.removeEventListener("scroll", onScroll);
  }, [scrollDirection, threshold]);

  return { scrollDirection, isScrolled };
};
