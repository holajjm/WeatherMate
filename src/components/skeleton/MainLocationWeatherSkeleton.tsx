import React from "react";

function MainLocationWeatherSkeleton() {
  return (
    <div
      className={`
        flex h-[296px] w-full flex-col items-center justify-center gap-1
      `}
    >
      <div className="flex h-1/2 w-full gap-1">
        <div
          className={`
            relative h-24 w-full overflow-hidden rounded-lg bg-slate-200
          `}
        >
          <div
            className={`
              absolute left-0 top-0 h-full w-[40%] animate-shimmer
              bg-gradient-to-r from-transparent via-white/70 to-transparent
            `}
          ></div>
        </div>
        <div
          className={`
            relative h-24 w-full overflow-hidden rounded-lg bg-slate-200
          `}
        >
          <div
            className={`
              absolute left-0 top-0 h-full w-[40%] animate-shimmer
              bg-gradient-to-r from-transparent via-white/70 to-transparent
            `}
          ></div>
        </div>
        <div
          className={`
            relative h-24 w-full overflow-hidden rounded-lg bg-slate-200
          `}
        >
          <div
            className={`
              absolute left-0 top-0 h-full w-[40%] animate-shimmer
              bg-gradient-to-r from-transparent via-white/70 to-transparent
            `}
          ></div>
        </div>
      </div>
      <div className="flex h-1/2 w-full gap-1">
        <div
          className={`
            relative h-24 w-full overflow-hidden rounded-lg bg-slate-200
          `}
        >
          <div
            className={`
              absolute left-0 top-0 h-full w-[40%] animate-shimmer
              bg-gradient-to-r from-transparent via-white/70 to-transparent
            `}
          ></div>
        </div>
        <div
          className={`
            relative h-24 w-full overflow-hidden rounded-lg bg-slate-200
          `}
        >
          <div
            className={`
              absolute left-0 top-0 h-full w-[40%] animate-shimmer
              bg-gradient-to-r from-transparent via-white/70 to-transparent
            `}
          ></div>
        </div>
        <div
          className={`
            relative h-24 w-full overflow-hidden rounded-lg bg-slate-200
          `}
        >
          <div
            className={`
              absolute left-0 top-0 h-full w-[40%] animate-shimmer
              bg-gradient-to-r from-transparent via-white/70 to-transparent
            `}
          ></div>
        </div>
      </div>
      <div className="flex h-1/2 w-full gap-1">
        <div
          className={`
            relative h-24 w-full overflow-hidden rounded-lg bg-slate-200
          `}
        >
          <div
            className={`
              absolute left-0 top-0 h-full w-[40%] animate-shimmer
              bg-gradient-to-r from-transparent via-white/70 to-transparent
            `}
          ></div>
        </div>
        <div
          className={`
            relative h-24 w-full overflow-hidden rounded-lg bg-slate-200
          `}
        >
          <div
            className={`
              absolute left-0 top-0 h-full w-[40%] animate-shimmer
              bg-gradient-to-r from-transparent via-white/70 to-transparent
            `}
          ></div>
        </div>
        <div
          className={`
            relative h-24 w-full overflow-hidden rounded-lg bg-slate-200
          `}
        >
          <div
            className={`
              absolute left-0 top-0 h-full w-[40%] animate-shimmer
              bg-gradient-to-r from-transparent via-white/70 to-transparent
            `}
          ></div>
        </div>
      </div>
    </div>
  );
}

export default MainLocationWeatherSkeleton;
