import React from "react";
import { useNavigate } from "react-router-dom";

import { ENV } from "@constants/env";
import Button from "@components/layout/Button";
import useCustomAxios from "@hooks/useCustomAxios";

import { toast } from "react-toastify";
import type { ExpandCommunityData } from "types/CommunityType";

function UserBoard({ item }: { item: ExpandCommunityData }) {
  const navigate = useNavigate();
  const axios = useCustomAxios();
  console.log(item);
  const deleteItem = async () => {
    if (confirm("삭제하시겠습니까?")) {
      try {
        await axios.delete(`/posts/${item?._id}`);
        toast("삭제되었습니다.");
        window.location.reload();
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div className="box-border flex h-full flex-col gap-4 rounded-lg bg-white p-4 text-[#2d2d2d] drop-shadow-lg">
      <header className="flex gap-2">
        <img
          src={
            item?.user.profile
              ? `${ENV.API_SERVER}/files/07-WeatherMate/${item?.user.profile}`
              : "/mainlogin.webp"
          }
          className="h-10 w-10 rounded-full border-2"
        />
        <div className="flex grow items-center gap-2">
          <div className="grow">
            <h1 className="text-base font-bold">{item.user?.name}</h1>
            <p className="text-xs">조회수 {item.views}</p>
          </div>
          {item.title && (
            <img
              className="h-8 w-8 rounded-full"
              src={`/WeatherIcon${item.title}.webp`}
              alt="weatherIcon"
            />
          )}
        </div>
      </header>
      <hr className="border-slate-400" />
      <main className="flex grow flex-col gap-2">
        <img
          className="h-2/3 w-full"
          src={
            item.image
              ? `${ENV.API_SERVER}/files/07-WeatherMate/${item.image}`
              : "/readyforimage.jpeg"
          }
          alt="image"
        />
        <div className="box-border grow rounded-lg bg-gray-100 p-2">
          {item.content}
        </div>
      </main>
      <footer className="flex gap-1">
        <Button
          text="상세보기"
          textColor="gray"
          bgColor="gray"
          width="full"
          height="10"
          onClick={() => navigate(`/community/${item._id}`)}
        ></Button>
        <Button
          text="삭제하기"
          textColor="white"
          bgColor="lightred"
          width="full"
          height="10"
          onClick={deleteItem}
        ></Button>
      </footer>
    </div>
  );
}

export default UserBoard;
