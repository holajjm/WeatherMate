import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

import usePageTitle from "@hooks/usePageTitle";
import Button from "@components/layout/Button";
import useScrollTop from "@hooks/useScrollTop";
import { useUserStore } from "@store/store";

function MbtiHome() {
  usePageTitle("MBTI");
  useScrollTop();
  const navigate = useNavigate();
  const location = useLocation();
  const user = useUserStore(state => state.user);

  return (
    <div
      className={`relative m-auto min-h-screen min-w-[320px] max-w-[600px] bg-cover bg-center p-2`}
    >
      <img
        className="absolute left-0 top-0 -z-10 h-screen object-cover"
        src="./MBTIImage/MBTIMain.webp"
        alt="mbti"
        {...{ fetchpriority: "high" }}
        decoding="async"
      />
      <div
        className={`flex h-full flex-col items-center justify-center gap-2 text-nowrap`}
      >
        <div
          className={`justift-center flex w-full flex-col items-center gap-2 pt-10 text-center`}
        >
          <h1 className="font-Pretendard text-xl font-bold">
            날씨 성격 테스트
          </h1>
          <img
            className=""
            src="/MainIcon.webp"
            width={120}
            loading="lazy"
            {...{ fetchpriority: "high" }}
            decoding="async"
          />
          <div
            className={`font-SSRONETHandwritten text-base font-bold text-slate-600 opacity-80`}
          >
            <p>날씨별 상황에 따라 내 행동을 골라보자!</p>
            <p>나는 어떤 날씨와 어울릴까?</p>
          </div>
          <Button
            text={"테스트 시작하기"}
            textColor="white"
            bgColor="blue"
            width="5/6"
            height="12"
            onClick={() => {
              if (!user?.name) {
                confirm("로그인이 필요합니다. 로그인 하시겠습니까?")
                  ? navigate("/mainlogin", { state: location.pathname })
                  : null;
              } else {
                navigate("question");
              }
            }}
          ></Button>
        </div>
      </div>
    </div>
  );
}

export default MbtiHome;
