import React from "react";
import { Link, useLocation } from "react-router-dom";

function NavigationBar() {
  const location = useLocation();
  return (
    <nav className="max-w-[600px] min-w-[320px] w-full m-auto border-b-[1px] border-slate-300 flex text-white text-lg h-18 items-center gap-4 font-bold bg-white sticky top-0 z-20 shadow-inner">
      <Link
        to="/"
        className={`w-full flex flex-col gap-1 items-center p-1 ${
          location.pathname === "/main" || location.pathname === "/"
            ? "text-blue_middle"
            : "text-slate-600 hover:text-blue_middle"
        }`}
      >
        <p className="text-nowrap text-sm">홈</p>
      </Link>
      <Link
        to="/community"
        className={`w-full flex flex-col gap-1 items-center p-1 ${
          location.pathname === "/community"
            ? "text-blue_middle"
            : "text-slate-600 hover:text-blue_middle"
        }`}
      >
        <p className="text-nowrap text-sm">커뮤니티</p>
      </Link>
      <Link
        to="/location"
        className={`w-full flex flex-col gap-1 items-center p-1 ${
          location.pathname === "/location"
            ? "text-blue_middle"
            : "text-slate-600 hover:text-blue_middle"
        }`}
      >
        <p className="text-nowrap text-sm">장소추천</p>
      </Link>
      <Link
        to="/user/mypage"
        className={`w-full flex flex-col gap-1 items-center p-1 ${
          location.pathname === "/user/mypage"
            ? "text-blue_middle"
            : "text-slate-600 hover:text-blue_middle"
        }`}
      >
        <p className="text-nowrap text-sm">마이페이지</p>
      </Link>
    </nav>
  );
}

export default NavigationBar;
