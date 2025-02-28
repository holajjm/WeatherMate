import React from "react";
import { useNavigate } from "react-router-dom";

import { motion } from "framer-motion";

import Button from "@components/layout/Button";
import usePageTitle from "@hooks/usePageTitle";
import useScrollTop from "@hooks/useScrollTop";
import { IoMdChatboxes } from "react-icons/io";
import { MdLocationOn } from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";

function MainCategory() {
  // usePageTitle("Categotry");
  useScrollTop();
  const navigate = useNavigate();
  return (
    <div className="max-w-[600px] min-w-[320px] m-auto h-screen flex flex-col gap-2 items-center text-lg font-UhBeeKangJa bg-slate-50 px-2">
      <h1 className="w-full font-bold text-xl p-4 h-12 text-[#2D2D2D]">메인 카테고리</h1>
      <motion.div
        initial={{ translateX: -200, opacity: 0 }}
        animate={{ translateX: 0, opacity: 1 }}
        transition={{
          ease: "easeInOut",
          duration: 0.5,
        }}
        className="w-full"
      >
        <button
          type="button"
          // text={'🌤️날씨 성격 테스트'}
          className="w-full h-10 text-left rounded-lg font-semibold text-white text-pretty p-2 duration-200 transition-all bg-indigo-500 hover:shadow-[0_4px_8px_1px] hover:shadow-slate-400 flex items-center gap-1"
          // color="skyFull"
          onClick={() => navigate("/community")}
        >
          <IoMdChatboxes className="text-2xl" />
          커뮤니티
        </button>
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
        <button
          type="button"
          // text={'🌤️날씨 성격 테스트'}
          className="w-full h-10 text-left rounded-lg font-semibold text-white text-pretty p-2 duration-200 transition-all bg-indigo-500 hover:shadow-[0_4px_8px_1px] hover:shadow-slate-400 flex items-center gap-1"
          // color="skyFull"
          onClick={() => navigate("/location")}
        >
          <MdLocationOn className="text-2xl" />
          장소추천
        </button>
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
        <button
          type="button"
          // text={'🌤️날씨 성격 테스트'}
          className="w-full h-10 text-left rounded-lg font-semibold text-white text-pretty p-2 duration-200 transition-all bg-indigo-500 hover:shadow-[0_4px_8px_1px] hover:shadow-slate-400 flex items-center gap-1"
          // color="skyFull"
          onClick={() => navigate("/user/mypage")}
        >
          <FaUserCircle className="text-2xl" />
          마이페이지
        </button>
      </motion.div>
      <h1 className="w-full font-bold text-xl p-4 h-12 text-[#2D2D2D]">기타 카테고리</h1>
      <motion.div
        initial={{ translateX: -200, opacity: 0 }}
        animate={{ translateX: 0, opacity: 1 }}
        transition={{
          ease: "easeInOut",
          duration: 1.25,
        }}
        className="w-full"
      >
        <button
          type="button"
          // text={'🌤️날씨 성격 테스트'}
          className="w-full h-10 text-left rounded-lg font-semibold text-white text-pretty p-2 duration-200 transition-all bg-sky-400 hover:shadow-[0_4px_8px_1px] hover:shadow-slate-400"
          // color="skyFull"
          onClick={() => navigate("/mbti")}
        >
          🌤️날씨 성격 테스트
        </button>
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
        <button
          type="button"
          // text={'🌤️전국의 날씨'}
          className="w-full h-10 text-left rounded-lg font-semibold text-white text-pretty p-2 duration-200 transition-all bg-sky-400 hover:shadow-[0_4px_8px_1px] hover:shadow-slate-400"
          // color="indigoFull"
          onClick={() => navigate("/allcity")}
        >
          🌤️전국의 날씨
        </button>
      </motion.div>
    </div>
  );
}

export default MainCategory;
