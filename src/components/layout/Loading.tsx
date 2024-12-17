import React from "react";

function Loading() {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-white opacity-70"></div>
      <div className="text-center relative">
        <img src="../gif/loading.gif" alt="로딩중..." className="mx-auto mb-2 w-16" />
        <p className="text-gray-600 font-UhBeeKangJa text-2xl">로딩중...</p>
      </div>
    </div>
  );
}

export default Loading;
