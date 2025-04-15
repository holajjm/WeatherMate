import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

import { ExpandCommunityData } from "type";

import { FaHeart } from "react-icons/fa";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";

function CommunityItem({ item }: { item: ExpandCommunityData }) {
  const imgRef = useRef<HTMLImageElement>(null);
  useEffect(() => {
    if (imgRef.current) {
      imgRef.current.setAttribute("fetchpriority", "high");
    }
  }, []);
  const navigate = useNavigate();
  const getItemTime = (createTime: string) => {
    const create = new Date(createTime).getTime();
    const nowTime = new Date().getTime();
    const diff = nowTime - create;
    const diffMonth = diff / (1000 * 60 * 60 * 24 * 12);
    const diffDay = diff / (1000 * 60 * 60 * 24);
    const diffHour = diff / (1000 * 60 * 60);
    const diffMin = diff / (1000 * 60);
    return diffMin < 60
      ? `${diffMin.toFixed(0)}분 전`
      : diffHour < 24
        ? `${diffHour.toFixed(0)}시간 전`
        : diffDay < 32
          ? `${diffDay.toFixed(0)}일 전`
          : `${diffMonth.toFixed(0)}개월 전`;
  };

  return (
    <div
      className="flex flex-col gap-3 bg-white shadow-md shadow-slate-300 p-2 box-border rounded-lg cursor-pointer"
      onClick={() => navigate(`/community/${item._id}`)}
    >
      <header className="flex flex-col gap-3 font-TTLaundryGothicB">
        <section className="flex gap-3 items-center">
          <div className="flex items-center justify-center rounded-full w-12 h-12 border-2">
            <img
              src={
                item?.user.profile
                  ? `${import.meta.env.VITE_API_SERVER}/files/07-WeatherMate/${item.user.profile}`
                  : "/mainlogin.webp"
              }
              alt="profile"
              className="rounded-full w-12 h-12 object-contain"
              ref={imgRef}
              width={48}
              height={48}
              loading="lazy"
              decoding="async"
            />
          </div>
          <div className="grow flex items-center">
            <div className="grow">
              <h1 className="text-base font-bold">{item.user?.name}</h1>
              <p className="text-sm text-slate-500 font-sans font-medium">
                {getItemTime(item.createdAt)}
              </p>
            </div>
            {item.title && (
              <img
                className="w-10 h-10"
                src={
                  item?.title ? `/WeatherIcon${item.title}.webp` : "/logo.webp"
                }
                alt="weatherIcon"
                ref={imgRef}
                width={48}
                height={48}
                loading="lazy"
                decoding="async"
              />
            )}
          </div>
        </section>
      </header>

      <main className="grow flex flex-col gap-2">
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
            ref={imgRef}
            fetchpriority="high"
            loading="lazy"
            decoding="async"
          />
        </div>
        <div className="text-slate-600 bg-slate-100 rounded-md p-2 box-border grow font-UhBeeKangJa">
          {item.content}
        </div>
      </main>

      <footer className="flex gap-4 items-center justify-between text-amber-400">
        <p className="text-slate-500">조회수 {item.views}</p>
        <section className="flex gap-2">
          <button className="flex items-center">
            <FaHeart className=" text-2xl" />
          </button>
          <p className="">like</p>
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
