import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { memberState } from "@recoil/atom.ts";

import { WeatherImage } from "type";
import { Coment } from "../../assets/Coment.ts";
import MainComentSkeleton from "@components/skeleton/MainComentSkeleton.tsx";

interface ComentObj {
  temperature: number;
  recommendation: string;
  CLOTHES_IMG: string;
}

function MainTodaysComent() {
  //코멘트 및 의상 추천 로직
  const data = JSON.parse(sessionStorage.getItem("sessionWeather") as string);
  const [comentObj, setComentObj] = useState<ComentObj>();

  useEffect(() => {
    const getRecommendation = () => {
      const currentTemperature = data?.main.temp - 273.15;
      let firstTemperature = Coment[0].temperature;
      let comentObject = Coment[0];
      for (let i = 1; i < Coment.length; i++) {
        if (
          Math.abs(currentTemperature - Coment[i].temperature) <
          Math.abs(currentTemperature - firstTemperature)
        ) {
          comentObject = Coment[i];
        }
      }
      setComentObj(comentObject);
    };
    getRecommendation();
  }, [data]);

  //날씨 이모티콘 로직
  const weatherIconList: WeatherImage = {
    Clear: "/uvi.svg",
    Clouds: "/manyClouds.svg",
    Rain: "/rain.svg",
    Drizzle: "/rain.svg",
    Thunderstorm: "/thunderStorm.svg",
    Snow: "/mainSnow.svg",
    Haze: "/Haze.svg",
    Mist: "/Mist.svg",
    Smoke: "/manyClouds.svg",
    Dust: "/manyClouds.svg",
    overcastClouds: "/sun.svg",
  };
  const weatherImage =
    !data || !data.weather
      ? weatherIconList["Clear"]
      : weatherIconList[data.weather[0].main as keyof WeatherImage];

  //실제 이미지 로직
  const realImageList: WeatherImage = {
    Clear: "./realImage/SunnyRealImage.svg", //text-slate-700
    Clouds: "./realImage/CloudyRealImage.svg", //text-slate-200
    Rain: "./realImage/RainyRealImage.svg", //text-slate-200
    Drizzle: "./realImage/RainyRealImage.svg", //text-slate-200
    Thunderstorm: "./realImage/RainyRealImage.svg", //text-slate-200
    Snow: "./realImage/SnowRealImage.svg", //text-slate-200
    Haze: "./realImage/HazeRealImage.svg", //text-slate-700
    Mist: "./realImage/HazeRealImage.svg", //text-slate-700
    Smoke: "./realImage/HazeRealImage.svg", //text-slate-700
    Dust: "./realImage/HazeRealImage.svg", //text-slate-700
    overcastClouds: "./realImage/SunnyRealImage.svg", //text-slate-700
  };
  const realImage =
    data && data.weather
      ? realImageList[data.weather[0].main as keyof WeatherImage]
      : null;

  return (
    <article className="p-2 flex flex-col gap-2 items-center bg-slate-50 font-TTLaundryGothicB h-full fade-in">
      <section className="w-full flex justify-between text-left text-lg font-bold text-wrap">
        <h1 className="text-base text-[#2D2D2D]">
          환영해요! <br /> WeatherMate입니다!
        </h1>
        <aside
          style={{ backgroundImage: `url(${realImage})` }}
          className={`border-2 w-1/2 h-32 text-base text-nowrap ${["Clouds", "Rain", "Drizzle", "Thunderstorm", "Snow"].includes(data?.weather[0].main) ? "text-slate-200" : "text-slate-700"} flex gap-4 rounded-xl p-4 box-border bg-white bg-cover bg-no-repeat bg-center relative`}
        >
          <div className="absolute top-0 left-0 w-full h-full opacity-25 bg-white z-10"></div>
          <div className="w-2/3 flex flex-col gap-1 justify-between absolute top-0 left-0 p-2 z-40 text-[#2D2D2D]">
            <p>
              {String(new Date()).slice(4, 7)},{String(new Date()).slice(8, 11)}
              {String(new Date()).slice(0, 3)}
            </p>
            <p></p>
            <p>{data?.weather && data.weather[0].description}</p>
            <p>{data && String(data.main?.temp).slice(0, 3)}°C</p>
          </div>
          <div className="w-1/3 text-center flex flex-col gap-1 absolute top-0 right-0 p-2 z-40 text-[#2D2D2D]">
            <p>강수량</p>
            <p>{data?.rain ? data?.rain?.["1h"] : "00"}mm</p>
          </div>
        </aside>
      </section>
      {comentObj ? (
        <section className="w-full text-center grow">
          <p className="font-SSRONETHandwritten text-amber-500 text-lg font-bold rounded-xl bg-amber-200 p-2">
            {comentObj?.recommendation}
          </p>
          <img
            src={comentObj?.CLOTHES_IMG}
            alt="coment-img"
            className="w-40 m-auto"
          />
        </section>
      ) : (
        <MainComentSkeleton />
      )}
    </article>
  );
}

export default MainTodaysComent;
