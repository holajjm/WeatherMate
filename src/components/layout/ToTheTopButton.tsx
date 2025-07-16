import React, { useState, useEffect } from "react";

import { FaArrowUp } from "react-icons/fa";

function ToTheTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // 스크롤 위치에 따라 버튼을 표시 또는 숨깁니다.
    const handleScroll = () => {
      const shouldBeVisible = window.scrollY > 100;

      // 현재 visible 상태와 다를 때만 setState 실행
      setIsVisible(prev => {
        if (prev !== shouldBeVisible) {
          return shouldBeVisible;
        }
        return prev; // 상태 변화 없으면 동일 값 반환
      });
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // 부드럽게 스크롤되도록 설정
    });
  };

  return (
    <button
      className={`fixed bottom-24 right-5 rounded-full z-50 w-12 h-12 shadow-xl border-2 duration-200 transition-opacity flex justify-center items-center ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
      onClick={handleClick}
    >
      <FaArrowUp className="font-bold text-2xl text-primary" />
    </button>
  );
}

export default ToTheTopButton;
