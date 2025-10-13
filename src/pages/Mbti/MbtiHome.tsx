import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

import usePageTitle from "@hooks/usePageTitle";
import Button from "@components/layout/Button";
import useScrollTop from "@hooks/useScrollTop";
import { useUserStore } from "@store/store";
import { Helmet } from "react-helmet-async";

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
      <Helmet>
        <title>WeatherMate - MBTI</title>
        <meta
          name="description"
          content="당신의 위치에 따른 날씨와 다양한 정보를 추천해주는 친구"
        />
        <meta
          name="keywords"
          content="날씨, 장소, weather, 친구, mate, friend, location, place"
        />

        <meta property="og:title" content="WeatherMate - MBTI" />
        <meta
          property="og:description"
          content="WeatherMate MBTI 페이지입니다."
        />
        <meta property="og:image" content="/thumbnail.webp" />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://weather-mate-holajjms-projects.vercel.app/mbti"
        />
        <meta property="og:site_name" content="WeatherMate" />
        <meta property="og:locale" content="ko_KR" />

        <meta name="twitter:title" content="WeatherMate - MBTI" />
        <meta
          name="twitter:description"
          content="WeatherMate MBTI 페이지입니다."
        />
        <meta name="twitter:card" content="/thumbnail.webp" />
        <meta name="twitter:image" content="/thumbnail.webp" />
      </Helmet>
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
            label="테스트 시작하기"
          ></Button>
        </div>
      </div>
    </div>
  );
}

export default MbtiHome;
