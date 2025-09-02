import React from "react";

import { UnixTime } from "@hooks/UnixTime";
import { useWeatherQuery } from "@features/weather/useWeatherQuery";
import ErrorPage from "@pages/ErrorPage";

function MainWeatherDetail() {
  const data = JSON.parse(sessionStorage.getItem("sessionWeather") as string);
  const { isError, isFetching } = useWeatherQuery();
  if (isError) return <ErrorPage />;
  const getUVStatus = (speed: number) => {
    if (speed < 3) {
      return "보통";
    } else if (speed >= 4) {
      return "위험";
    } else {
      return "높음";
    }
  };
  return (
    <>
      {!isFetching && (
        <article className="font-TTLaundryGothicB flex h-full w-full grow flex-col items-center justify-center gap-1 text-sm">
          <section className="flex w-full justify-between gap-1">
            <div className="flex h-24 w-full flex-col items-center justify-center gap-1 text-nowrap rounded-xl border-[1px] bg-white p-1 text-center shadow-lg shadow-slate-200">
              <img
                src="./WeatherInfo/WeatherInfo_Sunrise.webp"
                className="w-8"
                alt="일출"
                loading="lazy"
                decoding="async"
              />
              <p className="text-slate-600">일출</p>
              <hr className="w-5/6 border-[1px] border-slate-400" />
              <p className="text-slate-700">
                {UnixTime(data?.sys.sunrise, "withMin")}
              </p>
            </div>
            <div className="flex h-24 w-full flex-col items-center justify-center gap-1 text-nowrap rounded-xl border-[1px] bg-white p-1 text-center shadow-lg shadow-slate-200">
              <img
                src="./WeatherInfo/WeatherInfo_Sunset.webp"
                className="w-8"
                alt="일몰"
                loading="lazy"
                decoding="async"
              />
              <p className="text-slate-600">일몰</p>
              <hr className="w-5/6 border-[1px] border-slate-400" />
              <p className="text-slate-700">
                {UnixTime(data?.sys.sunset, "withMin")}
              </p>
            </div>
            <div className="flex h-24 w-full flex-col items-center justify-center gap-1 text-nowrap rounded-xl border-[1px] bg-white p-1 text-center shadow-lg shadow-slate-200">
              <img
                src="./WeatherInfo/WeatherInfo_HighTemp.webp"
                className="w-8"
                alt="최고 온도"
                loading="lazy"
                decoding="async"
              />
              <p className="text-slate-600">최고 온도</p>
              <hr className="w-5/6 border-[1px] border-slate-400" />
              <p className="text-slate-700">
                {data?.main.temp_max.toFixed(1)}°C
              </p>
            </div>
          </section>
          <section className="flex w-full justify-between gap-1">
            <div className="flex h-24 w-full flex-col items-center justify-center gap-1 text-nowrap rounded-xl border-[1px] bg-white p-1 text-center shadow-lg shadow-slate-200">
              <img
                src="./WeatherInfo/WeatherInfo_LowTemp.webp"
                className="w-8"
                alt="최저 온도"
                loading="lazy"
                decoding="async"
              />
              <p className="text-slate-600">최저 온도</p>
              <hr className="w-5/6 border-[1px] border-slate-400" />
              <p className="text-slate-700">
                {data?.main.temp_min.toFixed(1)}°C
              </p>
            </div>
            <div className="flex h-24 w-full flex-col items-center justify-center gap-1 text-nowrap rounded-xl border-[1px] bg-white p-1 text-center shadow-lg shadow-slate-200">
              <img
                src="./WeatherInfo/WeatherInfo_Humidity.webp"
                className="w-8"
                alt="습도"
                loading="lazy"
                decoding="async"
              />
              <p className="text-slate-600">습도</p>
              <hr className="w-5/6 border-[1px] border-slate-400" />
              <p className="text-slate-700">{data?.main.humidity}%</p>
            </div>
            <div className="flex h-24 w-full flex-col items-center justify-center gap-1 text-nowrap rounded-xl border-[1px] bg-white p-1 text-center shadow-lg shadow-slate-200">
              <img
                src="./WeatherInfo/WeatherInfo_Feels.webp"
                className="w-8"
                alt="체감온도"
                loading="lazy"
                decoding="async"
              />
              <p className="text-slate-600">체감온도</p>
              <hr className="w-5/6 border-[1px] border-slate-400" />
              <p className="text-slate-700">
                {data?.main.feels_like.toFixed(1)}°C
              </p>
            </div>
          </section>
          <section className="flex w-full justify-between gap-1">
            <div className="flex h-24 w-full flex-col items-center justify-center gap-1 text-nowrap rounded-xl border-[1px] bg-white p-1 text-center shadow-lg shadow-slate-200">
              <img
                src="./WeatherIcon/WeatherIconWind.webp"
                className="w-8"
                alt="풍속"
                loading="lazy"
                decoding="async"
              />
              <p className="text-slate-600">풍속</p>
              <hr className="w-5/6 border-[1px] border-slate-400" />
              <p className="text-slate-700">
                {data?.wind.speed}m/s({getUVStatus(data?.wind.speed)})
              </p>
            </div>
            <div className="flex h-24 w-full flex-col items-center justify-center gap-1 text-nowrap rounded-xl border-[1px] bg-white p-1 text-center shadow-lg shadow-slate-200">
              <img
                src="./WeatherIcon/WeatherIconSun.webp"
                className="w-8"
                alt="자외선"
                loading="lazy"
                decoding="async"
              />
              <p className="text-slate-600">자외선</p>
              <hr className="w-5/6 border-[1px] border-slate-400" />
              <p className="text-slate-700">{getUVStatus(data?.wind.speed)}</p>
            </div>
            <div className="flex h-24 w-full flex-col items-center justify-center gap-1 text-nowrap rounded-xl border-[1px] bg-white p-1 text-center shadow-lg shadow-slate-200">
              <img
                src="./WeatherIcon/WeatherIconRain.webp"
                className="w-8"
                alt="강수량"
                loading="lazy"
                decoding="async"
              />
              <p className="text-slate-600">강수량</p>
              <hr className="w-5/6 border-[1px] border-slate-400" />
              <p className="text-slate-700">
                {data?.rain ? data?.rain?.["1h"] : "00"}mm
              </p>
            </div>
          </section>
        </article>
      )}
    </>
  );
}

export default MainWeatherDetail;
