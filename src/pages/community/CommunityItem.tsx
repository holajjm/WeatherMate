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
      className="w-full h-full flex flex-col gap-2 bg-white drop-shadow-lg p-2 box-border rounded-lg cursor-pointer"
      onClick={() => navigate(`/community/${item._id}`)}
    >
      <header className="flex flex-col gap-3">
        <section className="flex gap-3 items-center">
          <div className="flex items-center justify-center rounded-full w-12 h-12 border-2">
            <img
              src={
                item?.user.profile
                  ? `${ENV.API_SERVER}/files/07-WeatherMate/${item.user.profile}`
                  : "/NullUser.webp"
              }
              alt="profile"
              className="rounded-full w-12 h-12 object-contain"
              width={48}
              height={48}
              {...{ fetchpriority: "high" }}
              decoding="async"
            />
          </div>

          <div className="grow flex items-center">
            <div className="grow">
              <h1 className="text-base font-bold">{item.user?.name}</h1>
              <p className="text-sm text-slate-500 font-medium">
                {TimeDiff(item.createdAt)}
              </p>
            </div>
            {item.title && (
              <img
                className="w-10 h-10 rounded-lg"
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

      <article className="grow flex flex-col gap-2">
        <div className="h-full">
          <img
            className="w-full h-60 rounded-md object-scale-down"
            src={
              item.extra
                ? `${import.meta.env.VITE_API_SERVER}/files/07-WeatherMate/${item.extra.image}`
                : item?.image
                  ? `${import.meta.env.VITE_API_SERVER}/files/07-WeatherMate/${item?.image}`
                  : `/ReadyForImage.webp`
            }
            alt="DetailImage"
            width={300}
            height={240}
            {...{ fetchpriority: "high" }}
            decoding="async"
          />
        </div>
        <div className="text-slate-600 bg-slate-100 rounded-md p-2 box-border grow font-UhBeeKangJa">
          {item.content}
        </div>
      </article>

      <footer className="flex gap-4 items-center justify-between text-amber-400">
        <p className="text-slate-500">조회수 {item.views}</p>
        <section className="flex gap-2">
          {/* <button className="flex items-center">
            <FaHeart className=" text-2xl" />
          </button>
          <p className="">like</p> */}
          <p className="flex items-center">
            <IoChatbubbleEllipsesOutline className=" text-2xl" />
          </p>
          <p className="">{item.repliesCount}</p>
        </section>
      </footer>
    </div>
  );
}

export default CommunityItem;
