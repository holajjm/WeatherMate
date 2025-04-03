import React from "react";

function MainComentSkeleton() {
  return (
    <div className="w-full flex flex-col gap-2 p-2 bg-slate-200 rounded-lg">
      <div className="h-8 bg-slate-300 rounded-lg"></div>
      <div className="h-32 bg-slate-300 rounded-lg"></div>
    </div>
  );
}

export default MainComentSkeleton;
