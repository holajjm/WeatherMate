import React, { useEffect, useState } from "react";

import { Coment } from "@constants/Coment.ts";
import useScrollTop from "@hooks/useScrollTop";

interface ComentObj {
  temperature: number;
  recommendation: string;
  clothes: string;
  CLOTHES_IMG: string;
}

function TodaysInfo() {
  useScrollTop();
  const data = JSON.parse(sessionStorage.getItem("sessionWeather") as string);
  const [comentObj, setComentObj] = useState<ComentObj>();

  useEffect(() => {
    const getRecommendation = () => {
      if (Coment[0]?.temperature >= data?.main.temp) {
        setComentObj(Coment[0]);
        return;
      } else {
        for (let i = 0; i < Coment.length; i++) {
          if (
            Coment[i]?.temperature < data?.main.temp &&
            Coment[i + 1]?.temperature >= data?.main.temp
          ) {
            setComentObj(Coment[i + 1]);
            return;
          } else {
            setComentObj(Coment[Coment.length - 1]);
          }
        }
      }
    };
    getRecommendation();
  }, [data]);

  return (
    <div className="flex h-screen items-start justify-center bg-slate-100 p-4 text-lg">
      <section className="flex h-full w-full flex-col justify-between gap-2 rounded-button text-center">
        <div className="z-20 flex w-full flex-col justify-between gap-4">
          <h1 className="text-subtitle font-bold">오늘의 추천</h1>
          <div className="flex w-full gap-4">
            <div className="flex w-full flex-col gap-4">
                <h2 className="text-center text-caption font-medium text-toss-gray">
                  오늘의 한마디
                </h2>
                <p className="flex items-center justify-center rounded-button grow bg-toss-lightgray p-1 text-body font-bold text-toss-blue drop-shadow-md">
                  {comentObj?.recommendation}
                </p>
                <h2 className="text-center text-caption font-medium text-toss-gray">
                  오늘의 추천 의상
                </h2>
                <p className="flex items-center justify-center rounded-button grow bg-toss-lightgray p-1 text-body font-bold text-toss-blue drop-shadow-md">
                  {comentObj?.clothes}
                </p>
            </div>
            <div className="w-full rounded-button bg-white drop-shadow-md">
              <img
                src={comentObj?.CLOTHES_IMG}
                alt="Today's Clothes"
                {...{ fetchpriority: "high" }}
                decoding="async"
                width={96}
                height={160}
                className="m-auto h-40 w-24"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default TodaysInfo;
