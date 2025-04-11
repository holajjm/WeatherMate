import React from "react";
import { useNavigate } from "react-router-dom";

import Button from "@components/layout/Button";
import { ExpandCommunityData } from "type";

function UserBoard({ item }: { item: ExpandCommunityData }) {
  const navigate = useNavigate();

  return (
    <div className="h-full flex flex-col gap-4 bg-white p-4 box-border rounded-lg drop-shadow-lg text-[#2d2d2d]">
      <header className="flex gap-2">
        <img
          src={
            item?.user.profile
              ? `${import.meta.env.VITE_API_SERVER}/files/07-WeatherMate/${item?.user.profile}`
              : "/mainlogin.webp"
          }
          className="rounded-full border-2 w-10 h-10"
        />
        <div className="grow flex gap-2 items-center">
          <div className="grow">
            <h1 className="text-base font-bold">{item.user?.name}</h1>
            <p className="text-xs">조회수 {item.views}</p>
          </div>
          {item.title && (
            <img
              className="w-8 h-8 rounded-full"
              src={`/WeatherIcon${item.title}.webp`}
              alt="weatherIcon"
            />
          )}
        </div>
      </header>
      <hr className="border-slate-400" />
      <main className="grow flex flex-col gap-2">
        <img
          className="w-full h-2/3"
          src={
            item.image
              ? `${import.meta.env.VITE_API_SERVER}/files/07-WeatherMate/${item.image}`
              : "/readyforimage.jpeg"
          }
          alt="image"
        />
        <div className="grow bg-gray-100 rounded-lg p-2 box-border">
          {item.content}
        </div>
      </main>
      <footer className="flex gap-1">
        <Button
          text="상세보기"
          textColor="gray"
          bgColor="gray"
          width="full"
          onClick={() => navigate(`/community/${item._id}`)}
        ></Button>
        <Button
          text="삭제하기"
          textColor="white"
          bgColor="red"
          width="full"
          onClick={() => {}}
        ></Button>
      </footer>
    </div>
  );
}

export default UserBoard;
