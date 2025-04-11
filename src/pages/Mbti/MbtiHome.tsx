import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { memberState } from "@recoil/atom";

import usePageTitle from "@hooks/usePageTitle";
import Button from "@components/layout/Button";
import useScrollTop from "@hooks/useScrollTop";

import mbtiStart from "@assets/mbti/mbtiimg/mbtiStart.png";

function MbtiHome() {
  usePageTitle("MBTI");
  useScrollTop();
  const navigate = useNavigate();
  const location = useLocation();
  const [user] = useRecoilState(memberState);

  return (
    <div
      style={{ backgroundImage: `url(${mbtiStart})` }}
      className="max-w-[600px] min-w-[320px] m-auto min-h-screen p-2 bg-cover bg-center"
    >
      <div className="h-full flex flex-col gap-2 items-center justify-center text-nowrap">
        <div className="w-full pt-10 flex flex-col gap-2 text-center items-center justift-center">
          <h1 className="text-xl font-bold font-Pretendard">
            날씨 성격 테스트
          </h1>
          <img
            className=""
            src="/mainlogin.webp"
            width={120}
            loading="lazy"
            // fetchPriority="high"
            decoding="async"
          />
          <div className="text-base font-bold text-slate-600 opacity-80 font-SSRONETHandwritten">
            <p>날씨별 상황에 따라 내 행동을 골라보자!</p>
            <p>나는 어떤 날씨와 어울릴까?</p>
          </div>
          <div className="w-full flex gap-4">
            <Button
              text={"테스트 시작하기"}
              textColor="white"
              bgColor="sky"
              width="full"
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
            <Button
              text={"메인으로 돌아가기"}
              textColor="gray"
              bgColor="gray"
              width="full"
              onClick={() => navigate("/")}
            ></Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MbtiHome;
