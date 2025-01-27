import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Coment from "../../assets/Coment.ts";
import { WeatherImage } from "type";
import MainComentSkeleton from "./MainComentSkeleton.tsx";
import { memberState } from "../../recoil/atom.mts";
import { useRecoilValue } from "recoil";

interface ComentObj {
  temperature: number;
  recommendation: string;
  CLOTHES_IMG: string;
}

function MainTodaysComent() {
  //코멘트 및 의상 추천 로직
  const data = JSON.parse(sessionStorage.getItem("sessionWeather") as string);
  const user = useRecoilValue(memberState);
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
    <div className="p-2 flex flex-col gap-2 items-center bg-slate-50 font-TTLaundryGothicB h-full fade-in">
      <div className="w-full flex justify-between text-left text-lg font-bold text-wrap">
        {user && user?.name ? (
          <div>
            <Link to={"/user/mypage"} className="text-blue-400">
              {user?.name}
            </Link>
            님,
            <h1>
              환영해요! <br />
              WeatherMate입니다!
            </h1>
          </div>
        ) : (
          <div>
            <Link
              to={"/user/validlogin"}
              className="font-medium hover:text-blue-600"
            >
              로그인
            </Link>
            해주세요
            <h1>
              환영해요! <br />
              WeatherMate입니다!
            </h1>
          </div>
        )}
        <section
          style={{ backgroundImage: `url(${realImage})` }}
          className={`border-2 w-1/2 text-base text-nowrap ${["Clouds", "Rain", "Drizzle", "Thunderstorm", "Snow"].includes(data?.weather[0].main) ? "text-slate-200" : "text-slate-700"} flex gap-4 rounded-xl p-4 box-border bg-white bg-cover bg-no-repeat bg-center`}
        >
          <div className="w-2/3 flex flex-col gap-2 justify-between">
            <div className="">
              <p className="text-lg">
                {String(new Date()).slice(4, 7)},
                {String(new Date()).slice(8, 11)}
              </p>
              <p className="">{String(new Date()).slice(0, 3)}</p>
            </div>
            <div className="">
              <p className="">{data?.weather && data.weather[0].description}</p>
              <p className="">
                {data && String(data.main?.temp).slice(0, 3)}°C
              </p>
            </div>
          </div>
          <div className="w-1/3 text-center flex flex-col gap-2">
            <img src={weatherImage} alt="weatherIcon" className="w-14 m-auto" />
            <div>
              <p>강수량</p>
              <p className="text-base">
                {data?.rain ? data?.rain?.["1h"] : "00"}mm
              </p>
            </div>
          </div>
        </section>
      </div>
      {comentObj ? (
        <div className="w-full text-center grow">
          <p className="font-SSRONETHandwritten text-amber-500 text-xl font-bold rounded-xl bg-amber-200 p-2">
            {comentObj?.recommendation}
          </p>
          <img
            src={comentObj?.CLOTHES_IMG}
            alt="main-img"
            className="w-56 m-auto"
          />
        </div>
      ) : (
        <MainComentSkeleton />
      )}
    </div>
  );
}

export default MainTodaysComent;
