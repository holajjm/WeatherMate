import { Coment } from "../../assets/Coment.ts";
import React, { useEffect, useRef, useState } from "react";

interface ComentObj {
  temperature: number;
  recommendation: string;
  clothes: string;
  CLOTHES_IMG: string;
}

function MainModal({ handleClose }: { handleClose: () => void }) {
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

  return (
    <div
      onClick={handleClose}
      className="w-full h-screen p-2 box-border text-[#2d2d2d] bg-black absolute top-0 left-0 z-50 opacity-95 flex items-center justify-center font-Pretendard"
    >
      <div className="max-w-[600px] min-w-[320px] h-84 flex flex-col justify-between p-2 box-border rounded-lg bg-slate-200">
        <button onClick={handleClose} className="ml-auto">
          X
        </button>
        <section className="w-full h-full flex flex-col gap-2 justify-between rounded-lg text-center grow bg-center bg-no-repeat bg-cover ml-auto">
          <div className="grow w-full flex flex-col justify-between z-20">
            <h1 className="text-xl font-bold">오늘의 추천</h1>
            <div className="flex flex-col gap-2">
              <div>
                <h2 className="text-sm text-left font-medium text-slate-800">
                  오늘의 한마디
                </h2>
                <p className="font-SSRONETHandwritten text-amber-500 font-bold rounded-lg bg-amber-200 p-1 shadow-md shadow-slate-500">
                  {comentObj?.recommendation}
                </p>
              </div>
              <div>
                <h2 className="text-sm text-left font-medium text-slate-800">
                  오늘의 추천 의상
                </h2>
                <p className="font-SSRONETHandwritten text-amber-500 font-bold rounded-lg bg-amber-200 p-1 shadow-md shadow-slate-500">
                  {comentObj?.clothes}
                </p>
              </div>
              <div className="bg-slate-50 rounded-lg shadow-md shadow-slate-500">
                <img
                  src={comentObj?.CLOTHES_IMG}
                  alt="Today's Clothes"
                  ref={imgRef}
                  fetchPriority="high"
                  decoding="async"
                  width={96}
                  height={160}
                  className="w-24 h-40 m-auto"
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
