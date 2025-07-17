import React from "react";

import { UnixTime } from "@hooks/UnixTime";

function MainWeatherDetail() {
  const data = JSON.parse(sessionStorage.getItem("sessionWeather") as string);

  function getWindStatus(speed: number) {
    if (speed > 1 && speed < 3) {
      return "보통";
    } else if (speed >= 4) {
      return "위험";
    } else {
      return "높음";
    }
  }
  return (
    <>
      {data && (
        <article className="grow flex flex-col w-full h-full justify-center items-center gap-1 font-TTLaundryGothicB text-sm">
          <section className="w-full flex gap-1 justify-between">
            <div className="bg-white w-full h-24 text-center text-nowrap flex flex-col gap-1 items-center justify-center p-1 border-[1px] shadow-lg shadow-slate-200 rounded-lg">
              <img
                src="./WeatherInfo/WeatherInfo_Sunrise.webp"
                className="w-8"
                alt="일출"
                loading="lazy"
                decoding="async"
              />
              <p className="text-slate-600">일출</p>
              <hr className="border-[1px] border-slate-400 w-5/6" />
              <p className="text-slate-700">
                {UnixTime(data.sys.sunrise, "withMin")}
              </p>
            </div>
            <div className="bg-white w-full h-24 text-center text-nowrap flex flex-col gap-1 items-center justify-center p-1 border-[1px] shadow-lg shadow-slate-200 rounded-lg">
              <img
                src="./WeatherInfo/WeatherInfo_Sunset.webp"
                className="w-8"
                alt="일몰"
                loading="lazy"
                decoding="async"
              />
              <p className="text-slate-600">일몰</p>
              <hr className="border-[1px] border-slate-400 w-5/6" />
              <p className="text-slate-700">
                {UnixTime(data.sys.sunset, "withMin")}
              </p>
            </div>
            <div className="bg-white w-full h-24 text-center text-nowrap flex flex-col gap-1 items-center justify-center p-1 border-[1px] shadow-lg shadow-slate-200 rounded-lg">
              <img
                src="./WeatherInfo/WeatherInfo_HighTemp.webp"
                className="w-8"
                alt="최고 온도"
                loading="lazy"
                decoding="async"
              />
              <p className="text-slate-600">최고 온도</p>
              <hr className="border-[1px] border-slate-400 w-5/6" />
              <p className="text-slate-700">
                {data.main.temp_max.toFixed(1)}°C
              </p>
            </div>
          </section>
          <section className="w-full flex gap-1 justify-between">
            <div className="bg-white w-full h-24 text-center text-nowrap flex flex-col gap-1 items-center justify-center p-1 border-[1px] shadow-lg shadow-slate-200 rounded-lg">
              <img
                src="./WeatherInfo/WeatherInfo_LowTemp.webp"
                className="w-8"
                alt="최저 온도"
                loading="lazy"
                decoding="async"
              />
              <p className="text-slate-600">최저 온도</p>
              <hr className="border-[1px] border-slate-400 w-5/6" />
              <p className="text-slate-700">
                {data.main.temp_min.toFixed(1)}°C
              </p>
            </div>
            <div className="bg-white w-full h-24 text-center text-nowrap flex flex-col gap-1 items-center justify-center p-1 border-[1px] shadow-lg shadow-slate-200 rounded-lg">
              <img
                src="./WeatherInfo/WeatherInfo_Humidity.webp"
                className="w-8"
                alt="습도"
                loading="lazy"
                decoding="async"
              />
              <p className="text-slate-600">습도</p>
              <hr className="border-[1px] border-slate-400 w-5/6" />
              <p className="text-slate-700">{data.main.humidity}%</p>
            </div>
            <div className="bg-white w-full h-24 text-center text-nowrap flex flex-col gap-1 items-center justify-center p-1 border-[1px] shadow-lg shadow-slate-200 rounded-lg">
              <img
                src="./WeatherInfo/WeatherInfo_Feels.webp"
                className="w-8"
                alt="체감온도"
                loading="lazy"
                decoding="async"
              />
              <p className="text-slate-600">체감온도</p>
              <hr className="border-[1px] border-slate-400 w-5/6" />
              <p className="text-slate-700">
                {data.main.feels_like.toFixed(1)}°C
              </p>
            </div>
          </section>
          <section className="w-full flex gap-1 justify-between">
            <div className="bg-white w-full h-24 text-center text-nowrap flex flex-col gap-1 items-center justify-center p-1 border-[1px] shadow-lg shadow-slate-200 rounded-lg">
              <img
                src="./WeatherIcon/WeatherIconWind.webp"
                className="w-8"
                alt="풍속"
                loading="lazy"
                decoding="async"
              />
              <p className="text-slate-600">풍속</p>
              <hr className="border-[1px] border-slate-400 w-5/6" />
              <p className="text-slate-700">{data.wind.speed}m/s</p>
            </div>
            <div className="bg-white w-full h-24 text-center text-nowrap flex flex-col gap-1 items-center justify-center p-1 border-[1px] shadow-lg shadow-slate-200 rounded-lg">
              <img
                src="./WeatherIcon/WeatherIconSun.webp"
                className="w-8"
                alt="자외선"
                loading="lazy"
                decoding="async"
              />
              <p className="text-slate-600">자외선</p>
              <hr className="border-[1px] border-slate-400 w-5/6" />
              <p className="text-slate-700">{getWindStatus(data.wind.speed)}</p>
            </div>
            <div className="bg-white w-full h-24 text-center text-nowrap flex flex-col gap-1 items-center justify-center p-1 border-[1px] shadow-lg shadow-slate-200 rounded-lg">
              <img
                src="./WeatherIcon/WeatherIconRain.webp"
                className="w-8"
                alt="강수량"
                loading="lazy"
                decoding="async"
              />
              <p className="text-slate-600">강수량</p>
              <hr className="border-[1px] border-slate-400 w-5/6" />
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
