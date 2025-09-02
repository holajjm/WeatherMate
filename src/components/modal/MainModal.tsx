import React, { useEffect, useState } from "react";

import { Coment } from "@constants/Coment.ts";
import { useModalStore } from "@store/store.ts";

interface ComentObj {
  temperature: number;
  recommendation: string;
  clothes: string;
  CLOTHES_IMG: string;
}

function MainModal() {
  const data = JSON.parse(sessionStorage.getItem("sessionWeather") as string);
  const [comentObj, setComentObj] = useState<ComentObj>();
  const modalClose = useModalStore(state => state.modalClose);

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
    <div
      onClick={modalClose}
      className="font-Pretendard absolute left-0 top-0 z-50 box-border flex h-screen w-full items-center justify-center bg-black p-2 text-[#2d2d2d] opacity-95"
    >
      <div className="h-84 box-border flex min-w-[320px] max-w-[600px] flex-col justify-between rounded-lg bg-slate-200 p-2">
        <button onClick={modalClose} className="ml-auto">
          X
        </button>
        <section className="ml-auto flex h-full w-full grow flex-col justify-between gap-2 rounded-lg bg-cover bg-center bg-no-repeat text-center">
          <div className="z-20 flex w-full grow flex-col justify-between">
            <h1 className="text-xl font-bold">오늘의 추천</h1>
            <div className="flex flex-col gap-2">
              <div>
                <h2 className="text-left text-sm font-medium text-slate-800">
                  오늘의 한마디
                </h2>
                <p className="font-SSRONETHandwritten rounded-lg bg-blue_light p-1 font-bold text-blue_dark shadow-md shadow-slate-500">
                  {comentObj?.recommendation}
                </p>
              </div>
              <div>
                <h2 className="text-left text-sm font-medium text-slate-800">
                  오늘의 추천 의상
                </h2>
                <p className="font-SSRONETHandwritten rounded-lg bg-blue_light p-1 font-bold text-blue_dark shadow-md shadow-slate-500">
                  {comentObj?.clothes}
                </p>
              </div>
              <div className="rounded-lg bg-slate-100 shadow-md shadow-slate-500">
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
    </div>
  );
}

export default MainModal;
