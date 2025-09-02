import React from "react";

import MainWeatherDetail from "@pages/main/MainWeatherDetail";
import MainLocationWeatherSkeleton from "@components/skeleton/MainLocationWeatherSkeleton";
import { useWeatherQuery } from "@features/weather/useWeatherQuery";
import ErrorPage from "@pages/ErrorPage";

const MainMyLocationWeather = () => {
  const { isError, isFetching } = useWeatherQuery();
  if (isError) return <ErrorPage />;
  return (
    <article className="flex flex-col gap-2 bg-slate-50 px-2">
      <header>
        <h2 className="text-base text-slate-600">
          오늘의 상세 날씨를 알려드려요!
        </h2>
      </header>
      <section
        className={`
          flex h-full flex-col items-center justify-center gap-4
          border-slate-200 bg-contain bg-center bg-no-repeat
        `}
      >
        {!isFetching ? <MainWeatherDetail /> : <MainLocationWeatherSkeleton />}
      </section>
    </article>
  );
};

export default MainMyLocationWeather;
