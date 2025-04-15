import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

import Button from "@components/layout/Button";
import { CommunityData } from "type";

function CommunityModal({
  handleClose,
  item,
}: {
  handleClose: () => void;
  item: CommunityData | null;
}) {
  console.log(item);
  const imgRef = useRef<HTMLImageElement>(null);
  useEffect(() => {
    if (imgRef.current) {
      imgRef.current.setAttribute("fetchpriority", "high");
    }
  }, []);
  const navigate = useNavigate();
  return (
    <div
      onClick={handleClose}
      className="w-full h-screen p-2 box-border text-[#2d2d2d] bg-black absolute top-0 left-0 z-50 opacity-95 flex items-center justify-center font-Pretendard"
    >
      <div className="w-80 h-84 flex flex-col gap-1 justify-between p-2 box-border rounded-lg bg-slate-200">
        <button onClick={handleClose} className="ml-auto">
          X
        </button>
        <hr className="border-b-[1px] border-slate-400" />
        <div className="flex items-center gap-1">
          <div>
            <img
              src={
                item?.user.profile
                  ? `${import.meta.env.VITE_API_SERVER}/files/07-WeatherMate/${item.user.profile}`
                  : "/mainlogin.webp"
              }
              alt="profile"
              className="rounded-full w-10 h-10 object-contain"
              ref={imgRef}
              width={40}
              height={40}
              loading="lazy"
              decoding="async"
            />
          </div>
          <div>
            <div className="font-bold">{item?.user?.name}</div>
            <div className="text-sm text-slate-500">{item?.createdAt}</div>
          </div>
        </div>
        <div className="flex items-center justify-center">
          <img
            src={
              item?.image
                ? `${import.meta.env.VITE_API_SERVER}/files/07-WeatherMate/${item?.image}`
                : `/ReadyForImage.webp`
            }
            alt="img"
            className="w-60 h-36 object-contain"
            width={240}
            height={144}
            fetchpriority="high"
          />
        </div>
        <div className="h-12 text-wrap text-sm">{item?.content}</div>
        <Button
          text={"상세보기"}
          textColor="gray"
          bgColor="gray"
          width="full"
          onClick={() => navigate(`/community/${item?._id}`)}
        ></Button>
      </div>
    </div>
  );
}

export default CommunityModal;
