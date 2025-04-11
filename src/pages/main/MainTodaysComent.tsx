import React, { useEffect, useRef, useState } from "react";

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
  const imgRef = useRef<HTMLImageElement>(null);
  useEffect(() => {
    if (imgRef.current) {
      imgRef.current.setAttribute("fetchpriority", "high");
    }
  }, []);
  const data = JSON.parse(sessionStorage.getItem("sessionWeather") as string);
  const [comentObj, setComentObj] = useState<ComentObj>();

  useEffect(() => {
    const getRecommendation = () => {
      if (Coment[0].temperature >= data?.main.temp) {
        setComentObj(Coment[0]);
        return;
      } else {
        for (let i = 0; i < Coment.length; i++) {
          if (
            Coment[i].temperature < data?.main.temp &&
            Coment[i + 1].temperature >= data?.main.temp
          ) {
            setComentObj(Coment[i + 1]);
            return;
          }
        }
      }
    };
    getRecommendation();
  }, [data]);

  //날씨 이모티콘 로직
  const weatherIconList: WeatherImage = {
    Clear: "/sun.webp",
    Clouds: "/manyClouds.webp",
    Rain: "/rain.webp",
    Drizzle: "/rain.webp",
    Thunderstorm: "/thunderStorm.webp",
    Snow: "/mainSnow.webp",
    Haze: "/Haze.webp",
    Mist: "/Mist.webp",
    Smoke: "/manyClouds.webp",
    Dust: "/manyClouds.webp",
    overcastClouds: "/sun.webp",
  };
  const weatherImage =
    !data || !data.weather
      ? weatherIconList["Clear"]
      : weatherIconList[data.weather[0].main as keyof WeatherImage];

  //실제 이미지 로직
  const realImageList: WeatherImage = {
    Clear: "./realImage/SunnyRealImage.webp",
    Clouds: "./realImage/CloudyRealImage.webp",
    Rain: "./realImage/RainyRealImage.webp",
    Drizzle: "./realImage/RainyRealImage.webp",
    Thunderstorm: "./realImage/RainyRealImage.webp",
    Snow: "./realImage/SnowRealImage.webp",
    Haze: "./realImage/HazeRealImage.webp",
    Mist: "./realImage/HazeRealImage.webp",
    Smoke: "./realImage/HazeRealImage.webp",
    Dust: "./realImage/HazeRealImage.webp",
    overcastClouds: "./realImage/SunnyRealImage.webp",
  };
  const realImage =
    data && data.weather
      ? realImageList[data.weather[0].main as keyof WeatherImage]
      : null;
  // console.log(data);
  // console.log(comentObj);

  return (
    <article className="p-2 flex flex-col gap-2 bg-slate-50 font-TTLaundryGothicB h-full fade-in">
      <section className="w-full flex justify-between text-left text-lg font-bold text-wrap">
        <h1 className="text-base text-[#2D2D2D]">
          환영해요! <br /> WeatherMate입니다!
        </h1>
      </section>
      {data ? (
        <section
          style={{ backgroundImage: `url(${realImage})` }}
          className="relative w-full p-2 box-border flex flex-col gap-2 justify-between rounded-lg text-center grow bg-center bg-no-repeat bg-cover ml-auto"
        >
          <div className="absolute top-0 left-0 w-full h-full bg-white opacity-25 z-10"></div>
          <div className="w-full h-40 flex gap-2 z-20">
            <div
              className={`w-full flex flex-col justify-center gap-2 rounded-lg text-center shadow-md shadow-slate-500  ${["Clouds", "Rain", "Drizzle", "Thunderstorm", "Snow"].includes(data?.weather[0].main) ? "text-white" : "text-[#2d2d2d]"} z-20`}
            >
              <p className="h-8 font-SSRONETHandwritten text-amber-500 font-bold rounded-lg bg-amber-200 p-1 z-20 shadow-md shadow-slate-500">
                {comentObj?.recommendation}
              </p>
              <p>{data?.name}</p>
              <p className="text-4xl">{data?.main.temp.toFixed(1)}°C</p>
              <p>{data?.weather[0].description}</p>
            </div>
            <div className="bg-slate-50 rounded-lg p-2 shadow-md shadow-slate-500">
              <img
                src={comentObj?.CLOTHES_IMG}
                alt="Today's Clothes"
                ref={imgRef}
                loading="lazy"
                fetchPriority="high"
                decoding="async"
                width={160}
                height={144}
                className="w-40 h-36 m-auto"
              />
            </div>
          </div>
        </section>
      ) : (
        <MainComentSkeleton />
      )}
    </article>
  );
}

export default MainTodaysComent;
