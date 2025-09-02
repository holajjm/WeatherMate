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
    <section className="flex w-full flex-col gap-1 bg-slate-50 p-2">
      <h2 className="flex justify-between text-base text-slate-600">
        시간대별 날씨정보(3시간 기준)
      </h2>
      {!isFetching ? (
        <div className="flex w-full gap-1 overflow-x-scroll rounded-lg py-1 scrollbar-hide">
          {timeWeather?.list?.map((item: WeatherTime) => (
            <div
              key={item.dt}
              className="box-border flex h-24 w-full min-w-14 flex-col items-center justify-center text-nowrap rounded-xl border-[1px] bg-white p-1 shadow-md shadow-slate-300"
            >
              <p className="text-center text-xs text-slate-600">
                {UnixTime(item.dt, "")}
              </p>
              <img
                className="h-10 w-10"
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
      ) : (
        <MainTimeZoneSkeleton />
      )}
    </section>
  );
}

export default MainWeatherTimeZone;
