import React from "react";

import Button from "@components/layout/Button";
import Loading from "@components/layout/Loading";
import { useWeatherTimeQuery } from "@features/weather/useWeatherTimeQuery";
import { UnixTime } from "@hooks/UnixTime";
import ErrorPage from "@pages/ErrorPage";

import type { WeatherTime } from "types/WeatherType";

function MainWeatherTimeZone() {
  const {
    data: TimeWeather,
    isError,
    isFetching,
    refetch
  } = useWeatherTimeQuery();
  // console.log(TimeWeather);

  return (
    <section className="flex w-full flex-col gap-1 bg-slate-50 p-2 text-caption">
      <h2 className="flex justify-between text-base text-slate-600">
        시간대별 날씨
      </h2>
      {!isFetching && !isError ? (
        TimeWeather?.cod == "200" ? (
          <div className="flex w-full gap-1 overflow-x-scroll rounded-lg py-1 scrollbar-hide">
            {TimeWeather?.list?.map((item: WeatherTime) => (
              <div
                key={item.dt}
                className="box-border flex h-24 w-full min-w-14 flex-col items-center justify-center text-nowrap rounded-xl border-[1px] bg-white p-1 shadow-md shadow-slate-300"
              >
                <p className="text-center text-slate-600">
                  {UnixTime(item.dt, "")}
                </p>
                <img
                  className="bg-toss-lightgray w-10 rounded-button"
                  src={`https://openweathermap.org/img/wn/${item.weather[0].icon}.png`}
                  alt="Weather Icon"
                  {...{ fetchpriority: "high" }}
                  decoding="async"
                />
                <p className="text-center font-semibold">
                  {item.main.temp.toFixed(1)}°C
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-center">
            <Button
              text={"다시 불러오기"}
              textColor="white"
              bgColor="gray"
              width="24"
              height="10"
              onClick={refetch}
            ></Button>
          </div>
        )
      ) : (
        <Loading />
      )}
      {isError && <ErrorPage />}
    </section>
  );
}

export default MainWeatherTimeZone;
