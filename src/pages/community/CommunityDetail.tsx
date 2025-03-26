import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { useRecoilValue } from "recoil";
import useCustomAxios from "@hooks/useCustomAxios";
import { memberState } from "@recoil/atom";
import { CommunityDetailData } from "type";

import { FaHeart } from "react-icons/fa";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import ReplyMain from "./ReplyMain";
import Button from "@components/layout/Button";

function CommunityDetail() {
  const navigate = useNavigate();
  const user = useRecoilValue(memberState);
  const { _id } = useParams();
  const axios = useCustomAxios();
  const { data } = useQuery<AxiosResponse<CommunityDetailData>>({
    queryKey: ["posts", _id],
    queryFn: () => axios.get(`/posts/${_id}`),
    refetchOnWindowFocus: false,
  });
  const handleEdit = () => {
    navigate(`/community/${_id}/edit`);
    return;
  };
  const handleDelete = async () => {
    if (confirm("삭제하시겠습니까?")) {
      try {
        await axios.delete(`/posts/${_id}`);
        alert("삭제되었습니다.");
        navigate("/community");
      } catch (error) {
        console.error(error);
      }
    }
  };
  console.log(data?.data.item);
  // console.log(user);

  return (
    <div className="max-w-[600px] min-w-[320px] m-auto h-screen p-2 bg-slate-50 overflow-y-scroll scrollbar-hide flex flex-col gap-1">
      <div className="w-full">
        <Button
          bgColor={"gray"}
          textColor={"gray"}
          width={"w-1/6"}
          text={"이전"}
          onClick={() => window.history.back()}
        />
      </div>
      {data?.data?.item && (
        <section className="p-2 bg-white drop-shadow-lg rounded-xl flex flex-col gap-2 flex-nowrap">
          <header className="flex gap-2">
            {data?.data?.item.user.profile ? (
              <img
                src={`${import.meta.env.VITE_API_SERVER}/files/07-WeatherMate/${data?.data?.item.user.profile}`}
                className="rounded-full border-2 w-12 h-12"
              />
            ) : (
              <p className="rounded-full border w-12 h-12"></p>
            )}
            <div className="grow">
              <h1 className="text-lg font-bold">
                {data?.data?.item.user.name}
              </h1>
              <p className="grow text-gray-400">
                {data?.data?.item.createdAt.substring(5, 16)}
              </p>
            </div>
            <div className="flex flex-col items-center justify-center">
              {data?.data?.item.title && (
                <img
                  className="w-12 h-12 rounded-full p-1"
                  src={`/${data?.data?.item.title}.svg`}
                  alt="weather"
                />
              )}
            </div>
          </header>

          <main className="flex flex-col flex-grow">
            <div className="flex justify-center items-center">
              <img
                src={`${import.meta.env.VITE_API_SERVER}/files/07-WeatherMate/${data?.data?.item.image}`}
                alt="Content Image"
                className="w-full h-full object-contain aspect-square"
              />
            </div>
            <p className="bg-slate-400 text-white rounded-lg p-2">
              {data?.data?.item.content}
            </p>
          </main>

          <footer className="flex items-center mt-auto">
            <div>
              <p className="text-md font-semibold text-slate-400">
                조회수 {data?.data?.item.views}
              </p>
              <div className="flex gap-2">
                <div className="flex gap-1 items-center">
                  <FaHeart className="text-amber-400 text-2xl" />
                  <p className="text-orange-300">좋아요</p>
                </div>
                <div className="flex gap-1 items-center">
                  <IoChatbubbleEllipsesOutline className="text-orange-300 text-2xl" />
                  <p className="text-orange-300">
                    댓글{" "}
                    {data?.data?.item && data?.data?.item.replies
                      ? data?.data?.item.replies?.length
                      : 0}
                    개
                  </p>
                </div>
              </div>
            </div>
            {data.data.item.user.name === user.name ? (
              <section className="ml-auto w-1/2 flex gap-2">
                <button
                  // text={'수정'}
                  className="w-full p-2 border-2 border-slate-100 rounded-lg font-UhBeeKangJa transition-all duration-200 text-nowrap text-white bg-indigo-500 hover:shadow-[0_4px_8px_1px] hover:shadow-slate-400"
                  onClick={handleEdit}
                >
                  수정
                </button>
                <button
                  // text={'삭제'}
                  className="w-full p-2 border-2 border-slate-100 rounded-lg font-UhBeeKangJa transition-all duration-200 text-nowrap text-white bg-red-500 hover:shadow-[0_4px_8px_1px] hover:shadow-slate-400"
                  onClick={handleDelete}
                >
                  삭제
                </button>
              </section>
            ) : null}
          </footer>
        </section>
      )}
      {/* <Outlet context={data?.data?.item} /> */}
      <ReplyMain />
    </div>
  );
}

export default CommunityDetail;
