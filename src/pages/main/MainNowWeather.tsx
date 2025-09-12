import React from "react";

import { realImageList } from "@constants/WeatherRealImages";
import MainComentSkeleton from "@components/skeleton/MainComentSkeleton.tsx";
import { useWeatherQuery } from "@features/weather/useWeatherQuery";
import MainWeatherDetail from "@pages/main/MainWeatherDetail";
import MainAllCitiesWeather from "@pages/main/MainAllCitiesWeather";
import ErrorPage from "@pages/ErrorPage";

import type { WeatherImage } from "types/WeatherType";


function MainNowWeather() {
  const { data: weatherData, isError, isFetching } = useWeatherQuery();
  if (isError) return <ErrorPage />;
  const realImage = weatherData?.weather
    ? realImageList[weatherData.weather[0].main as keyof WeatherImage]
    : null;
  return (
    <article className="font-Pretendard fade-in flex h-full flex-col gap-2 p-2">
      {/* <div className="flex items-center justify-between"> */}
      {/* <h1 className="text-base font-bold text-[#2D2D2D]">
        <span className="text-lg text-blue_middle">웨더메이트</span>가 알려주는
        날씨 정보
      </h1> */}
      {/* </div> */}
      <div className="flex gap-2">
        {!isFetching ? (
          <div className="relative flex h-36 w-2/3 gap-2">
            <img
              className="absolute h-full w-full rounded-button object-fill"
              src={realImage ? realImage : "./Loading_Cloud.gif"}
              alt="today"
              width={580}
              height={160}
              {...{ fetchpriority: "high" }}
              decoding="async"
            />
            <div
              className={`flex w-full flex-col justify-center gap-2 rounded-button text-center font-bold shadow-md shadow-slate-500 ${["Clouds", "Rain", "Drizzle", "Thunderstorm", "Snow"].includes(weatherData?.weather[0].main as string) ? "text-white" : "text-[#2d2d2d]"} z-20`}
            >
              <p className="text-caption">{weatherData?.name}</p>
              <p className="text-title">{weatherData?.main.temp.toFixed(1)}°C</p>
              <p className="text-subtitle">{weatherData?.weather[0].description}</p>
            </div>
          </div>
        ) : (
          <MainComentSkeleton />
        )}
        <MainWeatherDetail />
        <MainAllCitiesWeather />
      </div>
    </article>
  );
}

export default MainNowWeather;
