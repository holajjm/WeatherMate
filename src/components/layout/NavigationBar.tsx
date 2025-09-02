import React from "react";
import { Link, useLocation } from "react-router-dom";

function NavigationBar() {
  const location = useLocation();
  return (
    <nav
      className={`
        h-18 sticky top-0 z-20 m-auto flex w-full min-w-[320px] max-w-[600px]
        items-center gap-4 border-b-[1px] border-slate-300 bg-white text-lg
        font-bold text-white shadow-inner
      `}
    >
      <Link
        to="/"
        className={`
          flex w-full flex-col items-center gap-1 p-1
          ${
          location.pathname === "/main" || location.pathname === "/"
            ? "text-blue_middle"
            : `
              text-slate-600
              hover:text-blue_middle
            `
        }
        `}
      >
        <p className="text-nowrap text-sm">홈</p>
      </Link>
      <Link
        to="/community"
        className={`
          flex w-full flex-col items-center gap-1 p-1
          ${
          location.pathname === "/community"
            ? "text-blue_middle"
            : `
              text-slate-600
              hover:text-blue_middle
            `
        }
        `}
      >
        <p className="text-nowrap text-sm">커뮤니티</p>
      </Link>
      <Link
        to="/location"
        className={`
          flex w-full flex-col items-center gap-1 p-1
          ${
          location.pathname === "/location"
            ? "text-blue_middle"
            : `
              text-slate-600
              hover:text-blue_middle
            `
        }
        `}
      >
        <p className="text-nowrap text-sm">장소추천</p>
      </Link>
      <Link
        to="/user/mypage"
        className={`
          flex w-full flex-col items-center gap-1 p-1
          ${
          location.pathname === "/user/mypage"
            ? "text-blue_middle"
            : `
              text-slate-600
              hover:text-blue_middle
            `
        }
        `}
      >
        <p className="text-nowrap text-sm">마이페이지</p>
      </Link>
    </nav>
  );
}

export default NavigationBar;
