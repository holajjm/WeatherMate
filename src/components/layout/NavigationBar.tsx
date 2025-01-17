import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { GoHomeFill } from "react-icons/go";
import { IoMdChatboxes } from "react-icons/io";
import { MdLocationOn } from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";
import { BiSolidCategory } from "react-icons/bi";

function NavigationBar() {
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <footer className="max-w-[600px] min-w-[320px] m-auto py-2 flex text-white h-16 items-center justify-center gap-4 font-bold bg-blue-200 sticky bottom-0 z-20 shadow-inner font-UhBeeKangJa">
      <Link
        to="/category"
        className={`w-1/6 flex flex-col gap-1 items-center p-1 hover:text-white ${location.pathname === "/category" ? "text-white" : "text-indigo-500"}`}
      >
        <BiSolidCategory className="text-2xl" />
        <p className="text-nowrap text-sm">카테고리</p>
      </Link>

      <Link
        to="/community"
        className={`w-1/6 flex flex-col gap-1 items-center p-1 hover:text-white ${
          location.pathname === "/community" ? "text-white" : "text-indigo-500"
        }`}
      >
        <IoMdChatboxes className="text-2xl" />
        <p className="text-nowrap text-sm">커뮤니티</p>
      </Link>

      <Link
        to="/main"
        className={`w-1/6 flex flex-col gap-1 items-center p-1 hover:text-white ${
          location.pathname === "/main" || location.pathname === "/"
            ? "text-white"
            : "text-indigo-500"
        }`}
      >
        <GoHomeFill className="text-2xl" />
        <p className="text-nowrap text-sm">홈</p>
      </Link>

      <Link
        to="/location"
        className={`w-1/6 flex flex-col gap-1 items-center p-1 hover:text-white ${
          location.pathname === "/location" ? "text-white" : "text-indigo-500"
        }`}
      >
        <MdLocationOn className="text-2xl" />
        <p className="text-nowrap text-sm">장소추천</p>
      </Link>

      <Link
        to="/user/mypage"
        className={`w-1/6 flex flex-col gap-1 items-center p-1 hover:text-white ${
          location.pathname === "/user/mypage"
            ? "text-white"
            : "text-indigo-500"
        }`}
      >
        <FaUserCircle className="text-2xl" />
        <p className="text-nowrap text-sm">마이</p>
      </Link>
    </footer>
  );
}

export default NavigationBar;
