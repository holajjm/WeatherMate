import React from "react";

import { WeatherImage } from "types/WeatherType";
import { realImageList } from "@constants/WeatherRealImages";
import MainComentSkeleton from "@components/skeleton/MainComentSkeleton.tsx";

function MainNowWeather() {
  const data = JSON.parse(sessionStorage.getItem("sessionWeather") as string);
  const realImage =
    data && data.weather
      ? realImageList[data.weather[0].main as keyof WeatherImage]
      : null;
  return (
    <article className="p-2 flex flex-col gap-2 font-Pretendard h-full fade-in">
      <div className="flex items-center justify-between">
        <h1 className="font-bold text-base text-[#2D2D2D]">
          <span className="text-lg text-blue_middle">웨더메이트</span>가
          알려주는 날씨 정보
        </h1>
      </div>
      {data ? (
        <div className="relative w-full h-40 flex gap-2">
          {realImage && (
            <img
              className="absolute w-full h-40 object-cover rounded-lg"
              src={realImage}
              alt="today"
              width={580}
              height={160}
              {...{ fetchpriority: "high" }}
              decoding="async"
            />
          )}
          <div
            className={`w-full flex flex-col justify-center gap-2 rounded-lg text-center font-bold shadow-md shadow-slate-500  ${["Clouds", "Rain", "Drizzle", "Thunderstorm", "Snow"].includes(data?.weather[0].main) ? "text-white" : "text-[#2d2d2d]"} z-20`}
          >
            <p>{data?.name}</p>
            <p className="text-4xl">{data?.main.temp.toFixed(1)}°C</p>
            <p>{data?.weather[0].description}</p>
          </div>
        </div>
      ) : (
        <MainComentSkeleton />
      )}
    </article>
  );
}

export default MainNowWeather;
