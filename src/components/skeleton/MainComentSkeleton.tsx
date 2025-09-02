import React from "react";

function MainComentSkeleton() {
  return (
    <div
      className={`relative h-40 w-full overflow-hidden rounded-md bg-slate-200`}
    >
      <div
        className={`
          absolute left-0 top-0 h-full w-[40%] animate-shimmer bg-gradient-to-r
          from-transparent via-white/70 to-transparent
        `}
      ></div>
    </div>
  );
}

export default MainComentSkeleton;
