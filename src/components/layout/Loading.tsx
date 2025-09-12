import React, { useEffect, useState } from "react";

function Loading() {
  const [dots, setDots] = useState<string>("");

  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prev => {
        if (prev === "") return ".";
        if (prev === ".") return "..";
        if (prev === "..") return "...";
        return "";
      });
    }, 300);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center">
      <img
        src="/Loading_Spin.gif"
        alt="로딩중..."
        className="w-12 rounded-full"
      />
      <p className="text-body text-toss-gray">Loading{dots}</p>
    </div>
  );
}

export default Loading;
