import React, { useState } from "react";
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
      className={`font-Pretendard flex flex-col items-center justify-center rounded-lg bg-slate-200 p-1 transition-all duration-100 hover:cursor-pointer hover:bg-blue-300 ${click ? "border-2 border-black" : "border-none"}`}
    >
      <img
        src={`/Location/Location_${img_src}.webp`}
        alt={label}
        className="w-5"
        width={20}
        height={20}
        {...{ fetchpriority: "high" }}
        decoding="async"
      />
      <p className="text-nowrap text-sm">{label}</p>
    </div>
  );
}

export default LocationKeywords;
