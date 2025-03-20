import React from "react";

import MainWeatherDetail from "@pages/main/MainWeatherDetail";
import MainLocationWeatherSkeleton from "@components/skeleton/MainLocationWeatherSkeleton";

const MainMyLocationWeather = () => {
  const data = JSON.parse(sessionStorage.getItem("sessionWeather") as string);

  return (
    <article className="bg-white flex flex-col gap-4 px-2">
      <header>
        <h1 className="font-black text-lg text-[#2D2D2D]">
          <span className="text-xl text-blue-600">웨더메이트</span>가 알려주는
          날씨 정보
        </h1>
        <h2 className="text-slate-400 text-base">
          오늘의 상세 날씨를 알려드려요!
        </h2>
      </header>
      <section className="flex flex-col gap-4 items-center justify-center h-full bg-contain bg-center bg-no-repeat border-slate-200">
        {data ? (
          <>
            <div className="w-full border-2 rounded-xl text-4xl font-bold text-center shadow-lg shadow-slate-200">
              <h2 className="text-lg font-bold">{data.name}</h2>
              {data.main.temp.toFixed(1)}°C
              <p className="text-lg font-bold">{data.weather[0].description}</p>
            </div>
            <MainWeatherDetail />
          </>
        ) : (
          <MainLocationWeatherSkeleton />
        )}
      </section>
    </article>
  );
};

export default MainMyLocationWeather;
