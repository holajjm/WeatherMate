import React from "react";
import { useQuery } from "@tanstack/react-query";

import useCurrentLocation from "@hooks/useCurrentLocation";

import MainTimeZoneSkeleton from "@components/skeleton/MainTimeZoneSkeleton";

function MainWeatherTimeZone() {
  interface WeatherTime {
    clouds: { all: number };
    dt: number;
    dt_txt: string;
    main: {
      feels_like: number;
      grnd_level: number;
      humidity: number;
      pressure: number;
      sea_level: number;
      temp: number;
      temp_max: number;
      temp_min: number;
    };
    pop: number;
    rain?: {
      "3h": number;
    };
    sys: {
      pod: string;
    };
    visibility: number;
    weather: [
      {
        id: number;
        main: string;
        description: string;
        icon: string;
      },
    ];
    wind: {
      deg: number;
      gust: number;
      speed: number;
    };
  }
  const { latitude, longitude } = useCurrentLocation();

  const { data } = useQuery({
    queryKey: ["timeWeather", latitude, longitude],
    queryFn: async () => {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${import.meta.env.VITE_REACT_APP_WEATHER_API_KEY}&units=metric&cnt=8`,
      );
      const data = await response.json();
      return data;
    },
    staleTime: 1000 * 60 * 60,
    refetchInterval: 1000 * 60 * 60,
    refetchIntervalInBackground: true,
    enabled: !!latitude && !!longitude,
  });
  console.log(data);

  const unixTime = (time: number) => {
    const date = new Date(time * 1000);
    const hour = date.getHours() % 12 || 12;
    const ampm = date.getHours() >= 12 ? "PM" : "AM";
    return `${ampm} ${hour}`;
  };
  return (
    <section className="w-full p-2 bg-white flex flex-col gap-2">
      <h2 className="text-slate-400 text-base font-Pretendard">
        시간대별 날씨정보(3시간 기준)
      </h2>
      {data?.cod !== "200" ? (
        <MainTimeZoneSkeleton />
      ) : (
        <div className="w-full py-1 flex gap-1 rounded-lg overflow-x-scroll scrollbar-hide">
          {data &&
            data?.list?.map((item: WeatherTime) => (
              <div
                key={item.dt}
                className="h-24 w-full min-w-14 p-1 box-border border-[1px] shadow-md shadow-slate-300 bg-white rounded-lg flex flex-col items-center justify-center text-nowrap"
              >
                <p className="text-xs text-center text-slate-600">
                  {unixTime(item.dt)}
                </p>
                <img
                  className="w-10 h-10"
                  src={`https://openweathermap.org/img/wn/${item.weather[0].icon}.png`}
                  alt="Weather Icon"
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
