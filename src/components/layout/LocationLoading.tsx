import React from "react";

function LocationLoading() {
  return (
    <div className="flex flex-col items-center justify-center gap-2 z-50 text-slate-600">
      <img src="./gif/loading.gif" alt="장소추천 중.." className="w-16" />
      {/* <p>웨더메이트가 고심해서 장소를 추천 중이에요!</p> */}
    </div>
  );
}

export default LocationLoading;
