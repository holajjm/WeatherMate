import React from "react";

function MainComentSkeleton() {
  return (
    <div className="relative overflow-hidden bg-slate-200 rounded-md w-full h-40">
      <div
        className="absolute top-0 left-0 h-full w-[40%]
          animate-shimmer
          bg-gradient-to-r from-transparent via-white/70 to-transparent"
      ></div>
    </div>
  );
}

export default MainComentSkeleton;
