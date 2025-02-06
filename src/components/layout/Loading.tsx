import React from "react";

function Loading() {
  return (
    <div className="max-w-[600px] min-w-[320px] w-full h-screen m-auto relative flex items-center justify-center bg-white">
      <div className="text-center w-full h-full flex flex-col items-center justify-center inset-0 bg-white ">
        <img
          src="../gif/loading.gif"
          alt="로딩중..."
          className="mx-auto w-16"
        />
        <p className="text-gray-600 font-UhBeeKangJa text-2xl">로딩중...</p>
      </div>
    </div>
  );
}

export default Loading;
