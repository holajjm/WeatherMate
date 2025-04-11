import React, { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";

function LocationKeywords({
  id,
  label,
  onClick,
  img_src,
}: {
  id: string;
  label: string;
  onClick: React.Dispatch<React.SetStateAction<string>>;
  img_src: string;
}) {
  const imgRef = useRef<HTMLImageElement>(null);
  useEffect(() => {
    if (imgRef.current) {
      imgRef.current.setAttribute("fetchpriority", "high");
    }
  }, []);
  const [click, setClick] = useState<boolean>(false);
  const [searchParams, setSearchParams] = useSearchParams();
  // console.log(searchParams.get("id"));
  // useEffect(() => {
  //   setSearchParams({ id: "12" });
  // }, []);
  return (
    <div
      onClick={e => {
        onClick(id);
        setSearchParams({ id: id });
        if (searchParams.get("id") === id) {
          setClick(true);
        } else if (searchParams.get("id") !== id) {
          setClick(false);
        }
        // console.log(e.currentTarget.getAttribute("datatype"));
        // console.log(searchParams.get("id"));
        // console.log(id);
      }}
      datatype={label}
      className={`flex flex-col justify-center items-center font-Pretendard bg-slate-200 p-2 rounded-lg transition-all duration-100 hover:bg-blue-300 hover:cursor-pointer ${click ? "border-2 border-black" : "border-none"}`}
    >
      <img
        src={img_src}
        alt={label}
        ref={imgRef}
        className="w-6"
        width={24}
        height={24}
        loading="lazy"
        decoding="async"
      />
      <p className="text-nowrap text-sm">{label}</p>
    </div>
  );
}

export default LocationKeywords;
