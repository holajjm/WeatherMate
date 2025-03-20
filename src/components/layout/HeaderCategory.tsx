import React from "react";
import { Link } from "react-router-dom";

import useScrollTop from "@hooks/useScrollTop";
import { motion } from "framer-motion";

import { IoMdChatboxes } from "react-icons/io";
import { MdLocationOn } from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";

function HeaderCategory() {
  useScrollTop();
  return (
    <div className="max-w-[600px] min-w-[320px] m-auto h-screen flex flex-col items-center text-lg font-UhBeeKangJa bg-slate-100 drop-shadow-[10px_5px_3px_rgba(0,0,0,0.3)]">
      <h1 className="w-full font-bold px-2 text-xl flex items-center h-10 text-[#2D2D2D]">
        메인 카테고리
      </h1>
      <motion.div
        initial={{ translateX: -200, opacity: 0 }}
        animate={{ translateX: 0, opacity: 1 }}
        transition={{
          ease: "easeInOut",
          duration: 0.5,
        }}
        className="w-full"
      >
        <Link
          to={"/community"}
          className="w-full flex items-center border-[1px] gap-1 bg-white p-2 text-base hover:bg-indigo-500"
        >
          <IoMdChatboxes className="text-2xl" />
          커뮤니티
        </Link>
      </motion.div>
      <motion.div
        initial={{ translateX: -200, opacity: 0 }}
        animate={{ translateX: 0, opacity: 1 }}
        transition={{
          ease: "easeInOut",
          duration: 0.75,
        }}
        className="w-full"
      >
        <Link
          to={"/location"}
          className="w-full flex items-center border-[1px] gap-1 bg-white p-2 text-base hover:bg-indigo-500"
        >
          <MdLocationOn className="text-2xl" />
          장소추천
        </Link>
      </motion.div>
      <motion.div
        initial={{ translateX: -200, opacity: 0 }}
        animate={{ translateX: 0, opacity: 1 }}
        transition={{
          ease: "easeInOut",
          duration: 1,
        }}
        className="w-full"
      >
        <Link
          to={"/user/mypage"}
          className="w-full flex items-center border-[1px] gap-1 bg-white p-2 text-base hover:bg-indigo-500"
        >
          <FaUserCircle className="text-2xl" />
          마이페이지
        </Link>
      </motion.div>
      <h1 className="w-full font-bold px-2 text-xl flex items-center h-10 text-[#2D2D2D]">
        기타 카테고리
      </h1>
      <motion.div
        initial={{ translateX: -200, opacity: 0 }}
        animate={{ translateX: 0, opacity: 1 }}
        transition={{
          ease: "easeInOut",
          duration: 1.25,
        }}
        className="w-full"
      >
        <Link
          to={"/user/mypage"}
          className="w-full flex items-center border-[1px] gap-1 bg-white p-2 text-base hover:bg-sky-400"
        >
          🌤️날씨 성격 테스트
        </Link>
      </motion.div>
      <motion.div
        initial={{ translateX: -200, opacity: 0 }}
        animate={{ translateX: 0, opacity: 1 }}
        transition={{
          ease: "easeInOut",
          duration: 1.5,
        }}
        className="w-full"
      >
        <Link
          to={"/user/mypage"}
          className="w-full flex items-center border-[1px] gap-1 bg-white p-2 text-base hover:bg-sky-400"
        >
          🌤️전국의 날씨
        </Link>
      </motion.div>
    </div>
  );
}

export default HeaderCategory;
