import React, { useEffect } from "react";

import Button from "@components/layout/Button";
import Loading from "@components/layout/Loading";
import { useWeatherTimeQuery } from "@features/weather/useWeatherTimeQuery";
import { UnixTime } from "@hooks/UnixTime";
import { useTimeAgo } from "@hooks/useTimeAgo";
import ErrorPage from "@pages/ErrorPage";

import { MdAutorenew } from "react-icons/md";
import type { WeatherTime } from "types/WeatherType";

function MainWeatherTimeZone() {
  const {
    data: TimeWeather,
    isError,
    isFetching,
    refetch
  } = useWeatherTimeQuery();

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
    if (TimeWeather && !isFetching) {
      setRefreshTime(Date.now());
    }
  }, [TimeWeather, isFetching, setRefreshTime]);

  // console.log(TimeWeather);

  return (
    <section className="flex w-full flex-col gap-1 bg-white p-4 text-caption drop-shadow-sm">
      <div className="flex w-full items-center justify-between">
        <h2 className="flex justify-between text-body font-bold text-toss-black">
          시간대별 날씨
        </h2>
        <div className="flex items-center gap-2">
          <p>최근 갱신 : {timeAgoText}전</p>
          <Button
            text={<MdAutorenew className="text-subtitle" />}
            textColor="white"
            bgColor="gray"
            width="8"
            height="4"
            onClick={handleRefresh}
            label="새로 고침"
          ></Button>
        </div>
      </div>
      {!isFetching && !isError ? (
        TimeWeather?.cod == "200" ? (
          <div className="flex w-full gap-1 overflow-x-scroll rounded-button py-1 scrollbar-hide">
            {TimeWeather?.list?.map((item: WeatherTime) => (
              <div
                key={item.dt}
                className="box-border flex h-24 w-full min-w-14 flex-col items-center justify-center gap-1 text-nowrap rounded-xl border-[1px] bg-white p-1 shadow-md shadow-slate-300"
              >
                <p className="text-center text-caption text-toss-gray">
                  {UnixTime(item.dt, "")}
                </p>
                <img
                  className="w-10 rounded-button bg-toss-lightgray"
                  src={`https://openweathermap.org/img/wn/${item.weather[0].icon}.png`}
                  alt="Weather Icon"
                  {...{ fetchpriority: "high" }}
                  decoding="async"
                />
                <p className="text-center">{item.main.temp.toFixed(1)}°C</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex h-24 items-center justify-center">
            <Button
              text={"다시 불러오기"}
              textColor="white"
              bgColor="gray"
              width="24"
              height="10"
              onClick={refetch}
              label="새로 고침"
            ></Button>
          </div>
        )
      ) : (
        <div className="flex h-24 items-center justify-center">
          <Loading />
        </div>
      )}
      {isError && <ErrorPage />}
    </section>
  );
}

export default MainWeatherTimeZone;
