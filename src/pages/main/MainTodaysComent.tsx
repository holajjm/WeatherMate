import React, { useEffect, useRef, useState } from "react";

import { ModalPortal } from "@hooks/modalPortal";
import MainModal from "@components/modal/MainModal";
import { WeatherImage } from "type";

import MainComentSkeleton from "@components/skeleton/MainComentSkeleton.tsx";
import { MdDoubleArrow } from "react-icons/md";

function MainTodaysComent() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const handleOpen = () => {
    setIsOpen(true);
  };
  const handleClose = () => {
    setIsOpen(false);
  };
  const imgRef = useRef<HTMLImageElement>(null);
  useEffect(() => {
    if (imgRef.current) {
      imgRef.current.setAttribute("fetchpriority", "high");
    }
  }, []);
  const data = JSON.parse(sessionStorage.getItem("sessionWeather") as string);
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
    overcastClouds: "./realImage/CloudyRealImage.webp",
  };
  const realImage =
    data && data.weather
      ? realImageList[data.weather[0].main as keyof WeatherImage]
      : null;
  return (
    <article className="p-2 flex flex-col gap-2 font-Pretendard h-full fade-in">
      {isOpen && (
        <ModalPortal>
          <MainModal handleClose={handleClose} />
        </ModalPortal>
      )}
      <div className="flex items-center justify-between">
        <h1 className="font-bold text-base text-[#2D2D2D]">
          <span className="text-lg text-blue-600">웨더메이트</span>가 알려주는
          날씨 정보
        </h1>
        <button
          className="flex gap-1 items-center justify-center border-2 border-slate-300 w-32 h-10 rounded-lg bg-white text-sm hover:bg-slate-100 hover:scale-105 duration-100 ease-in-out"
          onClick={handleOpen}
        >
          오늘의 추천 보기
          <MdDoubleArrow />
        </button>
      </div>
      {data ? (
        <div className="relative w-full h-40 flex gap-2">
          {realImage && (
            <img
              className="absolute w-full h-40 object-cover rounded-lg"
              src={realImage}
              alt="today"
              ref={imgRef}
              width={520}
              height={160}
              fetchpriority="high"
              decoding="async"
            />
          )}
          <div
            className={`w-full flex flex-col justify-center gap-2 rounded-lg text-center font-bold shadow-md shadow-slate-500  ${["Clouds", "Rain", "Drizzle", "Thunderstorm", "Snow"].includes(data?.weather[0].main) ? "text-white" : "text-[#2d2d2d]"} z-20`}
          >
            <p>{data?.name}</p>
            <p className="text-4xl">{data?.main.temp.toFixed(1)}°C</p>
            <p>{data?.weather[0].description}</p>
          </div>
        </div>
      ) : (
        <MainComentSkeleton />
      )}
    </article>
  );
}

export default MainTodaysComent;
