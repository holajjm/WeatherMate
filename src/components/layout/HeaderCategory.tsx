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
    <div
      className={`
        font-UhBeeKangJa m-auto flex h-screen min-w-[180px] flex-col
        items-center bg-slate-100 text-lg
        drop-shadow-[10px_5px_3px_rgba(0,0,0,0.3)]
      `}
    >
      <h1
        className={`
          font-SSRONETHandwritten flex h-10 w-full items-center px-2 text-xl
          font-bold text-[#2D2D2D]
        `}
      >
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
          state={{ from: location.pathname }}
          className={`
            flex w-full items-center gap-1 border-[1px] bg-white p-2 text-base
            hover:bg-indigo-500
          `}
        >
          <IoMdChatboxes className="text-lg" />
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
          state={{ from: location.pathname }}
          className={`
            flex w-full items-center gap-1 border-[1px] bg-white p-2 text-base
            hover:bg-indigo-500
          `}
        >
          <MdLocationOn className="text-lg" />
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
          state={{ from: location.pathname }}
          className={`
            flex w-full items-center gap-1 border-[1px] bg-white p-2 text-base
            hover:bg-indigo-500
          `}
        >
          <FaUserCircle className="text-lg" />
          마이페이지
        </Link>
      </motion.div>
      <h1
        className={`
          font-SSRONETHandwritten flex h-10 w-full items-center px-2 text-xl
          font-bold text-[#2D2D2D]
        `}
      >
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
          to={"/mbti"}
          state={{ from: location.pathname }}
          className={`
            flex w-full items-center gap-1 border-[1px] bg-white p-2 text-base
            hover:bg-sky-400
          `}
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
          to={"/allcity"}
          state={{ from: location.pathname }}
          className={`
            flex w-full items-center gap-1 border-[1px] bg-white p-2 text-base
            hover:bg-sky-400
          `}
        >
          🌤️전국의 날씨
        </Link>
      </motion.div>
    </div>
  );
}

export default HeaderCategory;
