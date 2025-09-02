import React from "react";

function Loading() {
  return (
    <div
      className={`
        relative m-auto flex h-screen w-full min-w-[320px] max-w-[600px]
        items-center justify-center bg-white
      `}
    >
      <div
        className={`
          inset-0 flex h-full w-full flex-col items-center justify-center
          bg-white text-center
        `}
      >
        <img
          src="/Loading_Cloud.gif"
          alt="로딩중..."
          className="mx-auto w-16"
        />
        <p className="text-2xl text-gray-600">로딩중...</p>
      </div>
    </div>
  );
}

export default Loading;
