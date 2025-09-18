import React from "react";
import { Link, useLocation } from "react-router-dom";

import { BiSolidHome } from "react-icons/bi";
import { IoMdChatboxes } from "react-icons/io";
import { MdLocationOn } from "react-icons/md";
import { IoMdSunny } from "react-icons/io";

import { useScrollDirection } from "@hooks/useScrollDirection";

function NavigationBar() {
  const location = useLocation();
  const { scrollDirection } = useScrollDirection(10);

  // 스크롤 방향에 따라 네비게이션 바 표시 여부 결정
  const isVisible = scrollDirection === "up";

  return (
    <nav
      className={`fixed bottom-0 left-1/2 z-20 m-auto flex h-16 w-full min-w-[320px] max-w-[600px] -translate-x-1/2 items-center gap-4 border-t-[1px] border-slate-300 bg-white text-body font-bold text-white transition-transform duration-300 ease-in-out ${
        isVisible ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <Link
        to="/"
        className={`flex w-full flex-col items-center gap-1 p-1 ${
          location.pathname === "/main" || location.pathname === "/"
            ? "text-blue_middle"
            : `text-slate-600 hover:text-blue_middle`
        } `}
      >
        <BiSolidHome className="text-title" />
        <p className="text-nowrap text-caption">홈</p>
      </Link>
      <Link
        to="/community"
        className={`flex w-full flex-col items-center gap-1 p-1 ${
          location.pathname === "/community"
            ? "text-blue_middle"
            : `text-slate-600 hover:text-blue_middle`
        } `}
      >
        <IoMdChatboxes className="text-title" />
        <p className="text-nowrap text-caption">커뮤니티</p>
      </Link>
      <Link
        to="/location"
        className={`flex w-full flex-col items-center gap-1 p-1 ${
          location.pathname === "/location"
            ? "text-blue_middle"
            : `text-slate-600 hover:text-blue_middle`
        } `}
      >
        <MdLocationOn className="text-title" />
        <p className="text-nowrap text-caption">장소추천</p>
      </Link>
      <Link
        to="/mbti"
        className={`flex w-full flex-col items-center gap-1 p-1 ${
          location.pathname === "/user/mypage"
            ? "text-blue_middle"
            : `text-slate-600 hover:text-blue_middle`
        } `}
      >
        <IoMdSunny className="text-title" />
        <p className="text-nowrap text-caption">날씨 MBTI</p>
      </Link>
    </nav>
  );
}

export default NavigationBar;
