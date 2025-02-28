import React from "react";
import { Link, useLocation } from "react-router-dom";

import { GoHomeFill } from "react-icons/go";
import { IoMdChatboxes } from "react-icons/io";
import { MdLocationOn } from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";
// import { BiSolidCategory } from "react-icons/bi";

function NavigationBar() {
  const location = useLocation();
  return (
    <footer className="max-w-[600px] min-w-[320px] m-auto py-2 border-b-[1px] border-slate-300 flex text-white h-18 items-center gap-4 font-bold bg-white sticky top-0 z-20 shadow-inner font-UhBeeKangJa">
      {/* <Link
        to="/category"
        className={`w-20 flex flex-col gap-1 items-center p-1 ${location.pathname === "/category" ? "text-indigo-500" : "text-slate-400 hover:text-indigo-500"}`}
      >
        <BiSolidCategory />
        <p className="text-nowrap text-sm">카테고리</p>
      </Link> */}
      <Link
        to="/main"
        className={`w-full flex flex-col gap-1 items-center p-1 ${
          location.pathname === "/main" || location.pathname === "/"
            ? "text-indigo-500"
            : "text-slate-400 hover:text-indigo-500"
        }`}
      >
        {/* <GoHomeFill /> */}
        <p className="text-nowrap text-sm">홈</p>
      </Link>
      <Link
        to="/community"
        className={`w-full flex flex-col gap-1 items-center p-1 ${
          location.pathname === "/community"
            ? "text-indigo-500"
            : "text-slate-400 hover:text-indigo-500"
        }`}
      >
        {/* <IoMdChatboxes /> */}
        <p className="text-nowrap text-sm">커뮤니티</p>
      </Link>

      <Link
        to="/location"
        className={`w-full flex flex-col gap-1 items-center p-1 ${
          location.pathname === "/location"
            ? "text-indigo-500"
            : "text-slate-400 hover:text-indigo-500"
        }`}
      >
        {/* <MdLocationOn /> */}
        <p className="text-nowrap text-sm">장소추천</p>
      </Link>
      <Link
        to="/user/mypage"
        className={`w-full flex flex-col gap-1 items-center p-1 ${
          location.pathname === "/user/mypage"
            ? "text-indigo-500"
            : "text-slate-400 hover:text-indigo-500"
        }`}
      >
        {/* <FaUserCircle /> */}
        <p className="text-nowrap text-sm">마이</p>
      </Link>
    </footer>
  );
}

export default NavigationBar;
