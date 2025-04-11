import React from "react";

import MainWeatherDetail from "@pages/main/MainWeatherDetail";
import MainLocationWeatherSkeleton from "@components/skeleton/MainLocationWeatherSkeleton";

const MainMyLocationWeather = () => {
  const data = JSON.parse(sessionStorage.getItem("sessionWeather") as string);

  return (
    <article className="bg-white flex flex-col gap-2 px-2">
      <header>
        <h2 className="text-slate-400 text-base">
          오늘의 상세 날씨를 알려드려요!
        </h2>
      </header>
      <section className="flex flex-col gap-4 items-center justify-center h-full bg-contain bg-center bg-no-repeat border-slate-200">
        {data ? <MainWeatherDetail /> : <MainLocationWeatherSkeleton />}
      </section>
    </article>
  );
};

export default MainMyLocationWeather;
