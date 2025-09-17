import React from "react";
import { Link, useLocation } from "react-router-dom";

import { BiSolidHome } from "react-icons/bi";
import { IoMdChatboxes } from "react-icons/io";
import { MdLocationOn } from "react-icons/md";
import { IoMdSunny } from "react-icons/io";

function NavigationBar() {
  const location = useLocation();
  return (
    <nav
      className={`sticky bottom-0 z-20 m-auto flex h-16 w-full min-w-[320px] max-w-[600px] items-center gap-4 rounded-t-button border-b-[1px] border-t-[1px] border-slate-300 bg-white text-lg font-bold text-white shadow-inner`}
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
        to="/user/mypage"
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
