import React, { useEffect } from "react";

import { realImageList } from "@constants/WeatherRealImages";
import Button from "@components/layout/Button";
import MainComentSkeleton from "@components/skeleton/MainComentSkeleton.tsx";
import { useWeatherQuery } from "@features/weather/useWeatherQuery";
import { useTimeAgo } from "@hooks/useTimeAgo";
import MainWeatherDetail from "@pages/main/MainWeatherDetail";
import MainAllCitiesWeather from "@pages/main/MainAllCitiesWeather";
import ErrorPage from "@pages/ErrorPage";

import { MdAutorenew } from "react-icons/md";
import type { WeatherImage } from "types/WeatherType";

function MainNowWeather() {
  const { data: WeatherData, isError, isFetching, refetch } = useWeatherQuery();
  if (isError) return <ErrorPage />;
  const realImage = WeatherData?.weather
    ? realImageList[WeatherData.weather[0].main as keyof WeatherImage]
    : null;
  const {
    timeAgoText,
    handleRefresh: refreshTimeAgo,
    setRefreshTime
  } = useTimeAgo();

  // 새로 고침 함수
  const handleRefresh = () => {
    refreshTimeAgo();
    refetch();
  };

  // 컴포넌트 마운트 시 초기 갱신 시간 설정
  useEffect(() => {
    if (WeatherData && !isFetching) {
      setRefreshTime(Date.now());
    }
  }, [WeatherData, isFetching, setRefreshTime]);
  return (
    <article className="flex h-full flex-col gap-2 bg-white p-4 drop-shadow-sm">
      <div className="flex w-full items-center justify-between text-caption">
        <h1 className="text-body font-bold text-toss-black">
          <span className="text-subtitle text-toss-blue">웨더메이트</span>가
          알려주는 날씨 정보
        </h1>
        <div className="flex items-center gap-2">
          <p>최근 갱신 : {timeAgoText}전</p>
          <Button
            text={<MdAutorenew className="text-subtitle" />}
            textColor="white"
            bgColor="gray"
            width="8"
            height="4"
            onClick={handleRefresh}
            aria-label="새로 고침"
          ></Button>
        </div>
      </div>
      <div className="flex gap-2">
        {!isFetching ? (
          <div className="relative flex h-36 w-1/2 gap-2">
            {realImage && (
              <img
                className="absolute h-full w-full rounded-button object-fill"
                src={realImage}
                alt="today"
                width={580}
                height={160}
                {...{ fetchpriority: "high" }}
                decoding="async"
              />
            )}
            <div
              className={`flex w-full flex-col justify-center gap-2 rounded-button text-center font-bold shadow-md shadow-slate-500 ${["Clouds", "Rain", "Drizzle", "Thunderstorm", "Snow"].includes(WeatherData?.weather[0].main as string) ? "text-white" : "text-toss-black"} z-20`}
            >
              <p className="text-caption">{WeatherData?.name}</p>
              <p className="text-title">
                {WeatherData?.main.temp.toFixed(1)}°C
              </p>
              <p className="text-subtitle">
                {WeatherData?.weather[0].description}
              </p>
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
