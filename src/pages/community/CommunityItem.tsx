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
      className="box-border flex h-[25rem] w-full cursor-pointer flex-col gap-1 rounded-md bg-white drop-shadow-lg"
      onClick={() => navigate(`/community/${item._id}`)}
    >
      <header className="h-12 p-2">
        <section className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full border-2">
            <img
              src={
                item?.user.profile
                  ? `${ENV.API_SERVER}/files/07-WeatherMate/${item.user.profile}`
                  : "/NullUser.webp"
              }
              alt="profile"
              className="h-10 w-10 rounded-full object-contain"
              width={48}
              height={48}
              {...{ fetchpriority: "high" }}
              decoding="async"
            />
          </div>

          <div className="flex grow items-center">
            <div className="grow">
              <h1 className="text-sm font-bold text-[#2d2d2d]">
                {item.user?.name}
              </h1>
              <p className="text-xs text-[#2d2d2d]">조회수 {item.views}</p>
            </div>
            {item.title && (
              <img
                className="h-8 w-8 rounded-sm"
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

      <section className="flex h-60 grow flex-col gap-1">
        <div className="h-full">
          <img
            className="h-full w-full object-cover"
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
        <p className="h-12 grow overflow-scroll rounded-md px-2 text-sm text-[#2d2d2d] scrollbar-hide">
          {item.content}
        </p>
      </section>

      <footer className="flex items-center justify-between gap-4 p-2 text-amber-400">
        <p className="text-xs font-medium text-slate-400">
          {TimeDiff(item.createdAt)}
        </p>
        <section className="flex items-center justify-center gap-2">
          <p className="flex items-center">
            <IoChatbubbleEllipsesOutline className="text-xl" />
          </p>
          <p className="text-sm">{item.repliesCount}</p>
        </section>
      </footer>
    </div>
  );
}

export default CommunityItem;
