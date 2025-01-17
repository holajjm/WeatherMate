import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Button from "@components/layout/Button";

function MainPreviewMbti() {
  const navigate = useNavigate();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="max-w-[600px] min-w-[320px] m-auto min-h-screen flex flex-col gap-2 items-center text-lg font-UhBeeKangJa bg-slate-50 px-2">
      <h1 className="font-bold text-2xl p-4 h-16">카테고리</h1>
      <button
        type="button"
        // text={'🌤️날씨 성격 테스트'}
        className="w-full h-12 text-left rounded-lg font-semibold text-white text-pretty p-2 duration-200 transition-all bg-sky-400 hover:shadow-[0_4px_8px_1px] hover:shadow-slate-400"
        // color="skyFull"
        onClick={() => navigate("/mbti")}
      >
        🌤️날씨 성격 테스트
      </button>
      <button
        type="button"
        // text={'🌤️전국의 날씨'}
        className="w-full h-12 text-left rounded-lg font-semibold text-white text-pretty p-2 duration-200 transition-all bg-indigo-500 hover:shadow-[0_4px_8px_1px] hover:shadow-slate-400"
        // color="indigoFull"
        onClick={() => navigate("/allcity")}
      >
        🌤️전국의 날씨
      </button>
    </div>
  );
}

export default MainPreviewMbti;
