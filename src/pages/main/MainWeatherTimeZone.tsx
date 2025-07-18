import React from "react";

import MainTimeZoneSkeleton from "@components/skeleton/MainTimeZoneSkeleton";
import { useWeatherTimeQuery } from "@features/weather/useWeatherTimeQuery";
import { UnixTime } from "@hooks/UnixTime";
import ErrorPage from "@pages/ErrorPage";

import type { WeatherTime } from "types/WeatherType";

function MainWeatherTimeZone() {
  const { data: timeWeather, isError, isFetching } = useWeatherTimeQuery();
  if (isError || timeWeather?.cod !== "200") return <ErrorPage />;

  return (
    <section className="w-full p-2 bg-slate-50 flex flex-col gap-1">
      <h2 className="text-slate-600 text-base flex justify-between">
        시간대별 날씨정보(3시간 기준)
      </h2>
      {isFetching ? (
        <MainTimeZoneSkeleton />
      ) : (
        <div className="w-full py-1 flex gap-1 rounded-lg overflow-x-scroll scrollbar-hide">
          {timeWeather?.list?.map((item: WeatherTime) => (
            <div
              key={item.dt}
              className="h-24 w-full min-w-14 p-1 box-border border-[1px] shadow-md shadow-slate-300 bg-white rounded-lg flex flex-col items-center justify-center text-nowrap"
            >
              <p className="text-xs text-center text-slate-600">
                {UnixTime(item.dt, "")}
              </p>
              <img
                className="w-10 h-10"
                src={`https://openweathermap.org/img/wn/${item.weather[0].icon}.png`}
                alt="Weather Icon"
                {...{ fetchpriority: "high" }}
                decoding="async"
              />
              <p className="text-center text-sm font-semibold">
                {item.main.temp.toFixed(1)}°C
              </p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default MainWeatherTimeZone;
