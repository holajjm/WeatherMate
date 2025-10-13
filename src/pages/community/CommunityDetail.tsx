import React from "react";
import { useParams, useNavigate } from "react-router-dom";

import { ENV } from "@constants/env";
import Button from "@components/layout/Button";
import usePostsDelete from "@features/community/usePostsDelete";
import usePostsDetailQuery from "@features/community/usePostsDetailQuery";
import useScrollTop from "@hooks/useScrollTop";
import ReplyMain from "@pages/community/ReplyMain";
import { useUserStore } from "@store/store";

function CommunityDetail() {
  useScrollTop();
  const navigate = useNavigate();
  const user = useUserStore(state => state.user);
  const { _id } = useParams<{ _id: string }>();
  const { data: DetailData } = usePostsDetailQuery({ _id });
  const { mutate: handleDelete } = usePostsDelete();

  return (
    <div className="m-auto flex h-screen min-w-[320px] max-w-[600px] flex-col gap-4 overflow-y-scroll bg-slate-50 pt-4 scrollbar-hide">
      <div className="w-full pl-2">
        <svg
          className="h-5 w-5 cursor-pointer hover:scale-110"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          onClick={() => window.history.back()}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </div>
      {DetailData && (
        <section className="flex flex-col flex-nowrap gap-2 bg-white p-2 drop-shadow-sm">
          <header className="flex gap-2">
            <img
              src={
                DetailData.user.profile
                  ? `${ENV.API_SERVER}/files/07-WeatherMate/${DetailData.user.profile}`
                  : "/NullUser.webp"
              }
              className="h-10 w-10 rounded-full border-2"
              width={48}
              height={48}
              {...{ fetchpriority: "high" }}
              decoding="async"
            />
            <div className="grow">
              <h1 className="text-base font-bold">{DetailData.user.name}</h1>
              <p className="grow text-sm text-gray-400">
                {DetailData.createdAt.substring(5, 16)}
              </p>
            </div>
            <div className="flex flex-col items-center justify-center">
              <img
                className="h-8 w-8 rounded-button"
                src={
                  [
                    "Sun",
                    "Cloud",
                    "Rain",
                    "Foggy",
                    "Snow",
                    "Thunder",
                    "Wind"
                  ].includes(DetailData?.title as string)
                    ? `/WeatherIcon/WeatherIcon${DetailData.title}.webp`
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
            <div className="h-60 w-full object-cover">
              <img
                src={
                  DetailData.extra
                    ? `${ENV.API_SERVER}/files/07-WeatherMate/${DetailData.extra.image}`
                    : DetailData?.image
                      ? `${ENV.API_SERVER}/files/07-WeatherMate/${DetailData?.image}`
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
            <p className="rounded-button text-body">{DetailData.content}</p>
          </main>

          <footer className="mt-auto flex items-center justify-end">
            <p className="text-caption text-toss-gray">
              조회수 {DetailData.views}
            </p>
            {DetailData.user.name === user.name ? (
              <section className="ml-auto flex w-1/2 gap-2">
                <Button
                  text="수정"
                  textColor="white"
                  bgColor="blue"
                  width="full"
                  height="10"
                  onClick={() => navigate(`/community/${_id}/edit`)}
                  label="수정하기"
                ></Button>
                <Button
                  text="삭제"
                  textColor="white"
                  bgColor="red"
                  width="full"
                  height="10"
                  onClick={() => handleDelete(_id)}
                  label="삭제하기"
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
