import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { useRecoilValue } from "recoil";
import { memberState } from "@recoil/atom";

import { ENV } from "@constants/env";
import Button from "@components/layout/Button";
import useCustomAxios from "@hooks/useCustomAxios";
import useScrollTop from "@hooks/useScrollTop";
import ReplyMain from "@pages/community/ReplyMain";

import { FaArrowLeft, FaHeart } from "react-icons/fa";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import type { CommunityDetailData } from "types/CommunityType";

function CommunityDetail() {
  useScrollTop();
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
  // console.log(data?.data?.item);

  return (
    <div className="max-w-[600px] min-w-[320px] m-auto h-screen p-2 bg-slate-50 overflow-y-scroll scrollbar-hide flex flex-col gap-1">
      <div className="w-full">
        <Button
          text={<FaArrowLeft />}
          textColor="gray"
          bgColor="gray"
          width="8"
          onClick={() => window.history.back()}
        />
      </div>
      {data?.data?.item && (
        <section className="p-2 bg-white drop-shadow-lg rounded-xl flex flex-col gap-2 flex-nowrap">
          <header className="flex gap-2">
            <img
              src={
                data?.data?.item.user.profile
                  ? `${ENV.API_SERVER}/files/07-WeatherMate/${data?.data?.item.user.profile}`
                  : "/NullUser.webp"
              }
              className="rounded-full border-2 w-12 h-12"
              width={48}
              height={48}
              {...{ fetchpriority: "high" }}
              decoding="async"
            />
            <div className="grow">
              <h1 className="text-base font-bold">
                {data?.data?.item.user.name}
              </h1>
              <p className="grow text-sm text-gray-400">
                {data?.data?.item.createdAt.substring(5, 16)}
              </p>
            </div>
            <div className="flex flex-col items-center justify-center">
              <img
                className="w-10 h-10 rounded-full p-1"
                src={
                  [
                    "Sun",
                    "Cloud",
                    "Rain",
                    "Foggy",
                    "Snow",
                    "Thunder",
                    "Wind",
                  ].includes(data?.data?.item?.title as string)
                    ? `/WeatherIcon/WeatherIcon${data?.data?.item.title}.webp`
                    : "/MBTIImage/MBTIMain.webp"
                }
                alt="weather"
                width={40}
                height={40}
                {...{ fetchpriority: "high" }}
                decoding="async"
              />
            </div>
          </header>

          <main className="flex flex-col flex-grow">
            <div className="w-full h-96 flex justify-center items-center border-2 border-slate-200 rounded-md">
              <img
                src={
                  data?.data?.item.extra
                    ? `${ENV.API_SERVER}/files/07-WeatherMate/${data?.data?.item.extra.image}`
                    : data?.data?.item?.image
                      ? `${ENV.API_SERVER}/files/07-WeatherMate/${data?.data?.item?.image}`
                      : `/ReadyForImage.webp`
                }
                alt="Content Image"
                className="w-full h-full object-scale-down aspect-square"
                width={300}
                height={240}
                {...{ fetchpriority: "high" }}
                decoding="async"
              />
            </div>
            <p className="bg-slate-100 text-slate-600 rounded-md p-2 box-border grow">
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
                <Button
                  text="수정"
                  textColor="white"
                  bgColor="indigo"
                  width="full"
                  onClick={handleEdit}
                ></Button>
                <Button
                  text="삭제"
                  textColor="white"
                  bgColor="red"
                  width="full"
                  onClick={handleDelete}
                ></Button>
              </section>
            ) : null}
          </footer>
        </section>
      )}
      <ReplyMain />
    </div>
  );
}

export default CommunityDetail;
