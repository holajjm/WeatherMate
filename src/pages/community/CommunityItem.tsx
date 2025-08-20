import React from "react";
import { useNavigate } from "react-router-dom";

import { ENV } from "@constants/env";
import { TimeDiff } from "@hooks/TimeDiff";

import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import type { ExpandCommunityData } from "types/CommunityType";

function CommunityItem({ item }: { item: ExpandCommunityData }) {
  const navigate = useNavigate();

  return (
    <div
      className="w-full h-[25rem] flex flex-col gap-1 bg-white drop-shadow-lg box-border rounded-md cursor-pointer"
      onClick={() => navigate(`/community/${item._id}`)}
    >
      <header className="h-12 p-2">
        <section className="flex gap-3 items-center">
          <div className="flex items-center justify-center rounded-full w-10 h-10 border-2">
            <img
              src={
                item?.user.profile
                  ? `${ENV.API_SERVER}/files/07-WeatherMate/${item.user.profile}`
                  : "/NullUser.webp"
              }
              alt="profile"
              className="rounded-full w-10 h-10 object-contain"
              width={48}
              height={48}
              {...{ fetchpriority: "high" }}
              decoding="async"
            />
          </div>

          <div className="grow flex items-center">
            <div className="grow">
              <h1 className="text-[#2d2d2d] text-sm font-bold">
                {item.user?.name}
              </h1>
              <p className="text-[#2d2d2d] text-xs">조회수 {item.views}</p>
            </div>
            {item.title && (
              <img
                className="w-8 h-8 rounded-sm"
                src={
                  [
                    "Sun",
                    "Cloud",
                    "Rain",
                    "Foggy",
                    "Snow",
                    "Thunder",
                    "Wind",
                  ].includes(item?.title)
                    ? `./WeatherIcon/WeatherIcon${item?.title}.webp`
                    : "./MBTIImage/MBTIMain.webp"
                }
                alt="weatherIcon"
                width={48}
                height={48}
                {...{ fetchpriority: "high" }}
                decoding="async"
              />
            )}
          </div>
        </section>
      </header>

      <section className="grow flex flex-col gap-1 h-60">
        <div className="h-full">
          <img
            className="w-full h-full object-cover"
            src={
              item.extra
                ? `${ENV.API_SERVER}/files/07-WeatherMate/${item.extra.image}`
                : item?.image
                  ? `${ENV.API_SERVER}/files/07-WeatherMate/${item?.image}`
                  : `/ReadyForImage.webp`
            }
            alt="DetailImage"
            width={300}
            height={240}
            {...{ fetchpriority: "high" }}
            decoding="async"
          />
        </div>
      </section>
      
      <section>
        <p className="px-2 h-12 text-[#2d2d2d] text-sm rounded-md grow overflow-scroll scrollbar-hide">
          {item.content}
        </p>
      </section>

      <footer className="p-2 flex gap-4 items-center justify-between text-amber-400">
        <p className="text-xs text-slate-400 font-medium">
          {TimeDiff(item.createdAt)}
        </p>
        <section className="flex items-center justify-center gap-2">
          <p className="flex items-center">
            <IoChatbubbleEllipsesOutline className=" text-xl" />
          </p>
          <p className="text-sm">{item.repliesCount}</p>
        </section>
      </footer>
    </div>
  );
}

export default CommunityItem;
