import React from "react";
import { useNavigate } from "react-router-dom";

import { ENV } from "@constants/env";
import Button from "@components/layout/Button";

import type { CommunityData } from "types/CommunityType";

function CommunityModal({
  handleClose,
  item
}: {
  handleClose: () => void;
  item: CommunityData | null;
}) {
  const navigate = useNavigate();
  return (
    <div
      onClick={handleClose}
      className="absolute left-0 top-0 z-50 box-border flex h-screen w-full items-center justify-center bg-black p-2 text-toss-black opacity-95"
    >
      <div className="relative box-border flex h-80 w-80 flex-col justify-between gap-1 rounded-modal bg-white p-2">
        <button onClick={handleClose} className="ml-auto mr-1 hover:text-toss-red">
          X
        </button>
        <div className="flex items-center gap-2">
          <div>
            <img
              src={
                item?.user.profile
                  ? `${ENV.API_SERVER}/files/07-WeatherMate/${item.user.profile}`
                  : "/NullUser.webp"
              }
              alt="profile"
              className="h-10 w-10 rounded-full object-contain"
              width={40}
              height={40}
              loading="lazy"
              decoding="async"
            />
          </div>
          <div>
            <div className="font-bold">{item?.user?.name}</div>
            <div className="text-caption text-toss-gray">
              {item?.createdAt.slice(0, 10)}
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center">
          <img
            src={
              item?.image
                ? `${ENV.API_SERVER}/files/07-WeatherMate/${item?.image}`
                : `/ReadyForImage.webp`
            }
            alt="img"
            className="h-36 w-full object-cover"
            width={240}
            height={144}
            loading="lazy"
            decoding="async"
          />
        </div>
        <div className="h-12 text-wrap text-caption">{item?.content}</div>
        <Button
          text={"상세보기"}
          textColor="white"
          bgColor="gray"
          width="full"
          height="10"
          onClick={() => navigate(`/community/${item?._id}`)}
        ></Button>
      </div>
    </div>
  );
}

export default CommunityModal;
