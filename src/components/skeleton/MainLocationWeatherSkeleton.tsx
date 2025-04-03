import React from "react";

function MainLocationWeatherSkeleton() {
  return (
    <div className="flex flex-col w-full h-[296px] justify-center items-center gap-1">
      <div className="w-full h-1/2 flex gap-1">
        <div className="bg-slate-300 w-full h-24 rounded-lg"></div>
        <div className="bg-slate-300 w-full h-24 rounded-lg"></div>
        <div className="bg-slate-300 w-full h-24 rounded-lg"></div>
      </div>
      <div className="w-full h-1/2 flex gap-1">
        <div className="bg-slate-300 w-full h-24 rounded-lg"></div>
        <div className="bg-slate-300 w-full h-24 rounded-lg"></div>
        <div className="bg-slate-300 w-full h-24 rounded-lg"></div>
      </div>
      <div className="w-full h-1/2 flex gap-1">
        <div className="bg-slate-300 w-full h-24 rounded-lg"></div>
        <div className="bg-slate-300 w-full h-24 rounded-lg"></div>
        <div className="bg-slate-300 w-full h-24 rounded-lg"></div>
      </div>
    </div>
  );
}

export default MainLocationWeatherSkeleton;
