import React from "react";

function MainLocationWeatherSkeleton() {
  return (
    <div className="flex flex-col w-full h-[384px] justify-center items-center gap-2">
      <div className="bg-slate-300 w-full h-full rounded-xl"></div>
      <div className="w-full h-full flex flex-col gap-2">
        <section className="w-full h-1/2 flex gap-2 justify-between">
          <div className="bg-slate-300 w-full h-full flex flex-col gap-1 items-center justify-center rounded-lg"></div>
          <div className="bg-slate-300 w-full h-full flex flex-col gap-1 items-center justify-center rounded-lg"></div>
          <div className="bg-slate-300 w-full h-full flex flex-col gap-1 items-center justify-center rounded-lg"></div>
          <div className="bg-slate-300 w-full h-full flex flex-col gap-1 items-center justify-center rounded-lg"></div>
        </section>
        <section className="w-full h-1/2 flex gap-2 justify-between">
          <div className="bg-slate-300 w-full h-full flex flex-col gap-1 items-center justify-center rounded-lg"></div>
          <div className="bg-slate-300 w-full h-full flex flex-col gap-1 items-center justify-center rounded-lg"></div>
          <div className="bg-slate-300 w-full h-full flex flex-col gap-1 items-center justify-center rounded-lg"></div>
          <div className="bg-slate-300 w-full h-full flex flex-col gap-1 items-center justify-center rounded-lg"></div>
        </section>
      </div>
    </div>
  );
}

export default MainLocationWeatherSkeleton;
