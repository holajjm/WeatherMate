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
    <div className="m-auto flex h-screen min-w-[320px] max-w-[600px] flex-col gap-1 overflow-y-scroll bg-slate-50 p-2 scrollbar-hide">
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
        <section className="flex flex-col flex-nowrap gap-2 rounded-xl bg-white p-2 drop-shadow-lg">
          <header className="flex gap-2">
            <img
              src={
                data?.data?.item.user.profile
                  ? `${ENV.API_SERVER}/files/07-WeatherMate/${data?.data?.item.user.profile}`
                  : "/NullUser.webp"
              }
              className="h-12 w-12 rounded-full border-2"
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
                className="h-10 w-10 rounded-full p-1"
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

          <main className="flex flex-grow flex-col">
            <div className="flex h-96 w-full items-center justify-center rounded-md border-2 border-slate-200">
              <img
                src={
                  data?.data?.item.extra
                    ? `${ENV.API_SERVER}/files/07-WeatherMate/${data?.data?.item.extra.image}`
                    : data?.data?.item?.image
                      ? `${ENV.API_SERVER}/files/07-WeatherMate/${data?.data?.item?.image}`
                      : `/ReadyForImage.webp`
                }
                alt="Content Image"
                className="aspect-square h-full w-full object-scale-down"
                width={300}
                height={240}
                {...{ fetchpriority: "high" }}
                decoding="async"
              />
            </div>
            <p className="box-border grow rounded-md bg-slate-100 p-2 text-slate-600">
              {data?.data?.item.content}
            </p>
          </main>

          <footer className="mt-auto flex items-center">
            <div>
              <p className="text-md font-semibold text-slate-400">
                조회수 {data?.data?.item.views}
              </p>
              <div className="flex gap-2">
                <div className="flex items-center gap-1">
                  <FaHeart className="text-2xl text-amber-400" />
                  <p className="text-orange-300">좋아요</p>
                </div>
                <div className="flex items-center gap-1">
                  <IoChatbubbleEllipsesOutline className="text-2xl text-orange-300" />
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
              <section className="ml-auto flex w-1/2 gap-2">
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
