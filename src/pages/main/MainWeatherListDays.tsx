import React from "react";

import Button from "@components/layout/Button";
import Loading from "@components/layout/Loading";
import { useWeatherDayQuery } from "@features/weather/useWeatherDayQuery";
import { UnixTime } from "@hooks/UnixTime";
import ErrorPage from "@pages/ErrorPage";

import type { WeatherTime } from "types/WeatherType";

function MainWeatherListDays() {
  const {
    data: DayWeather,
    isError,
    isFetching,
    refetch
  } = useWeatherDayQuery();
  // console.log(DayWeather);

  return (
    <section className="flex w-full flex-col gap-1 bg-slate-50">
      <h2 className="flex justify-between text-base text-slate-600">
        주간 날씨
      </h2>
      {!isFetching && !isError ? (
        DayWeather?.cod == "200" ? (
          <div className="flex w-full gap-1 overflow-x-scroll rounded-lg py-1 scrollbar-hide">
            {DayWeather?.list?.map((item: WeatherTime) => (
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

export default MainWeatherListDays;
